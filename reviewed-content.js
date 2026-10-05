/* Approved source: docs/pdf-core-content-review.md. B study only. */
(() => {
    const list = items => `<ul class="review-list">${items.map(x => `<li>${x}</li>`).join('')}</ul>`;
    const note = text => `<aside class="review-note">${text}</aside>`;
    const more = (title, body) => `<details class="review-more"><summary>${title}</summary><div>${body}</div></details>`;
    const table = (headers, rows) => `<table class="review-table"><thead><tr>${headers.map(x => `<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((x,i) => i ? `<td>${x}</td>` : `<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table>`;
    const icon3d = { 'house':'home-care', 'building-2':'facility', 'wallet':'copayment', 'search-check':'institution', 'messages-square':'consult', 'file-signature':'contract', 'heart-handshake':'home-care' };
    const tile = (icon, title, text, href) => `<article class="review-tile">${icon3d[icon] ? `<span class="review-tile-icon icon3d"><img src="icons3d/${icon3d[icon]}.webp" alt="" width="192" height="192" loading="lazy"></span>` : `<i data-lucide="${icon}" aria-hidden="true"></i>`}<h2>${title}</h2><p>${text}</p>${href ? `<a href="#category/${href}">${title} 종류<i data-lucide="chevron-right" aria-hidden="true"></i></a>` : ''}</article>`;
    const steps = items => `<ol class="review-steps">${items.map(x => `<li>${x}</li>`).join('')}</ol>`;
    window.LONGCARE_REVIEWED = {
        'benefit-types': {
            title: '장기요양급여 종류', pages: [5,6],
            html: `<div class="review-tiles">${tile('house','재가급여','방문요양·방문목욕·방문간호·주·야간보호·단기보호·복지용구','home-care')}${tile('building-2','시설급여','노인요양시설·노인요양공동생활가정에서 생활하며 돌봄 이용','facility')}${tile('wallet','특별현금급여','정해진 사유로 기관 급여 이용이 어렵다고 인정되는 경우의 가족요양비')}</div>${note('재가급여와 시설급여는 중복하여 이용할 수 없습니다. 가족요양비 지급 대상자는 재가급여 중 복지용구를 추가로 이용할 수 있습니다.')}${more('가족요양비 지급 및 변경신청', list(['장기요양기관이 매우 부족한 섬·벽지지역에 거주하는 경우','천재지변으로 기관 급여 이용이 어려운 경우','신체·정신 또는 성격 등의 사유로 기관 급여 이용이 어렵다고 인정되는 경우'])+'<p>위 경우에 가족 등에게 방문요양에 상당하는 돌봄을 받으면 현금으로 지급합니다.</p><p>가족요양비 지급신청서 등을 공단에 제출해야 합니다. 다른 재가급여 또는 시설급여를 이용하려면 급여 종류·내용 변경신청이 필요하며, 변경신청 없이 이용한 해당 급여비용은 전액 본인부담입니다. 복지용구 추가 이용은 가능합니다.</p>')}`
        },
        'eligible-benefits': {
            title: '등급별 이용 가능 급여', pages: [7,28],
            html: table(['등급','이용 가능한 급여'],[['1~2등급','재가급여 또는 시설급여'],['3~5등급','재가급여<br><strong>시설급여는 급여종류·내용변경신청을 통해 인정받은 후 이용</strong>'],['인지지원등급','주·야간보호, 기타재가급여(복지용구)']]) + note('1~5등급은 지급 요건을 충족하는 경우 가족요양비를 이용할 수 있습니다. 장기요양 가족휴가제를 위한 종일 방문요양·단기보호는 모든 등급 이용 가능합니다.') + more('3~5등급의 시설급여 변경신청', '<h2>3~4등급: 한 가지 사유 충족</h2>'+list(['주수발자인 가족구성원으로부터 수발이 곤란한 경우','주거환경이 열악하여 시설입소가 불가피한 경우','치매 등에 따른 문제행동으로 재가급여를 이용할 수 없는 경우'])+'<h2>5등급: 두 가지 모두 충족</h2>'+list(['치매증상 등 일정요건이 충족','주수발자인 가족구성원으로부터 수발이 곤란하거나, 주거환경이 열악하여 시설입소가 불가피한 경우'])+'<p>사실확인서·치매진단서 등 신청사유를 입증할 증빙자료를 제출하며, 등급판정위원회가 인정한 경우 시설급여를 이용할 수 있습니다.</p>')
        },
        institution: {
            title: '장기요양기관 선택', pages: [10,31],
            html: `<div class="review-tiles">${tile('search-check','1. 장기요양기관 선택','평가 결과를 활용하여 서비스 질이 우수한 기관을 선택합니다.')}<article class="review-tile review-tile-list"><span class="review-tile-icon icon3d"><img src="icons3d/contract.webp" alt="" width="192" height="192" loading="lazy"></span><h2>2. 급여계약 체결</h2>${list(['<strong>필수서류</strong>: 장기요양인정서·개인별장기요양이용계획서 등을 준비합니다.','<strong>의료급여 수급권자</strong>: 관할 시·군·구에 입소·이용 신청·승인 후 계약합니다.','<strong>필수 확인사항</strong>: 계약서 내용을 꼼꼼히 확인하고 2부 작성해 각각 1부씩 보관합니다.'])}</article>${tile('heart-handshake','3. 장기요양급여 이용','급여제공계획서에 따라 이용하며, 기관으로부터 장기요양급여 제공기록지를 제공받으시기 바랍니다.')}</div><a class="finder-btn" data-finder href="#" target="_blank" rel="noopener"><i data-lucide="map-pin" aria-hidden="true"></i><span>장기요양 기관찾기</span><i data-lucide="external-link" aria-hidden="true"></i></a>${more('홈페이지에서 기관 찾기',steps(['노인장기요양보험 홈페이지(www.longtermcare.or.kr)','민원서비스','검색서비스','장기요양기관 찾기'])+'<p>지역별·급여종류별·기관 명칭별 검색 및 평가 결과 확인이 가능합니다.</p>')}`
        },
        contract: {
            title: '급여계약 절차', pages: [10,31],
            html: steps(['서류 준비','급여 내용·비용 확인','계약서 2부 작성·각각 보관','급여제공계획 확인·동의 후 이용']) + '<h2>준비 서류</h2>'+list(['장기요양인정서','개인별장기요양이용계획서','복지용구 급여확인서: <strong>복지용구 이용 시에만 필요</strong>','본인부담금 감경대상자 증명서: <strong>해당자에 한함</strong>'])+'<p>원본은 수급자 또는 보호자가 항상 보관합니다.</p>'+note('「국민기초생활보장법」에 따른 의료급여 수급자 및 기타 의료급여 수급권자는 관할 시·군·구에 입소·이용 신청 및 승인 후 계약합니다. 승인 없이 이용하면 해당 급여비용은 전액 본인부담입니다.')+more('계약 내용 및 이용 종료',list(['계약기간, 급여 종류·내용, 비급여를 포함한 비용을 확인합니다.','개인별장기요양이용계획서에 따라 이용횟수와 급여제공 내용을 결정합니다.','이용 중단·종료 시 기관에 급여계약 해지를 통보합니다.','이용 후 기관으로부터 장기요양급여 제공기록지를 제공받습니다.']))
        },
        'home-care': {
            title: '재가급여', pages: [5,11,12,15,21,22],
            html: '<div class="review-service-grid">'+[
                ['visit-care.webp','방문요양','가정에서 식사 준비·이동·위생관리·병원 동행 등 돌봄'],
                ['visit-bath.webp','방문목욕','가정 내 욕조나 목욕설비 차량을 이용한 전신목욕 도움'],
                ['visit-nursing.webp','방문간호','방문간호지시서에 따른 간호·처치·상담 등'],
                ['day-care.webp','주·야간보호','낮 동안 기관에서 프로그램·식사·목욕 도움 등 돌봄'],
                ['short-stay-care.webp','단기보호','보호자의 입원·여행·출장 등으로 단기간 시설에서 돌봄'],
                ['welfare-equipment.webp','복지용구','일상생활·신체활동을 돕는 용품 구입·대여']
            ].map(([img,title,text]) => `<article class="review-service"><img src="illustrations/${img}" alt="" loading="lazy"><div><h2>${title}</h2><p>${text}</p></div></article>`).join('')+'</div>'+note('월 한도액은 매월 1일부터 말일까지 방문요양·방문목욕·방문간호·주·야간보호·단기보호에 적용됩니다. 초과금액은 전액 본인부담입니다. <strong>복지용구·의사소견서·방문간호지시서 발급비용은 포함되지 않습니다.</strong>')+more('등급별 월 한도액','<p>2026. 1. 1. 기준</p>'+table(['등급','월 한도액'],[['1등급','2,512,900원'],['2등급','2,331,200원'],['3등급','1,528,200원'],['4등급','1,409,700원'],['5등급','1,208,900원'],['인지지원등급','676,320원']]))+more('인지활동형 방문요양','<p>치매가 있는 수급자는 치매전문교육을 이수한 요양보호사와 인지자극활동, 식사 준비·개인위생 등 일상생활훈련을 함께 할 수 있습니다.</p>')+more('방문목욕 이용 횟수','<p>주 1회 이용이 원칙입니다. 변실금·요실금 등으로 피부 건강관리가 꼭 필요한 경우엔 초과 이용도 가능합니다.</p>')+more('방문간호지시서와 이용 제한',list(['방문간호지시서를 발급받은 뒤 이용합니다.','지시서 유효기간은 발급일부터 <strong>6개월(180일)</strong>이 원칙입니다.','상태변화로 의사가 필요하다고 판단하면 유효기간 내에 재발급받을 수 있습니다.','의료기관에서 받는 가정간호와 같은 날에는 이용할 수 없습니다.']))+more('단기보호 이용 기간',list(['1~5등급 대상, <strong>월 9일 이내</strong> 이용합니다.','특별한 사정(보호자 병원치료·경조사 등 갑작스러운 사정, 이사·공사 등 주거환경의 일시적 변화)이 있으면 <strong>연 4회까지, 1회 9일 이내</strong> 범위에서 월 한도액과 관계없이 연장 이용할 수 있습니다.'])+'<p>장기요양 가족휴가제를 위한 단기보호는 모든 등급 이용 가능합니다.</p>')+'<a class="grade-related" href="#category/equipment">복지용구 이용 안내<i data-lucide="chevron-right" aria-hidden="true"></i></a>'
        },
        equipment: {
            title: '복지용구', pages:[9,15,23,24],
            html:'<figure class="review-hero"><img src="illustrations/welfare-equipment.webp" alt="복지용구 이용 예시" loading="lazy"></figure><div class="review-amount"><span>1인당 연 한도액</span><strong>160만원</strong><p>본인부담금 + 공단부담금</p></div><p>최초 장기요양인정 유효기간 개시일부터 매 1년 적용됩니다. 등급변경으로 유효기간이 연장되어도 연 한도액 적용기간은 이어집니다. 초과금액은 전액 본인부담입니다.</p>'+note('복지용구 급여확인서의 <strong>‘사용이 가능한 복지용구’</strong> 품목을 확인합니다. 갱신 등으로 품목이 바뀔 수 있으므로 새 급여확인서를 확인합니다.')+steps(['복지용구사업소 선택','필수서류 3종으로 계약','구입·대여하여 이용'])+more('복지용구 이용 제한',list(['시설급여 이용 중에는 복지용구를 이용할 수 없습니다.','의료기관 입원 기간에는 <strong>전동침대·수동침대·이동욕조·목욕리프트</strong>를 사용할 수 없습니다. 대여 중인 제품은 반납을 위해 복지용구사업소에 연락합니다.','이미 같은 품목을 다른 제도(건강보험 보조기기, 산재보험 재활보조기구 등)로 지급받았다면, 그 품목의 사용 가능 햇수가 끝날 때까지는 복지용구로 다시 받을 수 없습니다.','위 이용제한 위반 시 비용은 전액 본인부담이며 공단부담금은 환수될 수 있습니다.']))
        },
        facility: {
            title:'시설급여',pages:[6,10,16,17],
            html:'<figure class="review-hero"><img src="illustrations/facility-care.webp" alt="시설급여 이용 예시" loading="lazy"></figure><p>치매·중풍 등 노인성질병 등으로 심신에 상당한 장애가 발생하여 도움이 필요한 노인을 위한 시설입니다.</p><div class="review-tiles">'+tile('building-2','노인요양시설','입소정원 10명 이상. 생활하며 급식·요양 등 일상생활에 필요한 편의를 제공합니다.')+tile('house','노인요양공동생활가정','입소정원 5~9명. 가정과 같은 주거여건에서 급식·요양 등 편의를 제공합니다.')+'</div>'+list(['시설 환경은 방문하여 확인합니다.','계약 전에 급여 내용과 비용을 상담받습니다.','비급여는 급여비용과 별도로 전액 본인부담입니다.'])+more('시설 비용 확인','<p>노인요양시설 급여비용은 요양보호사 배치 기준에 따라 다르며 본인부담금도 달라집니다.</p>'+list(['의료기관 입원·외박 시 해당 급여비용의 <strong>50%</strong>가 적용됩니다.','입원·외박 인정 기간은 <strong>1회 최대 10일, 1개월 15일까지</strong>입니다.']))+'<a class="grade-related" href="#category/eligible-benefits">등급별 이용 가능 급여<i data-lucide="chevron-right" aria-hidden="true"></i></a><a class="grade-related" href="#category/copayment">본인부담금<i data-lucide="chevron-right" aria-hidden="true"></i></a>'
        },
        copayment: {
            title:'본인부담금',pages:[17,18],
            html:'<p>본인부담금은 이용한 급여비용 중 수급자가 부담하는 금액입니다.</p><p>2026. 1. 1. 기준</p><div class="review-rates">'+[
                ['일반대상자','15%','20%'],['40% 감경대상자','9%','12%'],['60% 감경대상자·기타의료급여 수급권자','6%','8%'],['「국민기초생활보장법」에 따른 의료급여 수급자','면제','면제']
            ].map(([title,home,facility])=>`<article class="review-rate"><h2>${title}</h2><dl><div><dt>재가급여·복지용구</dt><dd>${home}</dd></div><div><dt>시설급여</dt><dd>${facility}</dd></div></dl></article>`).join('')+'</div><h2>비급여는 전액 본인부담</h2>'+list(['식사재료비','이·미용비','상급침실 이용에 따른 추가비용','그 외 일상생활에 통상 필요한 것과 관련된 비용으로 수급자에게 부담시키는 것이 적당하다고 보건복지부장관이 정하여 고시한 비용'])+more('본인부담금 감경 안내','<p>공단이 매월 말 건강보험료 등을 확인하여 감경 대상자를 결정하고 개별 통보합니다.</p><p>별도 신청절차는 없으나, 감경 해지자 중 보험료 변동 등의 사유로 감경 기준에 해당하면 신청이 필요합니다.</p>')
        }
    };
})();
