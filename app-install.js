(() => {
    let pendingPrompt = null;
    let busy = false;
    const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    const update = () => { const button = document.getElementById('appInstall'); if (button) button.hidden = standalone(); };
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        pendingPrompt = event;
        update();
    });
    window.addEventListener('appinstalled', () => {
        pendingPrompt = null;
        const button = document.getElementById('appInstall');
        if (button) button.hidden = true;
        document.querySelector('.shortcut-guide-close')?.click();
    });
    matchMedia('(display-mode: standalone)').addEventListener('change', update);
    window.longcareInstallSteps = () => {
        const ua = navigator.userAgent;
        const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        let steps;
        if (/KAKAOTALK|NAVER|Instagram|FBAN|FBAV|; wv\)/i.test(ua)) {
            steps = ['현재 앱 안의 브라우저에서는 설치 메뉴가 보이지 않을 수 있습니다. 메뉴에서 ‘다른 브라우저로 열기’를 선택하세요.', ios ? 'Safari에서 이 주소를 연 뒤 공유 → 홈 화면에 추가를 선택하세요.' : 'Chrome 또는 삼성 인터넷에서 이 주소를 열고 오른쪽 위 앱 설치 버튼을 다시 눌러 주세요.'];
        } else if (ios) {
            steps = ['Safari에서 이 페이지를 열고 공유 버튼을 누르세요. 다른 브라우저를 쓰고 있다면 주소를 복사해 Safari에서 열어 주세요.', '공유 목록에서 ‘홈 화면에 추가’를 선택하세요. 보이지 않으면 목록 아래 ‘동작 편집’을 확인하세요.', '‘웹 앱으로 열기’가 표시되면 켜고 ‘추가’를 누르세요.'];
        } else if (/SamsungBrowser/i.test(ua)) {
            steps = ['삼성 인터넷 메뉴에서 ‘현재 페이지 추가’ 또는 ‘페이지 추가’를 찾아 주세요.', '‘홈 화면’을 선택하고 화면 안내에 따라 추가하세요. 브라우저 버전에 따라 메뉴 이름이 다를 수 있습니다.'];
        } else if (/Android/i.test(ua)) {
            steps = ['브라우저 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 찾아 주세요. 브라우저에 따라 메뉴 이름이 다릅니다.', '메뉴가 없다면 일반 브라우저 창에서 이 주소를 다시 열어 주세요. 이미 추가했다면 홈 화면에서 ‘장기요양 길잡이’를 찾아 주세요.', '설치 메뉴가 제공되지 않아도 지금 페이지에서 모든 안내를 이용할 수 있습니다.'];
        } else {
            steps = ['Chrome·Edge에서는 주소창의 설치 아이콘이나 메뉴의 ‘앱 설치’를 확인하세요. Mac Safari에서는 ‘파일 → Dock에 추가’를 이용할 수 있습니다.', '설치 기능이 없는 브라우저에서는 즐겨찾기에 추가해 이용해 주세요.'];
        }
        return steps.map((text, i) => `<li><span>${i + 1}</span><p>${text}</p></li>`).join('');
    };
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.topbar');
        const button = document.createElement('button');
        button.id = 'appInstall';
        button.className = 'app-install-button';
        button.type = 'button';
        button.innerHTML = '<i data-lucide="download" aria-hidden="true"></i><span>앱 설치</span>';
        button.addEventListener('click', async () => {
            if (busy) return;
            if (!pendingPrompt) {
                document.dispatchEvent(new Event('guide-install-help'));
                return;
            }
            const prompt = pendingPrompt;
            pendingPrompt = null;
            busy = true;
            button.disabled = true;
            try {
                await prompt.prompt();
                await prompt.userChoice;
            } catch {
                document.dispatchEvent(new Event('guide-install-help'));
            } finally {
                busy = false;
                button.disabled = false;
            }
        });
        header.appendChild(button);
        update();
    });
})();
