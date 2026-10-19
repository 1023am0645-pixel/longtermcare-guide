(() => {
    const SHARE_URL = 'https://tinyurl.com/longtermcare-guide';
    let pendingPrompt = null;
    let busy = false;
    let installedThisSession = false;
    let headerButton = null;
    const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
    const renderHeaderButton = () => {
        if (!headerButton) return;
        const shareMode = standalone();
        headerButton.hidden = installedThisSession && !shareMode;
        headerButton.dataset.mode = shareMode ? 'share' : 'install';
        headerButton.setAttribute('aria-label', shareMode ? '앱 공유' : '앱 설치');
        headerButton.innerHTML = `<i data-lucide="${shareMode ? 'share-2' : 'download'}" aria-hidden="true"></i><span>${shareMode ? '앱 공유' : '앱 설치'}</span>`;
        if (window.lucide) lucide.createIcons();
    };
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        pendingPrompt = event;
        renderHeaderButton();
    });
    window.addEventListener('appinstalled', () => {
        pendingPrompt = null;
        installedThisSession = true;
        renderHeaderButton();
        document.querySelector('.shortcut-guide-close')?.click();
    });
    const displayModeQuery = matchMedia('(display-mode: standalone)');
    if (displayModeQuery.addEventListener) displayModeQuery.addEventListener('change', renderHeaderButton);
    else displayModeQuery.addListener?.(renderHeaderButton);

    const copyShareLink = async () => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(SHARE_URL);
            return;
        }
        const input = document.createElement('textarea');
        input.value = SHARE_URL;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
    };

    const showShareSheet = () => {
        let backdrop = document.getElementById('appShareSheet');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'appShareSheet';
            backdrop.className = 'share-sheet-backdrop';
            backdrop.innerHTML = `
                <section class="share-sheet" role="dialog" aria-modal="true" aria-labelledby="shareSheetTitle">
                    <header class="share-sheet-head">
                        <span class="share-sheet-icon" aria-hidden="true"><i data-lucide="qr-code"></i></span>
                        <div class="share-sheet-title">
                            <h2 id="shareSheetTitle">장기요양 길잡이 공유</h2>
                            <p>QR을 보여주거나 링크를 보내주세요.</p>
                        </div>
                        <button class="share-sheet-close" type="button" aria-label="공유 창 닫기"><i data-lucide="x"></i></button>
                    </header>
                    <div class="share-qr-card">
                        <img src="share-qr.png" alt="장기요양 길잡이 공유 QR코드" width="720" height="720">
                        <strong>휴대폰 카메라로 촬영하세요</strong>
                        <small>tinyurl.com/longtermcare-guide</small>
                    </div>
                    <button class="share-primary" type="button"><i data-lucide="share-2"></i>공유하기</button>
                    <div class="share-actions">
                        <button class="share-action share-copy" type="button"><i data-lucide="copy"></i>링크 복사</button>
                        <a class="share-action" href="share-qr.png" download="장기요양-길잡이-QR.png"><i data-lucide="download"></i>QR 저장</a>
                    </div>
                    <p class="share-help" aria-live="polite">보호자에게 QR을 보여주면 앱 첫 화면으로 연결됩니다.</p>
                </section>`;
            document.body.appendChild(backdrop);
            const status = backdrop.querySelector('.share-help');
            const close = () => {
                backdrop.classList.remove('show');
                document.body.classList.remove('share-sheet-open');
                headerButton?.focus();
            };
            backdrop.querySelector('.share-sheet-close').addEventListener('click', close);
            backdrop.addEventListener('click', event => { if (event.target === backdrop) close(); });
            backdrop.querySelector('.share-copy').addEventListener('click', async () => {
                try {
                    await copyShareLink();
                    status.textContent = '앱 링크를 복사했습니다.';
                } catch {
                    status.textContent = `복사하지 못했습니다. ${SHARE_URL}`;
                }
            });
            backdrop.querySelector('.share-primary').addEventListener('click', async () => {
                if (navigator.share) {
                    try {
                        await navigator.share({ title: '장기요양 길잡이', text: '장기요양급여 이용 안내 앱', url: SHARE_URL });
                        status.textContent = '공유 창을 열었습니다.';
                    } catch (error) {
                        if (error?.name !== 'AbortError') status.textContent = '공유하지 못했습니다. 링크 복사를 이용해 주세요.';
                    }
                    return;
                }
                try {
                    await copyShareLink();
                    status.textContent = '공유 기능이 없어 앱 링크를 대신 복사했습니다.';
                } catch {
                    status.textContent = `공유하지 못했습니다. ${SHARE_URL}`;
                }
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && backdrop.classList.contains('show')) close();
            });
        }
        if (window.lucide) lucide.createIcons();
        backdrop.classList.add('show');
        document.body.classList.add('share-sheet-open');
        backdrop.querySelector('.share-sheet-close').focus();
    };
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
        headerButton = document.createElement('button');
        headerButton.id = 'appInstall';
        headerButton.className = 'app-install-button';
        headerButton.type = 'button';
        headerButton.addEventListener('click', async () => {
            if (headerButton.dataset.mode === 'share') {
                showShareSheet();
                return;
            }
            if (busy) return;
            if (!pendingPrompt) {
                document.dispatchEvent(new Event('guide-install-help'));
                return;
            }
            const prompt = pendingPrompt;
            pendingPrompt = null;
            busy = true;
            headerButton.disabled = true;
            try {
                await prompt.prompt();
                await prompt.userChoice;
            } catch {
                document.dispatchEvent(new Event('guide-install-help'));
            } finally {
                busy = false;
                headerButton.disabled = false;
            }
        });
        header.appendChild(headerButton);
        renderHeaderButton();
    });
})();
