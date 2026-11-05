/* =====================================================================
   '새로 바뀐 점' 창 (2026-11-05)
   · 처음 온 휴대폰: 아무것도 띄우지 않고 "지금까지 소식은 봤음"으로 기록만 합니다.
   · 다시 온 휴대폰: update-log.js 에서 notify:true 로 표시한 새 소식이 있을 때만, 홈 화면에서 한 번 띄웁니다.
   · 휴대폰 기록이 지워지면 처음 온 사람으로 봅니다(창이 뜨지 않는 쪽으로 안전하게).
   · window.LTC_VISIT.returning 으로 '다시 온 사용자'인지 다른 기능에서도 알 수 있습니다.
   ===================================================================== */
(function () {
    'use strict';
    const COUNT_KEY = 'ltc_visit_count_v1';
    const SEEN_KEY = 'ltc_whatsnew_seen_v1';
    const SESSION_KEY = 'ltc_visit_counted_v1';
    // 이 기능 전부터 쓰던 사람인지 알 수 있는 기존 기록(방문 통계·글씨 크기·홈 화면 안내)
    const OLD_KEYS = ['ltc_last_visit_date_v1', 'longcare-font-size', 'longcare-shortcut-guide-seen-v1'];

    const store = {
        get(k) { try { return localStorage.getItem(k); } catch { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch { /* 무시 */ } }
    };

    // 방문 횟수: 앱을 연 번수(같은 창에서 화면을 옮기는 건 세지 않음)
    let count = Number(store.get(COUNT_KEY) || 0);
    if (!count && OLD_KEYS.some(k => store.get(k) !== null)) count = 1; // 예전부터 쓰던 사람
    let counted = false;
    try { counted = sessionStorage.getItem(SESSION_KEY) === '1'; } catch { /* 무시 */ }
    // 이번 창에서 이미 센 경우(새로고침 등)는 이번 방문이 이미 count에 들어가 있음
    const returning = counted ? count >= 2 : count >= 1;
    if (!counted) {
        count += 1;
        store.set(COUNT_KEY, String(count));
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* 무시 */ }
    }
    window.LTC_VISIT = { count, returning };

    const updates = (Array.isArray(window.APP_UPDATES) ? window.APP_UPDATES : []).filter(u => u && u.notify);
    if (!updates.length) return;
    // 소식마다 '날짜|제목'으로 구분해서, 같은 날 새 소식이 더 생겨도 알 수 있게 합니다.
    const idOf = u => `${u.date}|${u.title}`;
    let seenIds = [];
    let seenDate = '';
    try {
        const raw = store.get(SEEN_KEY);
        if (raw && raw.charAt(0) === '[') seenIds = JSON.parse(raw);
        else if (raw) seenDate = raw;                                  // 예전 방식(날짜만) 기록
    } catch { /* 무시 */ }
    // 예전 방식 기록(11/5 낮, 날짜만 저장하던 때)에 이미 본 소식
    const LEGACY_SEEN = ['2026-11-05|아이폰에서도 홈 화면에 쉽게 추가해요'];
    const isSeen = u => seenIds.includes(idOf(u)) || (!!seenDate && (u.date < seenDate || LEGACY_SEEN.includes(idOf(u))));
    const markAllSeen = () => store.set(SEEN_KEY, JSON.stringify(updates.map(idOf).slice(0, 30)));

    if (!returning) { markAllSeen(); return; }                        // 처음 온 사람: 기록만
    // 예전 사용자가 처음 이 기능을 만나면 최근 2주 안의 소식만 보여 줍니다.
    const cutoff = (() => { const d = new Date(); d.setDate(d.getDate() - 14); return d.toISOString().slice(0, 10); })();
    const hasRecord = seenIds.length || seenDate;
    const fresh = updates.filter(u => !isSeen(u) && (hasRecord || u.date >= cutoff)).slice(0, 3);
    if (!fresh.length) { markAllSeen(); return; }

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    let shown = false;

    function isHome() { const h = (location.hash || '').split('?')[0]; return !h || h === '#home'; }
    function otherDialogOpen() {
        return !!document.querySelector('.share-sheet-backdrop.show, #shortcutGuide, .update-log-overlay:not([hidden]), .whats-new-overlay, .reply-letter-overlay');
    }

    function render() {
        if (shown || !isHome() || otherDialogOpen()) return;
        shown = true;
        markAllSeen();
        const box = document.createElement('div');
        box.className = 'whats-new-overlay';
        box.innerHTML = `
            <section class="whats-new-sheet" role="dialog" aria-modal="true" aria-labelledby="whatsNewTitle">
                <button type="button" class="whats-new-close" aria-label="닫기">×</button>
                <span class="whats-new-badge">새로 바뀐 점</span>
                ${fresh.map((u, i) => `
                    <h2${i === 0 ? ' id="whatsNewTitle"' : ''}>${esc(u.title)}</h2>
                    ${(u.items || []).length ? `<ul>${u.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`).join('')}
                <button type="button" class="whats-new-ok">확인했어요</button>
                <button type="button" class="whats-new-all">지난 소식 모두 보기</button>
            </section>`;
        const close = () => {
            box.classList.remove('show');
            document.documentElement.classList.remove('whats-new-open');
            setTimeout(() => box.remove(), 180);
        };
        box.addEventListener('click', e => {
            if (e.target === box || e.target.closest('.whats-new-close, .whats-new-ok')) close();
            if (e.target.closest('.whats-new-all')) { close(); if (window.openUpdateLog) setTimeout(window.openUpdateLog, 200); }
        });
        document.addEventListener('keydown', function onKey(e) {
            if (e.key !== 'Escape' || !box.isConnected) return;
            document.removeEventListener('keydown', onKey);
            close();
        });
        document.body.appendChild(box);
        document.documentElement.classList.add('whats-new-open');
        requestAnimationFrame(() => box.classList.add('show'));
        box.querySelector('.whats-new-ok').focus();
    }

    function start() {
        // 화면이 다 그려진 뒤 잠깐 있다가(어르신이 화면을 먼저 보시도록)
        setTimeout(render, 1200);
        window.addEventListener('hashchange', () => setTimeout(render, 600));
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
