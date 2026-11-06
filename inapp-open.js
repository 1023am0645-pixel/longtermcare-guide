/* =====================================================================
   네이버·카카오톡 등 '앱 안 브라우저'에서 열렸을 때 (2026-11-06)
   그 안에서는 홈 화면 설치가 안 되므로, 맨 위에 '크롬으로 열기' 버튼을 띄운다.
   갤럭시(안드로이드): 버튼 한 번으로 크롬(없으면 기본 브라우저)에서 같은 화면을 연다.
   아이폰: 버튼 대신 'Safari로 열기' 안내만 짧게.
   ===================================================================== */
(function () {
    'use strict';
    var ua = navigator.userAgent || '';
    var INAPP = /NAVER\(inapp|NAVER|KAKAOTALK|DaumApps|Instagram|FBAN|FBAV|Line\/|; wv\)/i;
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    if (!INAPP.test(ua) || standalone) return;

    var android = /Android/i.test(ua);
    var ios = /iPhone|iPad|iPod/i.test(ua);
    if (!android && !ios) return;

    function openOutside() {
        var url = location.href;
        // 카카오톡은 전용 주소로 바깥 브라우저 열기
        if (/KAKAOTALK/i.test(ua)) {
            location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(url);
            return;
        }
        // 그 밖(네이버 등): 크롬으로 열기, 크롬이 없으면 기본 브라우저로
        var noScheme = url.replace(/^https?:\/\//, '');
        location.href = 'intent://' + noScheme + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(url) + ';end';
    }

    var style = document.createElement('style');
    style.textContent =
        '.inapp-bar{position:sticky;top:0;z-index:1200;box-sizing:border-box;display:flex;align-items:center;gap:10px;width:100%;margin:0;padding:10px 10px 10px 16px;border-radius:0 0 16px 16px;background:#1d4ed8;color:#fff;box-shadow:0 6px 16px rgba(29,78,216,.25);font-family:inherit}' +
        '.inapp-bar p{flex:1;min-width:0;margin:0;font-size:15px;font-weight:700;line-height:1.35;letter-spacing:-.02em}' +
        '.inapp-bar p small{display:block;margin-top:2px;font-size:12.5px;font-weight:500;opacity:.85}' +
        '.inapp-bar .inapp-open{flex:none;min-height:42px;padding:0 14px;border:0;border-radius:999px;background:#fff;color:#1d4ed8;font-family:inherit;font-size:15px;font-weight:800;line-height:1;white-space:nowrap;cursor:pointer}' +
        '.inapp-bar .inapp-close{flex:none;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;font-size:18px;line-height:1;cursor:pointer}';
    document.head.appendChild(style);

    function show() {
        if (document.querySelector('.inapp-bar')) return;
        var bar = document.createElement('div');
        bar.className = 'inapp-bar';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', '다른 브라우저로 열기 안내');
        if (android) {
            bar.innerHTML = '<p>크롬에서 열어야 앱을 설치할 수 있어요</p>' +
                '<button type="button" class="inapp-open">크롬으로 열기</button>' +
                '<button type="button" class="inapp-close" aria-label="닫기">×</button>';
            bar.querySelector('.inapp-open').addEventListener('click', openOutside);
        } else {
            bar.innerHTML = '<p>Safari에서 열어야 앱을 설치할 수 있어요<small>오른쪽 아래 ··· 또는 공유 → Safari로 열기</small></p>' +
                '<button type="button" class="inapp-close" aria-label="닫기">×</button>';
        }
        bar.querySelector('.inapp-close').addEventListener('click', function () { bar.remove(); });
        var shell = document.querySelector('.app-shell') || document.body;
        shell.insertBefore(bar, shell.firstChild);
    }
    // 설치 안내에서도 같은 버튼을 쓸 수 있게
    window.longcareOpenOutside = openOutside;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show, { once: true });
    else show();
})();
