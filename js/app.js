document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PAGES = 44;
    const BOOK_BASE = 'assets/book-pages';
    const SOURCE_URL = 'https://ligsystemup.kdtidc.com/e-book/2026%EC%9E%A5%EA%B8%B0%EC%9A%94%EC%96%91%EA%B8%89%EC%97%AC%EC%9D%B4%EC%9A%A9_ebook/index.html';

    const { categories, legacySectionMap, quickMenus, mainMenus, applicationGuide, gradeResultGuide } = window.LONGCARE_CONTENT;
    const guideDetails = [applicationGuide, gradeResultGuide].filter(Boolean);

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
        return guideDetails.find(guide => guide.id === guideId) || applicationGuide;
    }

    function findByPage(page) {
        return allTopics().find(({ topic }) => topic.pages.includes(page))
            || categories.find(category => category.pages.includes(page))
            || null;
    }

    function setActiveNav(route, bodyRoute = route || 'search') {
        document.body.dataset.route = bodyRoute;
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.route === route);
        });
    }

    function focusMain() {
        app.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (window.lucide) lucide.createIcons();
    }

    function categoryButton(category) {
        return `
            <a class="category-button ${category.color}" href="#category/${category.id}">
                <i data-lucide="${category.icon}" aria-hidden="true"></i>
                <strong>${category.title}</strong>
                <span>${category.subtitle}</span>
            </a>
        `;
    }

    function quickMenuButton(item) {
        return `
            <a class="quick-menu ${item.tone}" href="${item.href}">
                <span class="quick-icon">
                    <i data-lucide="${item.icon}" aria-hidden="true"></i>
                </span>
                <strong>${item.title}</strong>
            </a>
        `;
    }

    function homeMenuCard(item) {
        return `
            <a class="home-card ${item.tone}" href="${item.href}">
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
        app.innerHTML = `
            <section class="home-guide">
                <div class="quick-menu-grid primary-actions" aria-label="주요기능">
                    ${quickMenus.map(quickMenuButton).join('')}
                </div>

                <div class="home-tabs" aria-label="홈 구분">
                    <a class="active" href="#home">주요 메뉴</a>
                    <a href="#contents">전체 목차</a>
                    <a href="#book">이북 원문</a>
                </div>

                <div class="home-section-head">
                    <h2>무엇을 확인할까요?</h2>
                    <p>원하는 항목을 누르면 세부 안내로 이동합니다.</p>
                </div>

                <div class="main-menu-grid" aria-label="주요 메뉴">
                    ${mainMenus.map(homeMenuCard).join('')}
                </div>

                <a class="home-cta" href="#contents">
                    <span>나에게 맞는 장기요양 정보를 찾아보세요</span>
                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                </a>
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

    function renderCategory(categoryId) {
        const category = findCategory(categoryId);
        setActiveNav('contents');
        app.innerHTML = `
            <section class="category-layout guide-view ${category.color}">
                <a class="back-link" href="#home">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    큰 목차로
                </a>
                <div class="category-hero">
                    <div>
                        <span class="section-number">${category.no}</span>
                        <h1>${category.title}</h1>
                        <p>${category.subtitle}</p>
                        <div class="ebook-meta">
                            <i data-lucide="book-open" aria-hidden="true"></i>
                            이북 ${pageRange(category.pages)} 관련
                        </div>
                    </div>
                    <img loading="lazy" src="${pageImage(category.pages[0])}" alt="${category.title} 관련 원본 ${pageLabel(category.pages[0])}">
                </div>
                <div class="section-heading">
                    <span>세부 카테고리</span>
                    <h2>궁금한 내용을 다시 선택하세요</h2>
                </div>
                <div class="subtopic-grid" aria-label="${category.title} 세부 카테고리">
                    ${category.topics.map(topic => subtopicButton(category, topic)).join('')}
                </div>
            </section>
        `;
        focusMain();
    }

    function renderTopic(categoryId, topicId) {
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

    function renderGuideDetail(guide) {
        const newsSection = `
            <section class="card-news-panel" aria-labelledby="${guide.id}-cardnews-title">
                <div class="panel-title">
                    <span class="panel-icon blue">
                        <i data-lucide="panels-top-left" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2 id="${guide.id}-cardnews-title">핵심만 먼저 보기</h2>
                    </div>
                </div>
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
                        <h2 id="${guide.id}-flow-title">${guide.flowTitle || '진행 순서'}</h2>
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
                        <h2 id="${guide.id}-comparison-title">표로 정리한 핵심 내용</h2>
                    </div>
                </div>
                <div class="comparison-list">
                    ${guide.keyTable.map(item => `
                        <article class="comparison-card">
                            <strong>${item.label}</strong>
                            <dl>
                                <div>
                                    <dt>핵심 내용</dt>
                                    <dd>${item.content}</dd>
                                </div>
                                <div>
                                    <dt>확인할 점</dt>
                                    <dd>${item.check}</dd>
                                </div>
                            </dl>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
        const checklistSection = `
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
        `;
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
        const cautionSection = `
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
        `;
        const sourceSection = `
            <details class="ebook-source-details">
                <summary>
                    <span>
                        <i data-lucide="book-open" aria-hidden="true"></i>
                        장기요양 급여이용가이드 e-book에서 전체 내용 확인하기
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
                    가이드 홈
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
        const page = Math.min(Math.max(Number(pageNumber) || 1, 1), TOTAL_PAGES);
        const source = sourceCategoryId && sourceTopicId && sourceCategoryId !== 'guide' ? findTopic(sourceCategoryId, sourceTopicId) : null;
        const found = source || findByPage(page);
        const guideSource = sourceCategoryId === 'guide' ? guideDetails.find(guide => guide.id === sourceTopicId) : null;
        const backHref = guideSource ? `#guide/${guideSource.id}` : found?.topic ? `#topic/${found.category.id}/${found.topic.id}` : found?.id ? `#category/${found.id}` : '#book';
        const caption = guideSource ? guideSource.title : found?.topic ? `${found.category.title} · ${found.topic.title}` : found?.title || '장기요양급여 이용 안내';
        setActiveNav('book');
        app.innerHTML = `
            <section class="page-reader">
                <div class="reader-toolbar">
                    <a class="back-link" href="${backHref}">
                        <i data-lucide="chevron-left" aria-hidden="true"></i>
                        돌아가기
                    </a>
                    <div class="page-stepper" aria-label="페이지 이동">
                        <a class="${page === 1 ? 'disabled' : ''}" href="#page/${page - 1}" aria-disabled="${page === 1}">
                            이전
                        </a>
                        <strong>${pageLabel(page)} / ${TOTAL_PAGES}쪽</strong>
                        <a class="${page === TOTAL_PAGES ? 'disabled' : ''}" href="#page/${page + 1}" aria-disabled="${page === TOTAL_PAGES}">
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

    function renderSearch(query) {
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
            route();
            return;
        }

        const matchedCategories = categories.filter(category => {
            const haystack = `${category.title} ${category.subtitle} ${category.topics.map(topic => topic.title).join(' ')}`.toLowerCase();
            return haystack.includes(normalized);
        });
        const matchedTopics = allTopics().filter(({ category, topic }) => {
            const haystack = `${category.title} ${category.subtitle} ${topic.title} ${topic.summary.join(' ')}`.toLowerCase();
            return haystack.includes(normalized);
        });
        const matchedGuides = guideDetails.filter(guide => {
            const haystack = `${guide.title} ${guide.description} ${guide.newsCards.map(card => `${card.title} ${card.headline} ${card.text}`).join(' ')} ${guide.steps.map(step => `${step.title} ${step.text}`).join(' ')} ${guide.keyTable.map(item => `${item.label} ${item.content} ${item.check} ${item.pages}`).join(' ')} ${guide.checklist.map(item => `${item.title} ${item.text}`).join(' ')} ${guide.faqs.map(item => `${item.q} ${item.a}`).join(' ')}`.toLowerCase();
            return haystack.includes(normalized);
        });

        setActiveNav('');
        app.innerHTML = `
            <section class="search-results">
                <div class="section-heading wide">
                    <span>검색 결과</span>
                    <h1>“${escapeHtml(query)}”</h1>
                    <p>${matchedCategories.length + matchedTopics.length + matchedGuides.length ? '관련 항목을 찾았습니다.' : '검색 결과가 없습니다. 다른 단어로 다시 검색해 보세요.'}</p>
                </div>
                ${matchedGuides.length ? `
                    <div class="main-menu-grid">
                        ${matchedGuides.map(guide => homeMenuCard(guide.menu)).join('')}
                    </div>
                ` : ''}
                ${matchedCategories.length ? `
                    <div class="category-grid">
                        ${matchedCategories.map(categoryButton).join('')}
                    </div>
                ` : ''}
                ${matchedTopics.length ? `
                    <div class="subtopic-grid search-topic-grid">
                        ${matchedTopics.map(({ category, topic }) => subtopicButton(category, topic)).join('')}
                    </div>
                ` : ''}
            </section>
        `;
        if (window.lucide) lucide.createIcons();
    }

    function route() {
        const hash = window.location.hash || '#home';
        if (searchInput.value.trim()) {
            renderSearch(searchInput.value);
            return;
        }

        if (hash.startsWith('#guide/')) {
            renderGuideDetail(findGuide(hash.replace('#guide/', '')));
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
        renderSearch(event.target.value);
    });

    searchInput.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            searchInput.value = '';
            route();
            searchInput.blur();
        }
    });

    document.querySelectorAll('.font-button').forEach(button => {
        button.addEventListener('click', () => setFont(button.dataset.font));
    });

    window.addEventListener('hashchange', () => {
        searchInput.value = '';
        route();
    });

    setFont(localStorage.getItem('longcare-font-size') || 'large');
    route();
});
