/* =====================================================================
   고객의 소리 '답변 편지' (2026-11-05)
   · 의견을 보내면 서버가 무작위 표(replyToken)를 주고, 이 휴대폰에만 저장합니다. 이름·연락처는 받지 않아요.
   · 앱을 다시 열면 그 표로 답변이 왔는지 확인하고, 처음 온 답변이면 편지 모양 창을 한 번 띄웁니다.
   · 고객의 소리 화면 아래 '내가 보낸 의견'에서 다시 볼 수 있어요.
   · 서버가 응답하지 않아도 앱의 다른 기능에는 영향이 없습니다.
   ===================================================================== */
(function () {
    'use strict';
    const API = 'https://longtermcare-guide-feedback.jazzy-cocoa-4972.chatgpt.site/api/feedback/answer';
    const MINE_KEY = 'ltc_my_feedback_v1';
    const READ_KEY = 'ltc_letters_read_v1';

    const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch { return d; } };
    const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 무시 */ } };
    const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const dateText = s => { const m = String(s || '').match(/(\d{4})-(\d{2})-(\d{2})/); return m ? `${+m[1]}. ${+m[2]}. ${+m[3]}.` : ''; };

    let items = [];   // 서버에서 받은 내 의견들

    function mine() { return (load(MINE_KEY, []) || []).filter(x => x && x.t); }

    window.LTC_LETTERS = {
        save(result) {
            const list = mine().filter(x => x.t !== result.replyToken);
            list.unshift({ t: result.replyToken, id: result.receiptId, at: new Date().toISOString().slice(0, 10) });
            save(MINE_KEY, list.slice(0, 20));
        }
    };

    async function fetchAnswers() {
        const tokens = mine().map(x => x.t);
        if (!tokens.length) return [];
        try {
            const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tokens }), cache: 'no-store' });
            if (!res.ok) return [];
            const data = await res.json();
            return data && data.success && Array.isArray(data.items) ? data.items : [];
        } catch { return []; }
    }

    // ── 편지 창 ──
    function otherDialogOpen() {
        return !!document.querySelector('.share-sheet-backdrop.show, #shortcutGuide, .update-log-overlay:not([hidden]), .whats-new-overlay, .reply-letter-overlay');
    }
    function showLetter(item, onClose) {
        const box = document.createElement('div');
        box.className = 'reply-letter-overlay';
        box.innerHTML = `
            <section class="reply-letter" role="dialog" aria-modal="true" aria-labelledby="replyLetterTitle">
                <div class="reply-envelope" aria-hidden="true"><svg viewBox="0 0 64 48" width="76" height="57"><rect x="2" y="2" width="60" height="44" rx="7" fill="#fff7e6" stroke="#f3b94f" stroke-width="3"/><path d="M5 7 32 28 59 7" fill="none" stroke="#f3b94f" stroke-width="3" stroke-linejoin="round"/><path d="M32 41c-6-4-10-7.5-10-11.6 0-2.8 2.1-4.6 4.6-4.6 2.3 0 3.9 1.5 5.4 3.3 1.5-1.8 3.1-3.3 5.4-3.3 2.5 0 4.6 1.8 4.6 4.6C42 33.5 38 37 32 41z" fill="#e03131"/></svg></div>
                <div class="reply-paper">
                    <h2 id="replyLetterTitle">보내주신 의견에<br>답변이 도착했어요</h2>
                    <div class="reply-quote">
                        <small>보내신 의견 · 접수번호 ${esc(item.receiptId)}${item.createdAt ? ` · ${esc(dateText(item.createdAt))}` : ''}</small>
                        <p>${esc(item.content)}</p>
                    </div>
                    <div class="reply-answer">${esc(item.answer).replace(/\n/g, '<br>')}</div>
                    <p class="reply-from">장기요양 길잡이 드림</p>
                    <button type="button" class="reply-ok">잘 읽었어요</button>
                </div>
            </section>`;
        const close = () => {
            box.classList.remove('show');
            document.documentElement.classList.remove('reply-letter-open');
            setTimeout(() => { box.remove(); if (onClose) onClose(); }, 200);
        };
        box.addEventListener('click', e => { if (e.target === box || e.target.closest('.reply-ok')) close(); });
        document.addEventListener('keydown', function onKey(e) {
            if (e.key !== 'Escape' || !box.isConnected) return;
            document.removeEventListener('keydown', onKey);
            close();
        });
        document.body.appendChild(box);
        document.documentElement.classList.add('reply-letter-open');
        requestAnimationFrame(() => box.classList.add('show'));
        setTimeout(() => box.querySelector('.reply-ok').focus({ preventScroll: true }), 700);
    }

    function showUnread() {
        const read = new Set(load(READ_KEY, []) || []);
        const queue = items.filter(i => i.answer && !read.has(i.token)).sort((a, b) => a.receiptId - b.receiptId);
        if (!queue.length) return;
        if (otherDialogOpen()) { setTimeout(showUnread, 1500); return; }
        const next = queue[0];
        showLetter(next, () => {
            read.add(next.token);
            save(READ_KEY, Array.from(read).slice(-50));
            setTimeout(showUnread, 400);   // 답변이 여러 개면 차례로
            renderMine();
        });
    }

    // ── 고객의 소리 화면: 내가 보낸 의견 ──
    function renderMine() {
        const box = document.getElementById('myFeedbackSection');
        if (!box) return;
        const list = mine();
        if (!list.length) { box.hidden = true; return; }
        const byToken = new Map(items.map(i => [i.token, i]));
        box.hidden = false;
        box.innerHTML = `
            <div class="guide-settings-section-head"><h2 id="my-feedback-title">내가 보낸 의견</h2></div>
            <ul class="my-feedback-list">${list.map(x => {
                const i = byToken.get(x.t);
                const answered = i && i.answer;
                return `<li>
                    <div class="my-feedback-top"><strong>접수번호 ${esc(x.id)}</strong><span class="${answered ? 'is-done' : 'is-wait'}">${answered ? '답변 완료' : '답변 준비 중'}</span></div>
                    ${i ? `<p class="my-feedback-q">${esc(i.content)}</p>` : ''}
                    ${answered ? `<button type="button" class="my-feedback-open" data-token="${esc(x.t)}">✉ 답변 편지 다시 보기</button>` : ''}
                </li>`;
            }).join('')}</ul>`;
        box.querySelectorAll('.my-feedback-open').forEach(btn => btn.addEventListener('click', () => {
            const i = byToken.get(btn.dataset.token);
            if (i) showLetter(i);
        }));
    }

    async function start() {
        if (!mine().length) return;
        items = await fetchAnswers();
        renderMine();
        setTimeout(showUnread, 800);
        const app = document.getElementById('app');
        if (app && 'MutationObserver' in window) new MutationObserver(() => {
            const box = document.getElementById('myFeedbackSection');
            if (box && box.hidden && mine().length) renderMine();
        }).observe(app, { childList: true });
        // 의견을 새로 보낸 뒤 고객의 소리 화면에 바로 반영
        window.addEventListener('hashchange', () => setTimeout(renderMine, 0));
    }
    // 의견을 처음 보낸 휴대폰에서도 '내가 보낸 의견'이 바로 보이도록
    const origSave = window.LTC_LETTERS.save;
    window.LTC_LETTERS.save = result => { origSave(result); renderMine(); if (!items.length) fetchAnswers().then(r => { items = r; renderMine(); }); };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
