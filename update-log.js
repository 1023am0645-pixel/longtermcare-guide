// =====================================================================
//  앱 업데이트 내역 — 업데이트할 때 이 파일 "맨 위"에 한 덩어리만 추가하세요.
//  맨 위 항목의 날짜가 홈 화면의 "앱 업데이트 ○○○○. ○○. ○○." 날짜로 자동 반영됩니다.
//  (app-config.js 의 updatedAt 은 더 이상 고치지 않아도 됩니다.)
//
//  쓰는 법
//    { date:'2026-10-21', title:'한 줄 제목', items:['바뀐 점 1', '바뀐 점 2'] },
// =====================================================================
window.APP_UPDATES = [
    { date: '2026-10-21', title: '방문자 수·기관 정보 안내 추가', items: [
        '홈 화면 맨 아래에 방문자 수(총·오늘)를 표시합니다.',
        '장기요양기관 선택 화면에 기관 정보 기준 안내를 추가했습니다.',
        '업데이트 내역을 홈 화면에서 바로 볼 수 있도록 옮겼습니다.',
        '그림 용량을 줄여 화면이 더 빨리 열립니다.'
    ] },
    { date: '2026-10-20', title: '목차·글씨 크기 화면 정리', items: [
        '목차 화면 상단 안내를 정리해 목차를 더 많이 볼 수 있습니다.',
        '홈 이외 화면의 글씨 크기 버튼을 상단 ‘가가’ 버튼으로 줄였습니다.',
        '기관 찾기 전용 메뉴와 접속 방법 펼침 안내를 추가했습니다.'
    ] },
    { date: '2026-10-19', title: '앱 공유 기능 추가', items: [
        'QR코드 보여주기·저장, 링크 복사, 홈 화면 바로가기 추가 기능을 넣었습니다.'
    ] },
    { date: '2026-10-15', title: '화면 이용 편의 개선', items: [
        '홈 화면 바로가기 안내와 전체화면 기능을 추가했습니다.',
        '고객의 소리 화면과 급여비용계산기 연결을 정리했습니다.'
    ] },
    { date: '2026-10-14', title: '불편 신고 자동 접수', items: [
        '메일 앱을 거치지 않고 앱에서 바로 불편사항을 접수할 수 있습니다.'
    ] },
    { date: '2026-10-13', title: '고객의 소리 추가', items: [
        '앱 사용 중 불편을 알려주실 수 있는 화면을 추가했습니다.'
    ] },
    { date: '2026-10-07', title: '검색·표 개선', items: [
        '검색 유의어를 확대하고 본인부담금 표 표시를 개선했습니다.'
    ] },
    { date: '2026-10-06', title: '검색·이동 개선', items: [
        '검색 결과 안내와 화면 이동 기능을 개선했습니다.'
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
