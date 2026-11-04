/* =====================================================================
   안내 화면 위쪽 도구 (2026-11-04)
   · [읽어 주기]        : 화면 글을 휴대폰 음성으로 읽어 줍니다. (시험 중 — 아래 방법으로 켠 기기에서만 보임)
       켜기: 주소 끝에 ?tts=on  (예: .../longtermcare-guide/?tts=on)
       끄기: 주소 끝에 ?tts=off
   · 이 파일이 오류가 나도 앱의 다른 기능에는 영향이 없도록 모든 동작을 try/catch로 감쌉니다.
   ===================================================================== */
(function () {
    'use strict';

    const TTS_KEY = 'ltc_tts_beta_v1';
    const SKIP_ROUTES = ['', '#home', '#settings', '#search', '#contents', '#book'];

    const ICON_SPEAK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
    const ICON_STOP = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>';

    // ── 시험 기능 켜기/끄기 (주소의 ?tts=on / off) ──
    function readTtsSwitch() {
        try {
            const url = new URL(location.href);
            const v = url.searchParams.get('tts');
            if (v === 'on') localStorage.setItem(TTS_KEY, '1');
            if (v === 'off') localStorage.removeItem(TTS_KEY);
            if (v) {
                url.searchParams.delete('tts');
                history.replaceState(history.state, '', url.pathname + url.search + url.hash);
            }
        } catch { /* 무시 */ }
    }
    function ttsWanted() {
        try { return localStorage.getItem(TTS_KEY) === '1'; } catch { return false; }
    }

    function ttsSupported() {
        try { return 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function'; } catch { return false; }
    }

    // ── 한국어 음성 찾기 (없으면 읽어 주기 버튼을 아예 보여주지 않음) ──
    let koVoice = null;
    function findVoice() {
        try {
            if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') return null;
            const voices = window.speechSynthesis.getVoices() || [];
            const ko = voices.filter(v => /^ko([-_]|$)/i.test(v.lang || ''));
            koVoice = ko.find(v => v.localService) || ko[0] || null;
        } catch { koVoice = null; }
        return koVoice;
    }

    // ── 토스트 안내 ──
    let toastTimer = 0;
    function toast(message) {
        let el = document.getElementById('pageToolsToast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'pageToolsToast';
            el.className = 'page-tools-toast';
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            document.body.appendChild(el);
        }
        el.textContent = message;
        el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
    }

    // ── 읽어 주기 ──
    let speaking = false;
    let queue = [];
    let speakBtn = null;

    // 읽지 않을 부분: 이전/다음 목차 이동, 접혀 있는 항목 제목, '○○ 안내 보기' 같은 이동 버튼, 이북 원문 링크
    function collectText() {
        const app = document.getElementById('app');
        if (!app) return '';
        const root = app.firstElementChild || app;
        document.documentElement.classList.add('tts-reading-scan');
        let text = '';
        try { text = root.innerText || ''; } finally { document.documentElement.classList.remove('tts-reading-scan'); }
        return text;
    }
    function toChunks(text) {
        const out = [];
        text.split(/\n+/).forEach(line => {
            const clean = line.replace(/[›»▾▸•·※]/g, ' ').replace(/\s+/g, ' ').trim();
            if (!clean) return;
            if (/^목차\s*\d+$/.test(clean) || /^STEP\s*\d+$/i.test(clean)) return;
            clean.replace(/([가-힣)])([.?!])\s+/g, '$1$2\n').split('\n').forEach(sentence => {
                let s = sentence.trim();
                while (s.length > 120) {
                    const cut = s.lastIndexOf(' ', 120);
                    const at = cut > 40 ? cut : 120;
                    out.push(s.slice(0, at));
                    s = s.slice(at).trim();
                }
                if (s) out.push(s);
            });
        });
        return out;
    }
    function setSpeakButton(on) {
        if (!speakBtn) return;
        speakBtn.innerHTML = on ? `${ICON_STOP}<span>멈추기</span>` : `${ICON_SPEAK}<span>읽어 주기</span>`;
        speakBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        speakBtn.classList.toggle('is-on', on);
    }
    function stopSpeaking() {
        speaking = false;
        clearTimeout(watchdog);
        queue = [];
        try { window.speechSynthesis.cancel(); } catch { /* 무시 */ }
        setSpeakButton(false);
    }
    let started = false;
    let watchdog = 0;
    function failSpeaking(message) {
        stopSpeaking();
        toast(message);
    }
    function speakNext() {
        if (!speaking) return;
        const chunk = queue.shift();
        if (!chunk) { stopSpeaking(); return; }
        try {
            const u = new SpeechSynthesisUtterance(chunk);
            u.lang = 'ko-KR';
            // 휴대폰에 내장된 한국어 음성만 지정 (인터넷 음성은 실패가 잦아 기본 음성에 맡김)
            if (koVoice && koVoice.localService) u.voice = koVoice;
            u.rate = 0.9;
            u.onstart = () => {
                if (!started) toast('읽고 있어요. 소리가 안 들리면 휴대폰 옆 음량 버튼을 올려 주세요.');
                started = true; clearTimeout(watchdog);
            };
            u.onend = () => speakNext();
            u.onerror = e => {
                if (!speaking || (e && (e.error === 'interrupted' || e.error === 'canceled'))) return;
                failSpeaking('읽어 주기를 시작하지 못했어요. 잠시 후 다시 눌러 주세요.');
            };
            try { window.speechSynthesis.resume(); } catch { /* 일부 휴대폰의 '일시정지' 상태 풀기 */ }
            window.speechSynthesis.speak(u);
        } catch {
            failSpeaking('이 휴대폰에서는 읽어 주기를 쓸 수 없어요.');
        }
    }
    function toggleSpeak() {
        if (speaking) { stopSpeaking(); return; }
        queue = toChunks(collectText());
        if (!queue.length) return;
        speaking = true;
        started = false;
        setSpeakButton(true);
        // 4초 안에 시작하지 않으면 멈추고 안내 (음성 엔진이 없거나 막힌 경우)
        clearTimeout(watchdog);
        watchdog = setTimeout(() => {
            if (speaking && !started) failSpeaking('이 휴대폰에서는 읽어 주기가 되지 않아요. 휴대폰 설정의 \'텍스트 음성 변환(TTS)\'을 확인해 주세요.');
        }, 4000);
        // 바로 직전 cancel() 뒤에 말하기를 시작하면 무시되는 휴대폰이 있어, 남은 음성이 있을 때만 정리
        try { if (window.speechSynthesis.speaking || window.speechSynthesis.pending) window.speechSynthesis.cancel(); } catch { /* 무시 */ }
        speakNext();
    }

    // ── 화면에 버튼 붙이기 ──
    function addSpeakButton(tools) {
        if (!tools || tools.querySelector('.page-tool-speak')) return;
        if (!ttsWanted() || !ttsSupported()) return;
        speakBtn = document.createElement('button');
        speakBtn.type = 'button';
        speakBtn.className = 'page-tool-btn page-tool-speak';
        speakBtn.addEventListener('click', toggleSpeak);
        setSpeakButton(false);
        tools.appendChild(speakBtn);
    }
    function route() {
        return (location.hash || '').split('?')[0];
    }
    function mount() {
        try {
            const app = document.getElementById('app');
            if (!app || SKIP_ROUTES.includes(route())) return;
            if (!ttsWanted() || !ttsSupported()) return;
            const back = app.querySelector('.back-link');
            if (!back) return;
            const existing = back.closest('.page-toolbar');
            if (existing) { addSpeakButton(existing.querySelector('.page-tools')); return; }

            const bar = document.createElement('div');
            bar.className = 'page-toolbar';
            back.parentNode.insertBefore(bar, back);
            bar.appendChild(back);

            const tools = document.createElement('div');
            tools.className = 'page-tools';

            speakBtn = null;
            addSpeakButton(tools);
            bar.appendChild(tools);
        } catch { /* 버튼을 못 붙여도 화면은 그대로 */ }
    }

    function start() {
        readTtsSwitch();
        try {
            if ('speechSynthesis' in window) {
                findVoice();
                window.speechSynthesis.addEventListener?.('voiceschanged', () => { findVoice(); mount(); });
            }
        } catch { /* 무시 */ }
        window.addEventListener('hashchange', () => { if (speaking) stopSpeaking(); });
        document.addEventListener('visibilitychange', () => { if (document.hidden && speaking) stopSpeaking(); });
        const app = document.getElementById('app');
        if (app && 'MutationObserver' in window) {
            new MutationObserver(() => mount()).observe(app, { childList: true });
        }
        mount();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
