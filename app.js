document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PAGES = 44;
    const BOOK_BASE = 'assets/book-pages';
    const SOURCE_URL = 'https://ligsystemup.kdtidc.com/e-book/2026%EC%9E%A5%EA%B8%B0%EC%9A%94%EC%96%91%EA%B8%89%EC%97%AC%EC%9D%B4%EC%9A%A9_ebook/index.html';

    const { categories, categoryDetails = {}, legacySectionMap, quickMenus, gradeResultGuide } = window.LONGCARE_CONTENT;
    const guideDetails = [gradeResultGuide].filter(Boolean);

    const app = document.getElementById('app');
    const searchInput = document.getElementById('searchInput');

    function pageImage(page) {
        return `${BOOK_BASE}/page-${page}.jpg`;
    }

    function pageLabel(page) {
        return `${String(page).padStart(2, '0')}쪽`;
    }

    function pageRange(pages) {
        if (pages.length === 1) return pageLabel(pages[0]);
        return `${pageLabel(pages[0])} - ${pageLabel(pages[pages.length - 1])}`;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function allTopics() {
        return categories.flatMap(category => category.topics.map(topic => ({ category, topic })));
    }

    function findCategory(categoryId) {
        return categories.find(category => category.id === categoryId) || categories[0];
    }

    function findTopic(categoryId, topicId) {
        const category = findCategory(categoryId);
        const topic = category.topics.find(item => item.id === topicId) || category.topics[0];
        return { category, topic };
    }

    function findGuide(guideId) {
        return guideDetails.find(guide => guide.id === guideId) || null;
    }

    function findByPage(page) {
        return allTopics().find(({ topic }) => topic.pages.includes(page))
            || categories.find(category => category.pages.includes(page))
            || null;
    }

    const APP_CONFIG = window.APP_CONFIG || {};
    const finderHref = () => APP_CONFIG.finderUrl || '#';
    function wireFinderLinks(root = document) {
        root.querySelectorAll('a[data-finder]').forEach(a => {
            if (!APP_CONFIG.finderUrl) {
                a.classList.add('finder-pending'); a.setAttribute('aria-disabled', 'true'); a.removeAttribute('target');
                const label = a.querySelector('span');
                if (label && !label.dataset.pending) { label.textContent += ' (준비 중)'; label.dataset.pending = '1'; }
                return;
            }
            a.href = APP_CONFIG.finderUrl;
            a.target = '_blank'; a.rel = 'noopener';
        });
    }
    document.addEventListener('click', e => {
        const a = e.target.closest && e.target.closest('a[data-finder]');
        if (a && !APP_CONFIG.finderUrl) e.preventDefault();
    });
    const finderCard = () => `<a class="finder-btn" data-finder href="${finderHref()}" target="_blank" rel="noopener"><i data-lucide="map-pin" aria-hidden="true"></i><span>장기요양 기관찾기</span><i data-lucide="external-link" aria-hidden="true"></i></a>`;

    function setActiveNav(route, bodyRoute = route || 'search') {
        document.body.dataset.route = bodyRoute;
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.route === route);
        });
    }

    function focusMain() {
        wireFinderLinks();
        if (window.LONGCARE_REVIEWED) prepareFocusedView();
        app.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (window.lucide) lucide.createIcons();
    }

    const searchSections = 'article,details.review-more,.documents-receipt,.documents-eligibility,.documents-reissue';
    let lastSearch = '';

    function labelSearchSections(container) {
        return Array.from(container.querySelectorAll(searchSections)).map((element, index) => {
            element.id = `section-${index}`;
            const heading = element.querySelector('summary,h2,h3');
            const title = element.matches('.documents-receipt') ? '필수서류 수령' : heading?.textContent.trim();
            return {element, title};
        }).filter(item => item.title);
    }

    function prepareFocusedView() {
        labelSearchSections(app);
        const params = new URLSearchParams(location.hash.split('?')[1] || '');
        const part = params.get('part');
        const target = part ? Array.from(app.querySelectorAll('[id]')).find(el => el.id === part) : null;
        const reissue = app.querySelector('.documents-reissue');
        if (reissue) {
            const showingReissue = params.get('view') === 'reissue' || (target && reissue.contains(target));
            app.querySelector('.documents-receipt').hidden = !!showingReissue;
            reissue.hidden = !showingReissue;
            app.querySelectorAll('[data-doc-view]').forEach(link => {
                const active = link.dataset.docView === (showingReissue ? 'reissue' : 'receipt');
                if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
            });
            const methods = Array.from(app.querySelectorAll('.documents-route'));
            const selected = methods.findIndex(el => target && el.contains(target));
            const requested = Number(params.get('method') || 0);
            const method = selected >= 0 ? selected : (requested >= 0 && requested < methods.length ? requested : 0);
            methods.forEach((el,index) => { el.hidden = index !== method; });
            app.querySelectorAll('[data-doc-method]').forEach((link,index) => {
                if (index === method) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
            });
            app.querySelectorAll('.documents-original a').forEach(link => {
                link.href = `${link.getAttribute('href').split('?')[0]}?view=${showingReissue ? 'reissue' : 'receipt'}&method=${method}`;
            });
        }
        if (target) {
            if (target.matches('details')) target.open = true;
            for (let parent = target.parentElement; parent; parent = parent.parentElement) {
                if (parent.matches('details')) parent.open = true;
            }
            // Eligibility remains above a selected reissue method, rather than being skipped.
            const destination = reissue?.contains(target) ? reissue : target;
            destination.tabIndex = -1;
            destination.classList.add('search-destination');
            requestAnimationFrame(() => { destination.focus({preventScroll:true}); destination.scrollIntoView({block:'start'}); });
        }
        if (lastSearch && params.has('part')) {
            const back = app.querySelector('.back-link');
            if (back) { back.href = `#search?q=${encodeURIComponent(lastSearch)}`; back.innerHTML = '<i data-lucide="chevron-left" aria-hidden="true"></i>검색 결과로'; }
        }
    }

    function categoryButton(category) {
        if (window.LONGCARE_REVIEWED) {
            return `<a class="category-button category-row ${category.color}" href="#category/${category.id}">
                <span class="category-icon icon3d"><img src="icons3d/${category.id}.webp" alt="" width="192" height="192" loading="lazy"></span>
                <span class="category-copy"><small class="category-no">${category.no}</small><strong>${category.title}</strong><span class="category-description">${category.subtitle}</span></span>
                <i class="menu-arrow" data-lucide="chevron-right" aria-hidden="true"></i>
            </a>`;
        }
        return `
            <a class="category-button ${category.color}" href="#category/${category.id}">
                <i data-lucide="${category.icon}" aria-hidden="true"></i>
                <strong>${category.title}</strong>
                <span>${category.subtitle}</span>
            </a>
        `;
    }

    function quickMenuButton(item) {
        if (window.LONGCARE_REVIEWED) {
            const id = item.href.replace('#category/', '');
            return `<a class="quick-menu ${item.tone}" href="${item.href}">
                <span class="quick-icon icon3d"><img src="icons3d/${id}.webp" alt="" width="192" height="192"></span>
                <strong>${item.title}</strong>
                <span class="quick-arrow"><i data-lucide="chevron-right" aria-hidden="true"></i></span>
            </a>`;
        }
        return `
            <a class="quick-menu ${item.tone}" href="${item.href}">
                <span class="quick-icon">
                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                </span>
                <strong>${item.title}</strong>
                ${window.LONGCARE_REVIEWED ? '<span class="quick-arrow"><i data-lucide="chevron-right" aria-hidden="true"></i></span>' : ''}
            </a>
        `;
    }

    function homeMenuCard(item) {
        return `
            <a class="home-card ${item.tone}${item.active ? ' active' : ''}" href="${item.href}" ${item.active ? 'aria-current="page"' : ''}>
                <span class="home-card-icon">
                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                </span>
                <strong>${item.title}</strong>
                <span>${item.subtitle}</span>
            </a>
        `;
    }

    function renderHome() {
        setActiveNav('home');
        if (window.LONGCARE_REVIEWED) {
            app.innerHTML = `
                <section class="home-guide home-v2">
                    <div class="quick-menu-grid primary-actions" aria-label="자주 찾는 안내">
                        ${quickMenus.map(quickMenuButton).join('')}
                    </div>

                    <div class="home-section-title">
                        <h2>전체 목차</h2>
                        <p>책자 순서대로 모든 항목을 볼 수 있어요</p>
                    </div>
                    <div class="category-grid home-category-grid" aria-label="전체 가이드 목차">
                        ${categories.map(categoryButton).join('')}
                    </div>

                    <a class="home-wide-card" href="#book">
                        <span class="icon3d"><img src="icons3d/book.webp" alt="" width="192" height="192" loading="lazy"></span>
                        <span class="home-wide-copy"><strong>이북 원문 보기</strong><span>안내 책자를 원본 그대로 넘겨볼 수 있어요</span></span>
                        <i data-lucide="chevron-right" aria-hidden="true"></i>
                    </a>

                    ${finderCard()}

                    <aside class="home-notice">
                        <img src="icons3d/notice.webp" alt="" width="192" height="192" loading="lazy">
                        <p>이 화면은 「장기요양급여 이용 안내」 책자를 쉽게 정리한 <strong>참고용 안내</strong>입니다. 기타 문의는 관할 운영센터 또는 <a href="tel:1577-1000">1577-1000(고객센터)</a>으로 해 주세요.<span class="home-basis">책자 기준 ${APP_CONFIG.bookBasis || ''} · 앱 업데이트 ${APP_CONFIG.updatedAt || ''}</span></p>
                    </aside>

                    <footer class="home-footer">
                        <img src="nhis-emblem.svg" alt="국민건강보험공단" width="64" height="65">
                        <span>장기요양급여 이용 안내</span>
                    </footer>
                </section>
            `;
            focusMain();
            if (location.hash.includes('?search')) setTimeout(() => searchInput.focus(), 50);
            return;
        }
        app.innerHTML = `
            <section class="home-guide">
                <div class="quick-menu-grid primary-actions" aria-label="주요기능">
                    ${quickMenus.map(quickMenuButton).join('')}
                </div>

                <div class="main-menu-grid home-entry-grid" aria-label="전체 보기">
                    ${[
                        {
                            title: '전체목차',
                            subtitle: '책자 기준 모든 항목 보기',
                            href: '#home',
                            icon: 'list',
                            tone: 'blue',
                            active: true
                        },
                        {
                            title: '이북원문',
                            subtitle: '장기요양급여 이용 안내 원문 보기',
                            href: '#book',
                            icon: 'book-open',
                            tone: 'green'
                        }
                    ].map(homeMenuCard).join('')}
                </div>

                <div class="home-section-head compact">
                    <h2>전체 목차</h2>
                    <p>책자 기준 항목을 바로 선택하세요.</p>
                </div>

                <div class="category-grid home-category-grid" aria-label="전체 가이드 목차">
                    ${categories.map(categoryButton).join('')}
                </div>
            </section>
        `;
        focusMain();
    }

    function renderContents() {
        setActiveNav('contents');
        app.innerHTML = `
            <section class="content-layout">
                <div class="section-heading wide">
                    <span>전체 목차</span>
                    <h1>장기요양 이용 가이드</h1>
                    <p>아래 큰 버튼에서 시작해 세부 항목으로 들어가면 됩니다.</p>
                </div>
                <div class="category-grid" aria-label="전체 가이드 목차">
                    ${categories.map(categoryButton).join('')}
                </div>
            </section>
        `;
        focusMain();
    }

    function subtopicButton(category, topic) {
        return `
            <a class="subtopic-button ${category.color}" href="#topic/${category.id}/${topic.id}">
                <strong>${topic.title}</strong>
                <span>이북 ${pageRange(topic.pages)}</span>
                <i data-lucide="chevron-right" aria-hidden="true"></i>
            </a>
        `;
    }

    function pageHead(id, titleHtml) {
        const c = findCategory(id);
        return `<header class="page-head"><span class="page-head-icon icon3d"><img src="icons3d/${id}.webp" alt="" width="192" height="192"></span><div class="page-head-copy"><small>목차 ${c ? c.no : ''}</small><h1>${titleHtml}</h1></div></header>`;
    }

    function renderCategory(categoryId) {
        const category = findCategory(categoryId);
        const reviewed = window.LONGCARE_REVIEWED?.[category.id];
        if (reviewed) {
            setActiveNav('contents');
            app.innerHTML = `<section class="documents-view reviewed-view"><a class="back-link" href="#home"><i data-lucide="chevron-left" aria-hidden="true"></i>돌아가기</a>${pageHead(category.id, reviewed.title)}${reviewed.html}<details class="ebook-source-details"><summary><span><i data-lucide="book-open" aria-hidden="true"></i>장기요양급여 이용 안내 e&#8209;book에서 전체 내용 확인하기</span></summary><div class="documents-original">${reviewed.pages.map(p=>`<a href="#page/${p}/category/${category.id}">${p}쪽 원문 보기<i data-lucide="chevron-right" aria-hidden="true"></i></a>`).join('')}</div></details></section>`;
            focusMain();
            return;
        }
        if (category.id === 'grade') { renderGrade(); return; }
        if (category.id === 'documents') {
            renderDocuments();
            return;
        }
        const detail = categoryDetails[category.id];
        setActiveNav('contents');
        app.innerHTML = `
            <section class="category-layout guide-view ${category.color}">
                <a class="back-link" href="#home">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    돌아가기
                </a>
                <div class="category-hero">
                    <div>
                        <span class="section-number">${category.no}</span>
                        <h1>${category.title}</h1>
                        <p>${category.subtitle}</p>
                    </div>
                </div>
                ${detail ? renderStructuredPanels({
                    ...detail,
                    id: category.id,
                    color: category.color,
                    sourceKind: 'category'
                }) : ''}
                ${detail ? '' : `
                    <div class="section-heading">
                        <span>세부 카테고리</span>
                        <h2>궁금한 내용을 다시 선택하세요</h2>
                    </div>
                    <div class="subtopic-grid" aria-label="${category.title} 세부 카테고리">
                        ${category.topics.map(topic => subtopicButton(category, topic)).join('')}
                    </div>
                `}
            </section>
        `;
        focusMain();
    }

    function renderDocuments(searchOnly = false) {
        if (!searchOnly) setActiveNav('contents');
        const routes = [
            { icon: 'monitor', tone: 'blue', title: '노인장기요양보험 홈페이지', address: 'www.longtermcare.or.kr', steps: ['개인서비스', '나의 신청 내역', '등급판정결과 조회 및 출력'] },
            { icon: 'smartphone', tone: 'mint', title: '국민건강보험공단 모바일 앱(건강보험25시)', steps: ['장기요양', '장기요양 인정서 등 3종 서식'] },
            { icon: 'landmark', tone: 'purple', title: '정부24 홈페이지 및 앱', address: 'www.gov.kr', steps: ['장기요양 검색', '노인장기요양인정서 발급'] }
        ];
        const html = `
            <section class="documents-view">
                <a class="back-link" href="#home"><i data-lucide="chevron-left" aria-hidden="true"></i>돌아가기</a>
                ${window.LONGCARE_REVIEWED ? pageHead('documents', '필수서류 수령') : '<div class="documents-title"><h1>필수서류 <span>수령</span></h1><img src="documents-counter-watercolor.png" alt=""></div>'}
                ${window.LONGCARE_REVIEWED ? `<nav class="document-switch" aria-label="서류 안내 선택"><a href="#category/documents?view=receipt" data-doc-view="receipt">필수서류 수령</a><a href="#category/documents?view=reissue" data-doc-view="reissue">인터넷 재발급</a></nav>` : ''}
                <section class="documents-receipt">
                    <p class="documents-intro">수급자가 되면 <strong>국민건강보험공단</strong>으로부터 <em>필수서류 3종</em>과 이용 가능한 장기요양기관 현황을 제공받습니다.</p>
                    <ul class="documents-names">
                        <li><i data-lucide="file-badge" aria-hidden="true"></i><span>장기요양인정서</span></li><li><i data-lucide="clipboard-list" aria-hidden="true"></i><span>개인별장기요양이용계획서</span></li><li><i data-lucide="file-check-2" aria-hidden="true"></i><span>복지용구 급여확인서</span></li>
                    </ul>
                </section>
                <section class="documents-reissue">
                    <h2>인터넷 재발급</h2>
                    <div class="documents-eligibility">
                        <h3><i data-lucide="users" aria-hidden="true"></i>발급 가능 대상</h3>
                        <p>수급자 본인 또는 인정신청을 대리한 가족이 발급할 수 있습니다.<span class="family-condition">가족은 다음 중 하나에 해당해야 합니다.<br>· 발급일 기준 수급자와 같은 세대 (주민등록상)<br>· 발급일 기준 수급자와 같은 건강보험증에 등재</span></p>
                    </div>
                    ${window.LONGCARE_REVIEWED ? `<nav class="method-switch" aria-label="재발급 방법 선택">${routes.map((item,index) => `<a href="#category/documents?view=reissue&method=${index}" data-doc-method="${index}"><i data-lucide="${item.icon}" aria-hidden="true"></i><span>${['홈페이지','건강보험25시','정부24'][index]}</span></a>`).join('')}</nav>` : ''}
                    <div class="documents-routes">
                        ${routes.map(route => `<article class="documents-route route-${route.tone}">
                            <header><span class="route-symbol"><i data-lucide="${route.icon}" aria-hidden="true"></i></span><div><h3>${route.title}</h3>${route.address ? `<a class="route-address" href="https://${route.address}" target="_blank" rel="noopener noreferrer">${route.address}<i data-lucide="arrow-up-right" aria-hidden="true"></i></a>` : ''}</div></header>
                            <ol>${route.steps.map(step => `<li>${step}</li>`).join('')}</ol>
                            ${route.tone === 'mint' ? `<div class="app-downloads"><a href="https://play.google.com/store/apps/details?id=kr.or.nhic&hl=ko" target="_blank" rel="noopener noreferrer"><i data-lucide="download" aria-hidden="true"></i>안드로이드 다운로드</a><a href="https://apps.apple.com/kr/app/id375279377" target="_blank" rel="noopener noreferrer"><i data-lucide="download" aria-hidden="true"></i>아이폰 다운로드</a></div>` : ''}
                        </article>`).join('')}
                    </div>
                </section>
                <details class="ebook-source-details">
                    <summary><span><i data-lucide="book-open" aria-hidden="true"></i>장기요양급여 이용 안내 e&#8209;book에서 전체 내용 확인하기</span></summary>
                    <div class="documents-original">
                        <a href="#page/8/category/documents">8쪽 원문 크게 보기<i data-lucide="maximize-2" aria-hidden="true"></i></a>
                        <a href="#page/8/category/documents" aria-label="서류 수령 방법 8쪽 원문 크게 보기"><img loading="lazy" src="${pageImage(8)}" alt="필수서류 수령 및 인터넷 재발급 안내 원문 8쪽"></a>
                    </div>
                </details>
            </section>`;
        if (searchOnly) return html;
        app.innerHTML = html;
        focusMain();
    }

    function renderGrade(searchOnly = false) {
        if (!searchOnly) setActiveNav('contents');
        const grades = [
            ['1등급', '전적으로', '95점 이상'],
            ['2등급', '상당 부분', '75점 이상 95점 미만'],
            ['3등급', '부분적으로', '60점 이상 75점 미만'],
            ['4등급', '일정 부분', '51점 이상 60점 미만'],
            ['5등급', null, '45점 이상 51점 미만'],
            ['인지지원등급', null, '45점 미만']
        ];
        const html = `<section class="documents-view grade-view">
            <a class="back-link" href="#home"><i data-lucide="chevron-left" aria-hidden="true"></i>돌아가기</a>
            ${window.LONGCARE_REVIEWED ? pageHead('grade', '장기요양등급 구분') : '<h1>장기요양등급 구분</h1>'}
            <p class="documents-intro">심신상태와 장기요양이 필요한 정도에 따라 <strong>1~5등급 및 인지지원등급</strong>으로 판정합니다. 등급에 따라 이용할 수 있는 급여 종류와 한도가 달라집니다.</p>
            <div class="grade-definitions">${grades.map(([title, emphasis, score]) => `<article class="grade-definition"><h2>${title}</h2><p>${emphasis ? `심신의 기능상태 장애로 일상생활에서 <mark>${emphasis}</mark> 다른 사람의 도움이 필요한 자로서` : '치매(노인장기요양보험법 시행령 제2조에 따른 노인성 질병에 해당하는 치매로 한정)환자로서'}</p><p class="grade-score">장기요양인정 점수가 ${score}인 자</p></article>`).join('')}</div>
            <h2 class="grade-sub-head">갱신·등급변경신청</h2>
            <div class="grade-definitions grade-process">
                <article class="grade-definition grade-process-card"><h2>갱신신청</h2><ul>
                    <li>계속 이용하려면 유효기간이 끝나기 <strong>90일 전부터 30일 전까지</strong> 갱신신청을 해야 합니다.</li>
                    <li>절차는 처음 인정신청과 같으며, 갱신신청에 한해 국민건강보험공단 전국지사(운영센터)에 전화로도 신청할 수 있습니다.</li>
                    <li>기간 내에 갱신신청을 하지 않아 유효기간이 끝나면 장기요양급여를 계속 이용할 수 없습니다.</li>
                </ul></article>
                <article class="grade-definition grade-process-card"><h2>등급변경신청</h2><ul>
                    <li>유효기간 내에 심신상태가 악화되거나 호전되어 다른 등급을 받고 싶다면 <strong>등급변경신청</strong>을 할 수 있습니다.</li>
                    <li>절차는 인정신청과 같습니다.</li>
                </ul></article>
            </div>
            <a class="grade-related" href="#category/eligible-benefits">등급별 이용 가능 급여<i data-lucide="chevron-right" aria-hidden="true"></i></a>
            <details class="ebook-source-details"><summary><span><i data-lucide="book-open" aria-hidden="true"></i>장기요양급여 이용 안내 e&#8209;book에서 전체 내용 확인하기</span></summary><div class="documents-original"><a href="#page/4/category/grade">4쪽 원문 크게 보기<i data-lucide="maximize-2" aria-hidden="true"></i></a><a href="#page/4/category/grade"><img loading="lazy" src="${pageImage(4)}" alt="장기요양등급 구분 원문 4쪽"></a><a href="#page/28/category/grade">28쪽 원문 크게 보기(갱신·등급변경)<i data-lucide="maximize-2" aria-hidden="true"></i></a></div></details>
        </section>`;
        if (searchOnly) return html;
        app.innerHTML = html;
        focusMain();
    }

    function renderTopic(categoryId, topicId) {
        if (window.LONGCARE_REVIEWED?.[categoryId]) { renderCategory(categoryId); return; }
        const { category, topic } = findTopic(categoryId, topicId);
        setActiveNav('contents');
        app.innerHTML = `
            <section class="topic-layout guide-view ${category.color}">
                <a class="back-link" href="#category/${category.id}">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    ${category.title}
                </a>
                <div class="topic-hero">
                    <span class="section-number">${category.no}</span>
                    <h1>${topic.title}</h1>
                    <p>${category.title} · 이북 ${pageRange(topic.pages)}</p>
                </div>

                <div class="topic-summary">
                    <div class="section-heading">
                        <span>요약 안내</span>
                        <h2>이 내용만 먼저 읽어보세요</h2>
                    </div>
                    <div class="summary-list">
                        ${topic.summary.map((item, index) => `
                            <article class="summary-card">
                                <span>${index + 1}</span>
                                <p>${item}</p>
                            </article>
                        `).join('')}
                    </div>
                </div>

                <div class="reference-panel">
                    <div class="section-heading">
                        <span>원문 연결</span>
                        <h2>관련 이북 페이지</h2>
                        <p>그림, 표, 정확한 문구가 필요하면 원본 페이지를 크게 볼 수 있습니다.</p>
                    </div>
                    <div class="reference-grid">
                        <a class="reference-cover" href="#page/${topic.pages[0]}/${category.id}/${topic.id}">
                            <img loading="lazy" src="${pageImage(topic.pages[0])}" alt="${topic.title} 원본 ${pageLabel(topic.pages[0])}">
                            <span>첫 원문 ${pageLabel(topic.pages[0])}</span>
                        </a>
                        <div class="page-buttons" aria-label="${topic.title} 관련 원본 페이지">
                            ${topic.pages.map(page => `
                                <a href="#page/${page}/${category.id}/${topic.id}">
                                    <strong>${pageLabel(page)}</strong>
                                    <span>원본 보기</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
        focusMain();
    }

    function comparisonRows(item) {
        const rows = item.rows || [
            item.content ? { label: '핵심 내용', value: item.content } : null,
            item.check ? { label: '확인할 점', value: item.check } : null
        ].filter(Boolean);

        return rows.map(row => `
            <div>
                <dt>${row.label}</dt>
                <dd>${row.value}</dd>
            </div>
        `).join('');
    }

    function renderVisualBlocks(detail) {
        if (!detail.visualBlocks?.length) return '';

        return detail.visualBlocks.map((block, blockIndex) => {
            if (block.type === 'diagram') {
                return `
                    <section class="visual-panel diagram-visual" aria-labelledby="${detail.id}-visual-${blockIndex}">
                        <div class="panel-title">
                            <span class="panel-icon ${block.iconTone || 'blue'}">
                                <i data-lucide="${block.icon || 'workflow'}" aria-hidden="true"></i>
                            </span>
                            <div>
                                <h2 id="${detail.id}-visual-${blockIndex}">${block.title}</h2>
                            </div>
                        </div>
                        <figure class="diagram-card">
                            <img loading="lazy" src="${block.image}" alt="${block.alt || block.title}">
                            ${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}
                        </figure>
                        ${block.points?.length ? `
                            <div class="visual-point-list">
                                ${block.points.map(point => `
                                    <div>
                                        <strong>${point.title}</strong>
                                        <span>${point.text}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </section>
                `;
            }

            return `
                <section class="visual-panel service-visual" aria-labelledby="${detail.id}-visual-${blockIndex}">
                    <div class="panel-title">
                        <span class="panel-icon ${block.iconTone || 'green'}">
                            <i data-lucide="${block.icon || 'image'}" aria-hidden="true"></i>
                        </span>
                        <div>
                            <h2 id="${detail.id}-visual-${blockIndex}">${block.title}</h2>
                        </div>
                    </div>
                    <div class="visual-card-grid">
                        ${(block.items || []).map(item => `
                            <article class="visual-card">
                                <img loading="lazy" src="${item.image}" alt="${item.alt || item.title}">
                                <div>
                                    ${item.badge ? `<span>${item.badge}</span>` : ''}
                                    <h3>${item.title}</h3>
                                    <p>${item.text}</p>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>
            `;
        }).join('');
    }

    function renderStructuredPanels(detail) {
        const newsSection = detail.newsCards?.length ? `
            <section class="card-news-panel" aria-label="${detail.title || '핵심'} 요약">
                <div class="news-card-track" aria-label="${detail.title || '안내'} 핵심 카드">
                    ${detail.newsCards.map(card => `
                        <article class="news-card ${card.tone || 'news-blue'}">
                            <div class="news-card-icons">
                                <i data-lucide="${card.icon || 'info'}" aria-hidden="true"></i>
                                ${card.secondIcon ? `<i data-lucide="${card.secondIcon}" aria-hidden="true"></i>` : ''}
                            </div>
                            <span>${card.title}</span>
                            <h3>${card.headline}</h3>
                            <p>${card.text}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        ` : '';

        const flowSection = detail.steps?.length ? `
            <section class="flow-panel" aria-labelledby="${detail.id}-flow-title">
                <div class="panel-title">
                    <span class="panel-icon purple">
                        <i data-lucide="${detail.flowIcon || 'route'}" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${detail.id}-flow-title">${detail.flowTitle || '확인 순서'}</h2>
                    </div>
                </div>
                <div class="step-timeline">
                    ${detail.steps.map((step, index) => `
                        <article class="step-card">
                            <span>${index + 1}</span>
                            <div>
                                <i data-lucide="${step.icon || 'circle'}" aria-hidden="true"></i>
                                <h3>${step.title}</h3>
                                <p>${step.text}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        ` : '';

        const comparisonSection = detail.keyTable?.length ? `
            <section class="comparison-panel" aria-labelledby="${detail.id}-comparison-title">
                <div class="panel-title">
                    <span class="panel-icon blue">
                        <i data-lucide="${detail.tableIcon || 'table-2'}" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${detail.id}-comparison-title">${detail.tableTitle || '확인할 핵심 내용'}</h2>
                    </div>
                </div>
                <div class="comparison-list">
                    ${detail.keyTable.map(item => `
                        <article class="comparison-card">
                            <strong>${item.label}</strong>
                            ${item.meter ? `
                                <div class="grade-meter" style="--meter: ${item.meter.value || 50}%; --meter-color: ${item.meter.color || '#2563eb'}">
                                    <span></span>
                                </div>
                            ` : ''}
                            <dl>${comparisonRows(item)}</dl>
                        </article>
                    `).join('')}
                </div>
            </section>
        ` : '';

        const checklistSection = detail.showChecklist && detail.checklist?.length ? `
            <section class="checklist-panel" aria-labelledby="${detail.id}-checklist-title">
                <div class="panel-title">
                    <span class="panel-icon green">
                        <i data-lucide="check-square" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${detail.id}-checklist-title">${detail.checklistTitle || '확인할 것'}</h2>
                    </div>
                </div>
                <div class="check-list">
                    ${detail.checklist.map(item => `
                        <label class="check-item">
                            <input type="checkbox" aria-label="${item.title}">
                            <span>
                                <strong>${item.title}</strong>
                                ${item.text ? `<em>${item.text}</em>` : ''}
                            </span>
                        </label>
                    `).join('')}
                </div>
            </section>
        ` : '';

        const faqSection = detail.faqs?.length ? `
            <section class="faq-panel" aria-labelledby="${detail.id}-faq-title">
                <div class="panel-title">
                    <span class="panel-icon blue">
                        <i data-lucide="circle-help" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${detail.id}-faq-title">${detail.faqTitle || '많이 묻는 질문'}</h2>
                    </div>
                </div>
                <div class="faq-list">
                    ${detail.faqs.map(item => `
                        <details class="faq-item">
                            <summary>${item.q}</summary>
                            <p>${item.a}</p>
                        </details>
                    `).join('')}
                </div>
            </section>
        ` : '';

        const cautionSection = detail.showCaution && detail.caution ? `
            <section class="caution-panel" aria-label="꼭 알아둘 점">
                <div class="panel-title">
                    <span class="panel-icon yellow">
                        <i data-lucide="alert-circle" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2>${detail.cautionTitle || '꼭 알아둘 점'}</h2>
                    </div>
                </div>
                <p>${detail.caution}</p>
            </section>
        ` : '';

        const sourcePages = detail.sourcePages || [];
        const sourceSection = sourcePages.length ? `
            <details class="ebook-source-details">
                <summary>
                    <span>
                        <i data-lucide="book-open" aria-hidden="true"></i>
                        장기요양급여 이용 안내 e&#8209;book에서 전체 내용 확인하기
                    </span>
                    <small>관련 원문 페이지를 펼쳐서 볼 수 있습니다</small>
                </summary>
                <div class="reference-grid">
                    <a class="reference-cover" href="#page/${sourcePages[0]}/${detail.sourceKind || 'category'}/${detail.id}">
                        <img loading="lazy" src="${pageImage(sourcePages[0])}" alt="${detail.title || '원문'} ${pageLabel(sourcePages[0])}">
                        <span>첫 원문 ${pageLabel(sourcePages[0])}</span>
                    </a>
                    <div class="page-buttons" aria-label="${detail.title || '원문'} 페이지">
                        ${sourcePages.map(page => `
                            <a href="#page/${page}/${detail.sourceKind || 'category'}/${detail.id}">
                                <strong>${pageLabel(page)}</strong>
                                <span>원문 보기</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </details>
        ` : '';

        const sections = {
            news: newsSection,
            visuals: renderVisualBlocks(detail),
            flow: flowSection,
            comparison: comparisonSection,
            checklist: checklistSection,
            faq: faqSection,
            caution: cautionSection,
            source: sourceSection
        };

        return (detail.sectionOrder || ['news', 'flow', 'comparison', 'checklist', 'faq', 'caution', 'source'])
            .map(key => sections[key])
            .filter(Boolean)
            .join('');
    }

    function renderGuideDetail(guide) {
        const newsSection = `
            <section class="card-news-panel" aria-label="${guide.title} 핵심 요약">
                <div class="news-card-track" aria-label="${guide.title} 핵심 요약">
                    ${guide.newsCards.map(card => `
                        <article class="news-card ${card.tone}">
                            <div class="news-card-icons">
                                <i data-lucide="${card.icon}" aria-hidden="true"></i>
                                ${card.secondIcon ? `<i data-lucide="${card.secondIcon}" aria-hidden="true"></i>` : ''}
                            </div>
                            <span>${card.title}</span>
                            <h3>${card.headline}</h3>
                            <p>${card.text}</p>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        const flowSection = `
            <section class="flow-panel" aria-labelledby="${guide.id}-flow-title">
                <div class="panel-title">
                    <span class="panel-icon purple">
                        <i data-lucide="route" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${guide.id}-flow-title">${guide.flowTitle || '확인 순서'}</h2>
                    </div>
                </div>
                <div class="step-timeline">
                    ${guide.steps.map((step, index) => `
                        <article class="step-card">
                            <span>${index + 1}</span>
                            <div>
                                <i data-lucide="${step.icon}" aria-hidden="true"></i>
                                <h3>${step.title}</h3>
                                <p>${step.text}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        const comparisonSection = `
            <section class="comparison-panel" aria-labelledby="${guide.id}-comparison-title">
                <div class="panel-title">
                    <span class="panel-icon blue">
                        <i data-lucide="table-2" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${guide.id}-comparison-title">${guide.tableTitle || '확인할 핵심 내용'}</h2>
                    </div>
                </div>
                <div class="comparison-list">
                    ${guide.keyTable.map(item => `
                        <article class="comparison-card">
                            <strong>${item.label}</strong>
                            ${item.meter ? `
                                <div class="grade-meter" style="--meter: ${item.meter.value || 50}%; --meter-color: ${item.meter.color || '#2563eb'}">
                                    <span></span>
                                </div>
                            ` : ''}
                            <dl>
                                ${comparisonRows(item)}
                            </dl>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        const checklistSection = guide.showChecklist ? `
            <section class="checklist-panel" aria-labelledby="${guide.id}-checklist-title">
                <div class="panel-title">
                    <span class="panel-icon green">
                        <i data-lucide="check-square" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${guide.id}-checklist-title">${guide.checklistTitle || '확인할 것'}</h2>
                    </div>
                </div>
                <div class="check-list">
                    ${guide.checklist.map(item => `
                        <label class="check-item">
                            <input type="checkbox" aria-label="${item.title}">
                            <span>
                                <strong>${item.title}</strong>
                                ${item.text ? `<em>${item.text}</em>` : ''}
                            </span>
                        </label>
                    `).join('')}
                </div>
            </section>
        ` : '';
        const faqSection = `
            <section class="faq-panel" aria-labelledby="${guide.id}-faq-title">
                <div class="panel-title">
                    <span class="panel-icon blue">
                        <i data-lucide="circle-help" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${guide.id}-faq-title">${guide.faqTitle || '많이 묻는 질문'}</h2>
                    </div>
                </div>
                <div class="faq-list">
                    ${guide.faqs.map(item => `
                        <details class="faq-item">
                            <summary>${item.q}</summary>
                            <p>${item.a}</p>
                        </details>
                    `).join('')}
                </div>
            </section>
        `;
        const cautionSection = guide.showCaution ? `
            <section class="caution-panel" aria-label="주의">
                <div class="panel-title">
                    <span class="panel-icon yellow">
                        <i data-lucide="alert-circle" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2>원문 기반 요약 안내</h2>
                    </div>
                </div>
                <p>${guide.caution}</p>
            </section>
        ` : '';
        const sourceSection = `
            <details class="ebook-source-details">
                <summary>
                    <span>
                        <i data-lucide="book-open" aria-hidden="true"></i>
                        장기요양 급여이용가이드 e&#8209;book에서 전체 내용 확인하기
                    </span>
                    <small>관련 원문 페이지를 펼쳐서 볼 수 있습니다</small>
                </summary>
                <div class="reference-grid">
                    <a class="reference-cover" href="#page/${guide.sourcePages[0]}/guide/${guide.id}">
                        <img loading="lazy" src="${pageImage(guide.sourcePages[0])}" alt="${guide.title} 원문 ${pageLabel(guide.sourcePages[0])}">
                        <span>첫 원문 ${pageLabel(guide.sourcePages[0])}</span>
                    </a>
                    <div class="page-buttons" aria-label="${guide.title} 원문 페이지">
                        ${guide.sourcePages.map(page => `
                            <a href="#page/${page}/guide/${guide.id}">
                                <strong>${pageLabel(page)}</strong>
                                <span>원문 보기</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </details>
        `;
        const sections = {
            news: newsSection,
            flow: flowSection,
            comparison: comparisonSection,
            checklist: checklistSection,
            faq: faqSection,
            caution: cautionSection,
            source: sourceSection
        };
        const sectionOrder = guide.sectionOrder || ['news', 'flow', 'comparison', 'checklist', 'faq', 'caution', 'source'];

        setActiveNav('home', 'detail');
        app.innerHTML = `
            <section class="app-guide-detail guide-view ${guide.color || 'blue'}">
                <a class="back-link" href="#home">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    돌아가기
                </a>

                <div class="app-detail-hero">
                    <span class="section-number">${guide.badge || '안내'}</span>
                    <h1>${guide.title}</h1>
                    <p>${guide.description}</p>
                </div>
                ${sectionOrder.map(key => sections[key]).join('')}
            </section>
        `;
        focusMain();
    }

    function renderBook() {
        setActiveNav('book');
        const pages = Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1);
        app.innerHTML = `
            <section class="book-layout">
                <a class="back-link" href="#home">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    돌아가기
                </a>
                <div class="section-heading wide">
                    <span>원본 이북</span>
                    <h1>전체 44쪽 보기</h1>
                    <p>원본 이북 이미지를 그대로 불러옵니다. 작은 글씨가 보이면 페이지를 눌러 크게 볼 수 있습니다.</p>
                    <p><a class="inline-link" href="${SOURCE_URL}" target="_blank" rel="noopener">원본 이북 사이트 열기</a></p>
                </div>
                <div class="book-grid">
                    ${pages.map(page => `
                        <a class="book-thumb" href="#page/${page}">
                            <img loading="lazy" src="${pageImage(page)}" alt="원본 책자 ${pageLabel(page)}">
                            <span>${pageLabel(page)}</span>
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
        focusMain();
    }

    function renderPage(pageNumber, sourceCategoryId, sourceTopicId) {
        const panelParams = new URLSearchParams(window.LONGCARE_REVIEWED ? location.hash.split('?')[1] || '' : '');
        panelParams.delete('part');
        const panelQuery = panelParams.size ? `?${panelParams}` : '';
        const context = (sourceCategoryId && sourceTopicId ? `/${sourceCategoryId}/${sourceTopicId}` : '') + panelQuery;
        const page = Math.min(Math.max(Number(pageNumber) || 1, 1), TOTAL_PAGES);
        const source = sourceCategoryId && sourceTopicId && !['guide', 'category'].includes(sourceCategoryId) ? findTopic(sourceCategoryId, sourceTopicId) : null;
        const found = source || findByPage(page);
        const guideSource = sourceCategoryId === 'guide' ? guideDetails.find(guide => guide.id === sourceTopicId) : null;
        const categorySource = sourceCategoryId === 'category' ? findCategory(sourceTopicId) : null;
        const backHref = (guideSource ? `#guide/${guideSource.id}` : categorySource ? `#category/${categorySource.id}` : found?.topic ? `#topic/${found.category.id}/${found.topic.id}` : found?.id ? `#category/${found.id}` : '#book') + panelQuery;
        const caption = guideSource ? guideSource.title : categorySource ? categorySource.title : found?.topic ? `${found.category.title} · ${found.topic.title}` : found?.title || '장기요양급여 이용 안내';
        setActiveNav('book');
        app.innerHTML = `
            <section class="page-reader">
                <div class="reader-toolbar">
                    <a class="back-link" href="${backHref}">
                        <i data-lucide="chevron-left" aria-hidden="true"></i>
                        돌아가기
                    </a>
                    <div class="page-stepper" aria-label="페이지 이동">
                        <a class="${page === 1 ? 'disabled' : ''}" href="#page/${page - 1}${context}" aria-disabled="${page === 1}">
                            이전
                        </a>
                        <strong>${pageLabel(page)} / ${TOTAL_PAGES}쪽</strong>
                        <a class="${page === TOTAL_PAGES ? 'disabled' : ''}" href="#page/${page + 1}${context}" aria-disabled="${page === TOTAL_PAGES}">
                            다음
                        </a>
                    </div>
                </div>
                <figure class="full-page">
                    <img src="${pageImage(page)}" alt="장기요양급여 이용 안내 원본 ${pageLabel(page)}">
                    <figcaption>${caption} · 원본 ${pageLabel(page)}</figcaption>
                </figure>
            </section>
        `;
        focusMain();
    }

    function normalizeSearchText(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function searchTokens(query) {
        const normalized = normalizeSearchText(query);
        const compact = normalized.replace(/\s/g, '');
        const tokens = normalized.split(' ').filter(token => token.length > 1);
        if (compact && compact !== normalized && compact.length > 1) tokens.push(compact);
        const expanded = tokens.flatMap(token => {
            const stripped = token.replace(/(은|는|이|가|을|를|에|에서|으로|로|와|과|도|만|요|인가요|예요|이에요|인가)$/u, '');
            return stripped && stripped !== token && stripped.length > 1 ? [token, stripped] : [token];
        });
        return [...new Set([...expanded, ...aliasTokens(query)])];
    }

    // 검색 유사어 사전은 search-aliases.js 에서 고칩니다(이 파일은 건드리지 않아도 됩니다).
    const SEARCH_ALIASES = Array.isArray(window.SEARCH_ALIASES) ? window.SEARCH_ALIASES : [];
    function aliasHit(alias, query) {
        const compact = normalizeSearchText(query).replace(/\s/g, '');
        return alias.words.some(word => compact.includes(word));
    }
    function aliasTokens(query) {
        return SEARCH_ALIASES.filter(alias => aliasHit(alias, query)).flatMap(alias => alias.tokens);
    }
    // 책자 내용 중 검색어와 가장 관련 있는 문장 1~2개(요약이 아니라 원문 문장 그대로).
    function bestSentences(entry, tokens) {
        let candidates = entry.blocks?.length ? entry.blocks : entry.texts.join(' ').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/);
        candidates = candidates.flatMap(block => block.length > 200 ? block.split(/(?<=[.!?])\s+/) : [block])
            .map(text => text.trim()).filter(text => text.length >= 12 && text.length <= 200);
        const scored = candidates.map((sentence, index) => {
            const normalized = normalizeSearchText(sentence);
            return { sentence, index, score: tokens.filter(token => normalized.includes(token) || normalized.replace(/\s/g, '').includes(token)).length };
        }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 2);
        return scored.sort((a, b) => a.index - b.index).map(item => item.sentence);
    }

    function compactText(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function collectStrings(value, output = []) {
        if (typeof value === 'string' || typeof value === 'number') {
            const text = compactText(value);
            if (text) output.push(text);
            return output;
        }

        if (Array.isArray(value)) {
            value.forEach(item => collectStrings(item, output));
            return output;
        }

        if (value && typeof value === 'object') {
            Object.entries(value).forEach(([key, item]) => {
                if (['icon', 'tone', 'image', 'alt', 'source', 'sourceRefs', 'sourceKind', 'color', 'id'].includes(key)) return;
                collectStrings(item, output);
            });
        }

        return output;
    }

    function uniqueList(items, limit = 5) {
        const seen = new Set();
        return items.filter(item => {
            const key = normalizeSearchText(item);
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, limit);
    }

    function searchEntryScore(entry, normalizedQuery, tokens) {
        const haystack = normalizeSearchText(`${entry.title} ${entry.subtitle || ''} ${entry.texts.join(' ')}`);
        const compactHaystack = haystack.replace(/\s/g, '');
        let score = 0;

        if (haystack.includes(normalizedQuery) || compactHaystack.includes(normalizedQuery.replace(/\s/g, ''))) {
            score += 12;
        }

        tokens.forEach(token => {
            if (haystack.includes(token) || compactHaystack.includes(token)) score += 3;
            if (normalizeSearchText(entry.title).includes(token) || normalizeSearchText(entry.title).replace(/\s/g, '').includes(token)) score += 4;
        });

        return score;
    }

    function buildSearchEntries() {
        const entries = [];

        categories.forEach(category => {
            const reviewed = window.LONGCARE_REVIEWED?.[category.id];
            if (window.LONGCARE_REVIEWED) {
                const container = document.createElement('div');
                container.innerHTML = reviewed?.html || (category.id === 'documents' ? renderDocuments(true) : renderGrade(true));
                container.querySelectorAll('.back-link,.ebook-source-details').forEach(el => el.remove());
                const categoryTitle = reviewed?.title || category.title;
                const base = {type:'category',subtitle:categoryTitle,icon:category.icon,color:category.color,pages:reviewed?.pages || category.pages};
                entries.push({...base,title:categoryTitle,href:`#category/${category.id}`,texts:[container.textContent]});
                labelSearchSections(container).forEach(({element,title}) => {
                    entries.push({...base,type:'section',title,href:`#category/${category.id}?part=${element.id}`,texts:[element.textContent],blocks:Array.from(element.querySelectorAll('li,p,summary,td')).filter(node => !node.querySelector('li,p,td')).map(node => compactText(node.textContent)).filter(Boolean)});
                });
                return;
            }
            if (reviewed) {
                const container = document.createElement('div');
                container.innerHTML = reviewed.html;
                entries.push({type:'category', title:reviewed.title, subtitle:category.subtitle, href:`#category/${category.id}`, icon:category.icon, color:category.color, pages:reviewed.pages, texts:[reviewed.title,...Array.from(container.querySelectorAll('p,li,tr,article.review-rate')).map(el=>el.textContent.trim())]});
                return;
            }
            const detail = categoryDetails[category.id];
            entries.push({
                type: 'category',
                title: category.title,
                subtitle: category.subtitle,
                href: `#category/${category.id}`,
                icon: category.icon,
                color: category.color,
                pages: detail?.sourcePages || category.pages,
                texts: [
                    category.title,
                    category.subtitle,
                    ...category.topics.map(topic => topic.title),
                    ...collectStrings(detail)
                ]
            });

            category.topics.forEach(topic => {
                entries.push({
                    type: 'topic',
                    title: topic.title,
                    subtitle: category.title,
                    href: `#topic/${category.id}/${topic.id}`,
                    icon: category.icon,
                    color: category.color,
                    pages: topic.pages,
                    texts: [category.title, category.subtitle, topic.title, ...topic.summary]
                });
            });
        });

        (window.LONGCARE_REVIEWED ? [] : guideDetails).forEach(guide => {
            entries.push({
                type: 'guide',
                title: guide.title,
                subtitle: guide.description,
                href: `#guide/${guide.id}`,
                icon: guide.menu?.icon || 'book-open',
                color: 'blue',
                pages: guide.sourcePages || [],
                texts: [guide.title, guide.description, ...collectStrings(guide)]
            });
        });

        return entries;
    }

    function makeSearchAnswer(results) {
        if (window.LONGCARE_REVIEWED) {
            const best = results[0];
            if (!best) return [];
            return (best.entry.answerTexts || []).map(text => text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim())
                .map(text => ({text,score:searchEntryScore({title:'',texts:[text]},best.normalizedQuery,best.tokens)}))
                .filter(item => item.score > 0).sort((a,b) => b.score-a.score).slice(0,1).map(item => item.text);
        }
        const snippets = [];

        results.slice(0, 4).forEach(result => {
            const bestTexts = result.entry.texts
                .map(text => compactText(text))
                .filter(text => text.length >= 8 && text.length <= 95)
                .sort((a, b) => {
                    const aScore = searchEntryScore({ ...result.entry, texts: [a] }, result.normalizedQuery, result.tokens);
                    const bScore = searchEntryScore({ ...result.entry, texts: [b] }, result.normalizedQuery, result.tokens);
                    return bScore - aScore;
                });
            snippets.push(...bestTexts);
        });

        return uniqueList(snippets, 4);
    }

    function renderAnswerList(items) {
        return `
            <ul class="answer-bullets">
                ${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
        `;
    }

    function renderRelatedSearchCards(results) {
        return results.slice(0, 5).map(({ entry }) => `
            <a class="answer-link-card ${entry.color || 'blue'}" href="${entry.href}">
                <span>
                    <i data-lucide="${entry.icon || 'book-open'}" aria-hidden="true"></i>
                </span>
                <strong>${escapeHtml(entry.title)}</strong>
                <em>${escapeHtml(entry.subtitle || '관련 안내')}</em>
                ${entry.pages?.length ? `<small>원문 ${pageRange(entry.pages)}</small>` : ''}
            </a>
        `).join('');
    }

    function renderSearch(query) {
        const normalized = query.trim();
        if (!normalized) {
            route();
            return;
        }

        const normalizedQuery = normalizeSearchText(query);
        const tokens = searchTokens(query);
        const results = buildSearchEntries()
            .map(entry => ({
                entry,
                normalizedQuery,
                tokens,
                score: searchEntryScore(entry, normalizedQuery, tokens)
            }))
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .filter((result, index, list) => list.findIndex(item => item.entry.href === result.entry.href) === index);
        if (window.LONGCARE_REVIEWED) {
            lastSearch = query;
            const sections = results.filter(result => result.entry.type === 'section');
            const listed = results.filter(result => result.entry.type === 'section' || !sections.some(section => section.entry.subtitle === result.entry.subtitle));
            const highlight = value => {
                const parts = String(value).split(new RegExp(`(${tokens.map(token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') || '(?!)'})`, 'gi'));
                return parts.map((part,index) => index % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)).join('');
            };
            const aliasNotes = SEARCH_ALIASES.filter(alias => alias.note && aliasHit(alias, query)).map(alias => `<p>${alias.note}</p>`).join('');
            const aliasBox = aliasNotes ? `<div class="search-alias">${aliasNotes}</div>` : '';
            const topSentences = listed.length ? bestSentences(listed[0].entry, tokens) : [];
            const answerBox = topSentences.length ? `<div class="search-answer"><span class="search-answer-label">가장 관련 있는 안내</span><ul>${topSentences.map(sentence => `<li>${highlight(sentence)}</li>`).join('')}</ul><a href="${listed[0].entry.href}">${escapeHtml(listed[0].entry.title)} 전체 보기<i data-lucide="chevron-right" aria-hidden="true"></i></a></div>` : '';
            const emptyBox = listed.length ? '' : `<div class="search-empty-box"><strong>관련 항목을 찾지 못했습니다</strong><p>다른 말로 검색해 보세요.</p><div class="search-suggest">${['시설급여','방문요양','본인부담금','갱신신청','복지용구','주야간보호'].map(word => `<button type="button" data-suggest="${word}">${word}</button>`).join('')}</div><a class="search-call" href="tel:1577-1000"><i data-lucide="phone" aria-hidden="true"></i>국민건강보험공단 1577-1000</a></div>`;
            setActiveNav('');
            app.innerHTML = `<section class="search-results focused-search"><header><h1>검색 결과</h1><p>“${escapeHtml(query)}” <strong>${listed.length}개</strong></p></header>${aliasBox}${answerBox}<div class="search-match-list">${listed.map(({entry}) => `<a class="search-match" href="${entry.href}"><span class="search-match-icon"><i data-lucide="${entry.icon}" aria-hidden="true"></i></span><span><small>${highlight(entry.subtitle)}</small><strong>${highlight(entry.title)}</strong></span><i data-lucide="chevron-right" aria-hidden="true"></i></a>`).join('')}</div>${emptyBox}<a class="grade-related" href="#home">전체 목차<i data-lucide="arrow-right" aria-hidden="true"></i></a></section>`;
            if (window.lucide) lucide.createIcons();
            return;
        }
        const answerItems = makeSearchAnswer(results);
        const hasResults = results.length > 0;

        setActiveNav('');
        app.innerHTML = `
            <section class="search-results">
                <div class="answer-card">
                    <div class="answer-card-head">
                        <span class="answer-icon">
                            <i data-lucide="${hasResults ? 'message-circle-question' : 'search-x'}" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>안내 검색</span>
                            <h1>“${escapeHtml(query)}”</h1>
                        </div>
                    </div>
                    ${hasResults ? `
                        <p class="answer-lead">앱에 정리된 책자 내용에서 관련 안내를 찾았습니다.</p>
                        ${renderAnswerList(answerItems)}
                        ${window.LONGCARE_REVIEWED && answerItems.length ? `<a class="grade-related" href="${results[0].entry.href}">${escapeHtml(results[0].entry.title)} 전체 안내<i data-lucide="chevron-right" aria-hidden="true"></i></a>` : ''}
                    ` : `
                        <p class="answer-lead">앱에 정리된 내용에서 바로 답할 수 있는 항목을 찾지 못했습니다.</p>
                        <div class="answer-empty">
                            <strong>이렇게 다시 검색해 보세요</strong>
                            <span>예: 방문요양, 본인부담금, 갱신신청, 인정서, 복지용구</span>
                        </div>
                    `}
                </div>
                ${hasResults ? `
                    <div class="answer-related">
                        <div class="answer-section-title">
                            <h2>관련 화면 바로가기</h2>
                            <p>더 자세한 내용은 아래 항목에서 확인할 수 있습니다.</p>
                        </div>
                        <div class="answer-link-grid">
                            ${renderRelatedSearchCards(results)}
                        </div>
                    </div>
                ` : ''}
                <a class="answer-source-button" href="#book">
                    <i data-lucide="book-open" aria-hidden="true"></i>
                    <span>장기요양급여 이용 안내 e&#8209;book에서 전체 내용 확인하기</span>
                </a>
            </section>
        `;
        if (window.lucide) lucide.createIcons();
    }

    function route() {
        const hash = (window.location.hash || '#home').split('?')[0];
        if (searchInput.value.trim()) {
            renderSearch(searchInput.value);
            return;
        }

        if (window.LONGCARE_REVIEWED && hash === '#search') {
            const query = new URLSearchParams(location.hash.split('?')[1] || '').get('q') || '';
            if (query) { searchInput.value = query; renderSearch(query); } else renderHome();
        } else if (hash.startsWith('#guide/')) {
            const guide = findGuide(hash.replace('#guide/', ''));
            if (guide) renderGuideDetail(guide);
            else renderContents();
        } else if (hash.startsWith('#category/')) {
            renderCategory(hash.replace('#category/', ''));
        } else if (hash.startsWith('#topic/')) {
            const [, categoryId, topicId] = hash.split('/');
            renderTopic(categoryId, topicId);
        } else if (hash.startsWith('#section/')) {
            const legacyId = hash.replace('#section/', '');
            renderCategory(legacySectionMap[legacyId] || 'grade');
        } else if (hash.startsWith('#page/')) {
            const [, pageNumber, sourceCategoryId, sourceTopicId] = hash.split('/');
            renderPage(pageNumber, sourceCategoryId, sourceTopicId);
        } else if (hash === '#contents') {
            renderContents();
        } else if (hash === '#book') {
            renderBook();
        } else {
            renderHome();
        }
    }

    function setFont(size) {
        document.documentElement.dataset.font = size;
        localStorage.setItem('longcare-font-size', size);
        document.querySelectorAll('.font-button').forEach(button => {
            const isActive = button.dataset.font === size;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    searchInput.addEventListener('input', event => {
        if (window.LONGCARE_REVIEWED && !event.target.value.trim()) { window.location.hash = '#home'; renderHome(); return; }
        renderSearch(event.target.value);
    });

    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            if (window.LONGCARE_REVIEWED && location.hash.startsWith('#search')) window.location.hash = '#home';
            route();
            searchInput.blur();
        }
    });

    app.addEventListener('click', event => {
        const suggest = event.target.closest('[data-suggest]');
        if (!suggest) return;
        searchInput.value = suggest.dataset.suggest;
        renderSearch(suggest.dataset.suggest);
    });

    document.getElementById('guideSearch')?.addEventListener('submit', event => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (!query) { searchInput.focus(); return; }
        renderSearch(query);
        searchInput.blur();
        app.focus({ preventScroll: true });
    });

    app.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (window.LONGCARE_REVIEWED && link?.hasAttribute('data-doc-method') && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            // Method selection changes only the panel, not the page or its scroll position.
            history.replaceState(null, '', link.getAttribute('href'));
            prepareFocusedView();
            return;
        }
        if (window.LONGCARE_REVIEWED && link?.getAttribute('href') === location.hash && searchInput.value) {
            event.preventDefault();
            searchInput.value = '';
            route();
        }
    });

    document.querySelectorAll('.font-button').forEach(button => {
        button.addEventListener('click', () => {
            setFont(button.dataset.font);
            const settings = button.closest('.font-settings');
            if (settings) { settings.open = false; settings.querySelector('summary').focus(); }
        });
    });

    window.addEventListener('hashchange', () => {
        searchInput.value = '';
        route();
    });

    setFont(localStorage.getItem('longcare-font-size') || 'large');
    route();
});
