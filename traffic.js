(function () {
    'use strict';

    const endpoint = 'https://longtermcare-guide-feedback.jazzy-cocoa-4972.chatgpt.site/api/traffic';
    const pendingKey = 'ltc_pending_pageviews_v1';
    const lastVisitKey = 'ltc_last_visit_date_v1';

    function seoulDate() {
        return new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date());
    }

    function newEventId() {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    }

    function loadPending() {
        try {
            const parsed = JSON.parse(localStorage.getItem(pendingKey) || '[]');
            return Array.isArray(parsed) ? parsed.slice(-20) : [];
        } catch {
            return [];
        }
    }

    function savePending(events) {
        try {
            localStorage.setItem(pendingKey, JSON.stringify(events.slice(-20)));
        } catch {
            // 통계 저장 실패가 앱 이용을 방해하지 않도록 조용히 종료합니다.
        }
    }

    function makePageview() {
        const visitDate = seoulDate();
        let newVisitor = true;
        try {
            newVisitor = localStorage.getItem(lastVisitKey) !== visitDate;
            localStorage.setItem(lastVisitKey, visitDate);
        } catch {
            // 저장소를 사용할 수 없으면 해당 접속을 새 방문으로 계산합니다.
        }
        return { eventId: newEventId(), visitDate, newVisitor };
    }

    async function flush() {
        const pending = loadPending();
        pending.push(makePageview());
        savePending(pending);

        const remaining = [];
        for (let index = 0; index < pending.length; index += 1) {
            const event = pending[index];
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event),
                    keepalive: true
                });
                if (!response.ok) remaining.push(event);
            } catch {
                remaining.push(event, ...pending.slice(index + 1));
                break;
            }
        }
        savePending(remaining);
    }

    // ── 방문자 수 표시 (홈 화면 맨 아래 오른쪽, 작게) ──
    //   총 = 날짜별 방문 기기 수의 누적, 오늘 = 오늘 방문한 기기 수
    //   서버에서 숫자를 못 받으면 아무것도 표시하지 않습니다.
    const summaryEndpoint = endpoint + '/summary';
    let summary = null;

    function renderCounter() {
        const app = document.getElementById('app');
        if (!app) return;
        const isHome = !location.hash || location.hash === '#home';
        const footer = app.querySelector('.home-footer');
        let box = document.getElementById('visitCounter');
        if (!isHome || !footer || !summary) { if (box) box.remove(); return; }
        const meta = app.querySelector('.home-meta');
        const holder = meta || footer.parentNode;
        if (!box || box.parentNode !== holder) {
            if (box) box.remove();
            box = document.createElement('p');
            box.id = 'visitCounter';
            box.className = 'visit-counter';
            if (meta) meta.appendChild(box); else footer.insertAdjacentElement('afterend', box);
        }
        const fmt = n => Number(n || 0).toLocaleString('ko-KR');
        box.innerHTML = `<span>총 ${fmt(summary.total)}</span><span>오늘 ${fmt(summary.today)}</span>`;
    }

    async function loadSummary() {
        try {
            const response = await fetch(summaryEndpoint, { cache: 'no-store' });
            if (!response.ok) return;
            const data = await response.json();
            if (!data || data.success !== true) return;
            summary = { total: data.total, today: data.today };
            renderCounter();
        } catch {
            // 숫자를 못 불러와도 앱 이용에는 영향이 없도록 조용히 넘어갑니다.
        }
    }

    // 새로고침(당겨서 새로고침 포함)·뒤로가기로 다시 그려진 화면은 방문으로 세지 않습니다.
    //  - 앱을 새로 열거나 링크·QR·홈 화면 아이콘으로 들어온 경우만 1회로 셉니다.
    //  - 다만 아직 못 보낸 기록(인터넷이 끊겨 남은 것)은 이때도 보내 둡니다.
    function isReload() {
        try {
            const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
            if (nav && nav.type) return nav.type === 'reload' || nav.type === 'back_forward';
            if (performance.navigation) return performance.navigation.type === 1 || performance.navigation.type === 2;
        } catch { /* 알 수 없으면 새 방문으로 봅니다 */ }
        return false;
    }

    async function flushPendingOnly() {
        const pending = loadPending();
        if (!pending.length) return;
        const remaining = [];
        for (let index = 0; index < pending.length; index += 1) {
            try {
                const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pending[index]), keepalive: true });
                if (!response.ok) remaining.push(pending[index]);
            } catch {
                remaining.push(...pending.slice(index));
                break;
            }
        }
        savePending(remaining);
    }

    function start() {
        (isReload() ? flushPendingOnly() : flush()).finally(loadSummary);
        window.addEventListener('hashchange', () => setTimeout(renderCounter, 0));
        const app = document.getElementById('app');
        if (app && 'MutationObserver' in window) {
            new MutationObserver(() => {
                if (summary && !document.getElementById('visitCounter')) renderCounter();
            }).observe(app, { childList: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
