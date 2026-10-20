// =====================================================================
//  앱 업데이트 내역 — 업데이트할 때 이 파일 "맨 위"에 한 덩어리만 추가하세요.
//  맨 위 항목의 날짜가 홈 화면의 "앱 업데이트 ○○○○. ○○. ○○." 날짜로 자동 반영됩니다.
//  (app-config.js 의 updatedAt 은 더 이상 고치지 않아도 됩니다.)
//
//  쓰는 법
//    { date:'2026-10-21', title:'한 줄 제목', items:['바뀐 점 1', '바뀐 점 2'] },
//
//  ※ 수급자·보호자가 알면 좋은 '쓰는 법'만 쉬운 말로 적어요. (내부 정리·통계 같은 건 적지 않음)
// =====================================================================
window.APP_UPDATES = [
    { date: '2026-10-21', title: '화면이 더 빨리 열려요', items: [
        '그림과 아이콘을 가볍게 바꿔 데이터를 적게 쓰고 더 빨리 열립니다.',
        '‘업데이트’를 누르면 이렇게 새로 바뀐 점을 볼 수 있어요.'
    ] },
    { date: '2026-10-20', title: '글씨 크기를 위쪽 ‘가가’ 버튼으로', items: [
        '홈이 아닌 화면에서는 위쪽 ‘가가’ 버튼을 눌러 글씨 크기를 바꿀 수 있어요.',
        '목차가 한 화면에 더 많이 보이도록 정리했어요.'
    ] },
    { date: '2026-10-19', title: '가족에게 앱을 보내 보세요', items: [
        '홈 화면 위쪽 ‘앱 공유’를 누르면 QR코드를 보여주거나 링크를 보낼 수 있어요.',
        '‘홈 화면에 바로가기 추가’를 누르면 다음부터 아이콘으로 바로 열려요.'
    ] },
    { date: '2026-10-15', title: '화면을 크게 볼 수 있어요', items: [
        '글씨 크기 옆 확대 버튼을 누르면 전체화면으로 볼 수 있어요.'
    ] },
    { date: '2026-10-14', title: '불편한 점을 바로 알려주세요', items: [
        '아래쪽 ‘고객의 소리’에서 이름 없이 불편한 점을 보낼 수 있어요.'
    ] },
    { date: '2026-10-07', title: '쉬운 말로 검색해도 찾아줘요', items: [
        '‘요양원’, ‘데이케어’처럼 평소 쓰는 말로 검색해도 관련 안내가 나와요.',
        '본인부담금 표를 보기 쉽게 바꿨어요.'
    ] }
];

(function () {
    'use strict';
    const list = Array.isArray(window.APP_UPDATES) ? window.APP_UPDATES : [];
    const dot = iso => {
        const [y, m, d] = String(iso).split('-').map(Number);
        return (y && m && d) ? `${y}. ${m}. ${d}.` : String(iso);
    };

    // 1) 맨 위 항목 날짜를 앱 업데이트 날짜로 자동 반영
    if (list.length) {
        window.APP_CONFIG = window.APP_CONFIG || {};
        window.APP_CONFIG.updatedAt = dot(list[0].date);
    }

    // 2) 업데이트 내역 창
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    let modal = null;
    let lastFocus = null;

    function build() {
        modal = document.createElement('div');
        modal.className = 'update-log-overlay';
        modal.hidden = true;
        modal.innerHTML = `
            <div class="update-log-sheet" role="dialog" aria-modal="true" aria-labelledby="updateLogTitle">
                <div class="update-log-head">
                    <h2 id="updateLogTitle">업데이트 내역</h2>
                    <button type="button" class="update-log-close" aria-label="닫기">×</button>
                </div>
                <ol class="update-log-list">
                    ${list.map((u, i) => `
                    <li>
                        <details${i === 0 ? ' open' : ''}>
                            <summary>
                                <time datetime="${esc(u.date)}">${esc(dot(u.date))}</time>
                                <span class="update-log-title">${i === 0 ? '<b class="update-log-new">NEW</b>' : ''}${esc(u.title)}</span>
                                <span class="update-log-arrow" aria-hidden="true">▾</span>
                            </summary>
                            <ul>${(u.items || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                        </details>
                    </li>`).join('')}
                </ol>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.closest('.update-log-close')) close();
        });
    }

    function open() {
        if (!list.length) return;
        if (!modal) build();
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.documentElement.classList.add('update-log-open');
        modal.querySelector('.update-log-close').focus();
    }

    function close() {
        if (!modal) return;
        modal.hidden = true;
        document.documentElement.classList.remove('update-log-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener('click', e => {
        const btn = e.target.closest && e.target.closest('[data-open-updates]');
        if (btn) { e.preventDefault(); open(); }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal && !modal.hidden) close();
    });
})();
