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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', flush, { once: true });
    } else {
        flush();
    }
})();
