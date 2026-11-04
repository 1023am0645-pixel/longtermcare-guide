// =====================================================================
//  앱 업데이트 내역 — 업데이트할 때 이 파일 "맨 위"에 한 덩어리만 추가하세요.
//  홈 화면 아래 '업데이트 날짜'는 APP_LAST_UPDATED(마지막 수정일)와 맨 위 항목 날짜 중 최신 날짜로 표시됩니다.
//  작은 수정만 했을 때도 APP_LAST_UPDATED를 오늘 날짜로 바꾸면 날짜가 최신으로 보입니다.
//  (app-config.js 의 updatedAt 은 더 이상 고치지 않아도 됩니다.)
//
//  쓰는 법
//    { date:'2026-10-21', title:'한 줄 제목', items:['바뀐 점 1', '바뀐 점 2'] },
//
//  ※ 수급자·보호자가 알면 좋은 '쓰는 법'만 쉬운 말로 적어요. (내부 정리·통계 같은 건 적지 않음)
// =====================================================================
window.APP_LAST_UPDATED = '2026-11-04';

window.APP_UPDATES = [
    { date: '2026-11-04', title: '보고 있는 화면을 바로 보낼 수 있어요', items: [
        '안내 화면 위쪽의 [이 화면 보내주기]를 눌러 보세요.',
        '카카오톡·문자 중 보낼 곳을 고르면, 받는 분도 같은 화면을 바로 볼 수 있어요.'
    ] },
    { date: '2026-11-03', title: '홈 화면 아이콘이 새로 바뀌었어요', items: [
        '파란 책 모양에 공단 하트가 달린 아이콘이에요.',
        '이미 홈 화면에 추가해 두셨다면, 지우고 다시 추가하면 새 아이콘이 보여요.'
    ] },
    { date: '2026-10-21', title: '화면이 더 빨리 열려요', items: [
        '데이터를 적게 써서 화면이 더 빨리 열려요.',
        '홈 화면 제목을 더 크고 또렷하게 바꿨어요.',
        '급여이용방법에서 바로가기를 눌렀다가 ‘돌아가기’를 누르면 보던 단계로 돌아와요.',
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
    const latest = [window.APP_LAST_UPDATED, list.length ? list[0].date : ''].filter(Boolean).sort().pop();
    if (latest) {
        window.APP_CONFIG = window.APP_CONFIG || {};
        window.APP_CONFIG.updatedAt = dot(latest);
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
                                ${(u.items || []).length ? '<span class="update-log-arrow" aria-hidden="true">▾</span>' : ''}
                            </summary>
                            ${(u.items || []).length ? `<ul>${u.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
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
