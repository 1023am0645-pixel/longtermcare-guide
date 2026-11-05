/* =====================================================================
   고객의 소리 '답변 편지' (2026-11-05)
   · 의견을 보내면 서버가 무작위 표(replyToken)를 주고, 이 휴대폰에만 저장합니다. 이름·연락처는 받지 않아요.
   · 앱을 다시 열면 그 표로 답변이 왔는지 확인하고, 처음 온 답변이면 편지 모양 창을 한 번 띄웁니다.
   · 고객의 소리 화면 아래 '내가 보낸 의견'에서 다시 볼 수 있어요.
   · 서버가 응답하지 않아도 앱의 다른 기능에는 영향이 없습니다.
   ===================================================================== */
(function () {
    'use strict';
    const API = 'https://longtermcare-guide-feedback.jazzy-cocoa-4972.chatgpt.site/api/feedback/answer';
    const MINE_KEY = 'ltc_my_feedback_v1';
    const READ_KEY = 'ltc_letters_read_v1';

    const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch { return d; } };
    const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 무시 */ } };
    const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const dateText = s => { const m = String(s || '').match(/(\d{4})-(\d{2})-(\d{2})/); return m ? `${+m[1]}. ${+m[2]}. ${+m[3]}.` : ''; };

    let items = [];   // 서버에서 받은 내 의견들

    function mine() { return (load(MINE_KEY, []) || []).filter(x => x && x.t); }

    window.LTC_LETTERS = {
        save(result) {
            const list = mine().filter(x => x.t !== result.replyToken);
            list.unshift({ t: result.replyToken, id: result.receiptId, at: new Date().toISOString().slice(0, 10) });
            save(MINE_KEY, list.slice(0, 20));
        }
    };

    async function fetchAnswers() {
        const tokens = mine().map(x => x.t);
        if (!tokens.length) return [];
        try {
            const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tokens }), cache: 'no-store' });
            if (!res.ok) return [];
            const data = await res.json();
            return data && data.success && Array.isArray(data.items) ? data.items : [];
        } catch { return []; }
    }

    // ── 편지 창 ──
    function otherDialogOpen() {
        return !!document.querySelector('.share-sheet-backdrop.show, #shortcutGuide, .update-log-overlay:not([hidden]), .whats-new-overlay, .reply-letter-overlay');
    }
    function showLetter(item, onClose) {
        const box = document.createElement('div');
        box.className = 'reply-letter-overlay';
        box.innerHTML = `
            <section class="reply-letter" role="dialog" aria-modal="true" aria-labelledby="replyLetterTitle">
                <header class="reply-head">
                    <img class="reply-icon" src="icons3d/consult.webp" alt="" width="96" height="96">
                    <span class="reply-badge">답변 도착</span>
                    <h2 id="replyLetterTitle">보내주신 의견에<br>답변드려요</h2>
                </header>
                <div class="reply-body">
                    <div class="reply-block reply-mine">
                        <small>내 의견 · 접수번호 ${esc(item.receiptId)}${item.createdAt ? ` · ${esc(dateText(item.createdAt))}` : ''}</small>
                        <p>${esc(item.content)}</p>
                    </div>
                    <div class="reply-block reply-answer">
                        <small>답변</small>
                        <p>${esc(item.answer).replace(/\n/g, '<br>')}</p>
                    </div>
                    <p class="reply-from">대전서부지사 김하연 드림</p>
                    <button type="button" class="reply-ok">확인했어요</button>
                </div>
            </section>`;
        const close = () => {
            box.classList.remove('show');
            document.documentElement.classList.remove('reply-letter-open');
            setTimeout(() => { box.remove(); if (onClose) onClose(); }, 200);
        };
        box.addEventListener('click', e => { if (e.target === box || e.target.closest('.reply-ok')) close(); });
        document.addEventListener('keydown', function onKey(e) {
            if (e.key !== 'Escape' || !box.isConnected) return;
            document.removeEventListener('keydown', onKey);
            close();
        });
        document.body.appendChild(box);
        document.documentElement.classList.add('reply-letter-open');
        requestAnimationFrame(() => box.classList.add('show'));
        box.querySelector('.reply-letter').setAttribute('tabindex', '-1');
        setTimeout(() => box.querySelector('.reply-letter').focus({ preventScroll: true }), 300);
    }

    function showUnread() {
        const read = new Set(load(READ_KEY, []) || []);
        const queue = items.filter(i => i.answer && !read.has(i.token)).sort((a, b) => a.receiptId - b.receiptId);
        if (!queue.length) return;
        if (otherDialogOpen()) { setTimeout(showUnread, 1500); return; }
        const next = queue[0];
        showLetter(next, () => {
            read.add(next.token);
            save(READ_KEY, Array.from(read).slice(-50));
            setTimeout(showUnread, 400);   // 답변이 여러 개면 차례로
            renderMine();
        });
    }

    // ── 고객의 소리 화면: 내가 보낸 의견 ──
    function renderMine() {
        const box = document.getElementById('myFeedbackSection');
        if (!box) return;
        const list = mine();
        if (!list.length) { box.hidden = true; return; }
        const byToken = new Map(items.map(i => [i.token, i]));
        box.hidden = false;
        box.innerHTML = `
            <div class="guide-settings-section-head"><h2 id="my-feedback-title">내가 보낸 의견</h2></div>
            <ul class="my-feedback-list">${list.map(x => {
                const i = byToken.get(x.t);
                const answered = i && i.answer;
                return `<li>
                    <div class="my-feedback-top"><strong>접수번호 ${esc(x.id)}</strong><span class="${answered ? 'is-done' : 'is-wait'}">${answered ? '답변 완료' : '답변 준비 중'}</span></div>
                    ${i ? `<p class="my-feedback-q">${esc(i.content)}</p>` : ''}
                    ${answered ? `<button type="button" class="my-feedback-open" data-token="${esc(x.t)}">답변 다시 보기</button>` : ''}
                </li>`;
            }).join('')}</ul>`;
        box.querySelectorAll('.my-feedback-open').forEach(btn => btn.addEventListener('click', () => {
            const i = byToken.get(btn.dataset.token);
            if (i) showLetter(i);
        }));
    }

    // 담당자가 휴지통으로 옮긴 의견은 이 휴대폰 목록에서도 지웁니다.
    function dropDeleted(list) {
        const gone = new Set(list.filter(i => i && i.deleted).map(i => i.token));
        if (gone.size) save(MINE_KEY, mine().filter(x => !gone.has(x.t)));
        return list.filter(i => i && !i.deleted);
    }

    async function start() {
        if (!mine().length) return;
        items = dropDeleted(await fetchAnswers());
        renderMine();
        setTimeout(showUnread, 800);
        const app = document.getElementById('app');
        if (app && 'MutationObserver' in window) new MutationObserver(() => {
            const box = document.getElementById('myFeedbackSection');
            if (box && box.hidden && mine().length) renderMine();
        }).observe(app, { childList: true });
        // 의견을 새로 보낸 뒤 고객의 소리 화면에 바로 반영
        window.addEventListener('hashchange', () => setTimeout(renderMine, 0));
    }
    // 의견을 처음 보낸 휴대폰에서도 '내가 보낸 의견'이 바로 보이도록
    const origSave = window.LTC_LETTERS.save;
    window.LTC_LETTERS.save = result => { origSave(result); renderMine(); if (!items.length) fetchAnswers().then(r => { items = dropDeleted(r); renderMine(); }); };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
})();
