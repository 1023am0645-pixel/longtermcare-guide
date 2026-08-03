/*
 * 책자 콘텐츠 데이터 모음.
 * 화면 렌더링(라우팅/템플릿) 로직은 js/app.js에 있고,
 * 이 파일은 텍스트 콘텐츠만 담당한다 — 내용만 고치면 될 때 이 파일만 열면 된다.
 */
window.LONGCARE_CONTENT = {
    categories: [
        {
            id: 'grade',
            no: '01',
            title: '장기요양등급',
            subtitle: '등급과 인정서 읽는 법',
            icon: 'badge-check',
            color: 'violet',
            pages: [4, 5, 8],
            topics: [
                {
                    id: 'what-grade',
                    title: '장기요양등급이란?',
                    pages: [4, 5],
                    summary: [
                        '혼자서 일상생활을 하기 어려운 정도를 기준으로 장기요양등급을 정합니다.',
                        '등급은 1등급부터 5등급, 인지지원등급으로 나뉩니다.',
                        '등급에 따라 이용할 수 있는 급여 종류와 한도가 달라집니다.'
                    ]
                },
                {
                    id: 'grade-types',
                    title: '등급 종류 보기',
                    pages: [5],
                    summary: [
                        '1등급과 2등급은 장기요양 필요도가 높은 경우입니다.',
                        '3등급부터 5등급은 신체 기능과 돌봄 필요 정도에 따라 나뉩니다.',
                        '인지지원등급은 치매 등 인지 기능 관련 도움이 필요한 경우에 해당합니다.'
                    ]
                },
                {
                    id: 'read-certificate',
                    title: '인정서에서 볼 것',
                    pages: [8],
                    summary: [
                        '장기요양등급, 인정 유효기간, 이용 가능한 급여 종류를 봅니다.',
                        '표준장기요양이용계획서에는 권장 서비스와 이용 계획이 적혀 있습니다.',
                        '복지용구 급여확인서가 있으면 이용 가능한 품목도 함께 확인합니다.'
                    ]
                }
            ]
        },
        {
            id: 'benefit-types',
            no: '02',
            title: '장기요양급여 종류',
            subtitle: '재가, 시설, 복지용구 구분',
            icon: 'layers',
            color: 'pink',
            pages: [6, 7, 21],
            topics: [
                {
                    id: 'home-benefit',
                    title: '재가급여',
                    pages: [6, 21, 22, 23],
                    summary: [
                        '집에 살면서 받을 수 있는 장기요양 서비스입니다.',
                        '방문요양, 방문목욕, 방문간호, 주야간보호, 단기보호 등이 있습니다.',
                        '어르신 상황과 보호자 돌봄 여건에 맞춰 선택합니다.'
                    ]
                },
                {
                    id: 'facility-benefit',
                    title: '시설급여',
                    pages: [6, 7, 13, 14],
                    summary: [
                        '요양시설에 입소하여 돌봄을 받는 급여입니다.',
                        '집에서 생활하기 어려운 경우 시설 이용을 검토합니다.',
                        '시설급여는 재가급여와 본인부담률이 다릅니다.'
                    ]
                },
                {
                    id: 'equipment-benefit',
                    title: '복지용구',
                    pages: [16, 24, 25],
                    summary: [
                        '일상생활과 신체활동을 돕는 용품을 구입하거나 빌리는 급여입니다.',
                        '품목별로 구입 가능, 대여 가능 여부가 다릅니다.',
                        '복지용구 급여확인서의 이용 가능 품목을 기준으로 봅니다.'
                    ]
                }
            ]
        },
        {
            id: 'eligible-benefits',
            no: '03',
            title: '등급별 이용 가능 급여',
            subtitle: '내 등급으로 가능한 서비스',
            icon: 'list-checks',
            color: 'rose',
            pages: [6, 7, 8],
            topics: [
                {
                    id: 'grade-1-2',
                    title: '1~2등급',
                    pages: [6, 7],
                    summary: [
                        '재가급여와 시설급여 이용을 함께 검토할 수 있는 등급입니다.',
                        '어르신 상태와 가족 돌봄 가능 여부에 따라 서비스를 선택합니다.',
                        '인정서와 이용계획서의 급여 종류를 기준으로 진행합니다.'
                    ]
                },
                {
                    id: 'grade-3-5',
                    title: '3~5등급',
                    pages: [6, 7],
                    summary: [
                        '주로 재가급여 중심으로 서비스를 검토합니다.',
                        '방문요양, 주야간보호, 방문목욕 등 필요한 서비스를 고릅니다.',
                        '일부 서비스는 인정서와 이용계획서의 내용에 따라 달라질 수 있습니다.'
                    ]
                },
                {
                    id: 'cognitive-grade',
                    title: '인지지원등급',
                    pages: [5, 7, 23],
                    summary: [
                        '인지 기능 저하와 관련된 도움이 필요한 경우의 등급입니다.',
                        '인지활동형 프로그램이나 주야간보호 이용을 살펴볼 수 있습니다.',
                        '이용 가능한 급여는 인정서의 급여 종류를 기준으로 봅니다.'
                    ]
                }
            ]
        },
        {
            id: 'documents',
            no: '04',
            title: '서류 수령 방법',
            subtitle: '인정 후 받는 서류',
            icon: 'file-text',
            color: 'green',
            pages: [8, 9],
            topics: [
                {
                    id: 'received-documents',
                    title: '받게 되는 서류',
                    pages: [8],
                    summary: [
                        '장기요양인정서에는 등급과 유효기간이 적혀 있습니다.',
                        '표준장기요양이용계획서에는 권장 급여와 이용 계획이 적혀 있습니다.',
                        '복지용구 급여확인서는 해당되는 경우 함께 확인합니다.'
                    ]
                },
                {
                    id: 'document-reading',
                    title: '서류 읽는 순서',
                    pages: [8, 9],
                    summary: [
                        '먼저 인정서에서 등급과 유효기간을 봅니다.',
                        '다음으로 이용계획서에서 권장 서비스와 급여 종류를 봅니다.',
                        '마지막으로 실제 이용할 기관과 서비스 내용을 맞춰 봅니다.'
                    ]
                },
                {
                    id: 'valid-period',
                    title: '유효기간 확인',
                    pages: [28],
                    summary: [
                        '인정 유효기간 안에서 장기요양급여를 이용할 수 있습니다.',
                        '유효기간이 끝나기 전 갱신 절차가 필요합니다.',
                        '기간이 지나면 서비스 이용에 문제가 생길 수 있습니다.'
                    ]
                }
            ]
        },
        {
            id: 'institution',
            no: '05',
            title: '장기요양기관 선택',
            subtitle: '기관 찾기와 비교',
            icon: 'building-2',
            color: 'blue',
            pages: [9, 10],
            topics: [
                {
                    id: 'find-institution',
                    title: '기관 찾는 방법',
                    pages: [9],
                    summary: [
                        '이용하려는 급여 종류에 맞는 장기요양기관을 찾습니다.',
                        '집과의 거리, 서비스 가능 시간, 제공 인력을 함께 봅니다.',
                        '기관 평가와 이용 가능 여부를 비교하면 선택이 쉬워집니다.'
                    ]
                },
                {
                    id: 'compare-institution',
                    title: '비교할 항목',
                    pages: [9, 10],
                    summary: [
                        '서비스 내용, 이용 시간, 비용, 계약 조건을 비교합니다.',
                        '어르신에게 필요한 돌봄이 실제로 제공되는지 봅니다.',
                        '본인부담금과 추가 비용이 있는지도 확인합니다.'
                    ]
                },
                {
                    id: 'consult-institution',
                    title: '기관 상담 때 볼 것',
                    pages: [10, 19],
                    summary: [
                        '이용하려는 서비스 종류와 시간을 구체적으로 말합니다.',
                        '요양보호사 방문 가능 시간, 서비스 범위, 비용을 설명받습니다.',
                        '급여계약 전 계약서 내용을 충분히 읽습니다.'
                    ]
                }
            ]
        },
        {
            id: 'contract',
            no: '06',
            title: '급여계약 절차',
            subtitle: '계약 전후 흐름',
            icon: 'signature',
            color: 'amber',
            pages: [10, 31, 32],
            topics: [
                {
                    id: 'before-contract',
                    title: '계약 전 설명',
                    pages: [10],
                    summary: [
                        '기관은 급여 내용, 제공 시간, 비용을 설명해야 합니다.',
                        '이용자는 본인부담금과 제공받을 서비스를 이해한 뒤 계약합니다.',
                        '어르신 상태와 가족 요청 사항을 계약 전에 전달합니다.'
                    ]
                },
                {
                    id: 'contract-documents',
                    title: '계약서와 계획서',
                    pages: [10, 31, 32],
                    summary: [
                        '급여계약서에는 서비스 종류와 비용, 계약 기간이 담깁니다.',
                        '급여제공계획서에는 실제 제공할 서비스 내용이 정리됩니다.',
                        '서명 전 인정서와 이용계획서 내용이 반영됐는지 봅니다.'
                    ]
                },
                {
                    id: 'after-contract',
                    title: '계약 후 이용',
                    pages: [10, 12],
                    summary: [
                        '계약한 일정에 따라 서비스를 이용합니다.',
                        '이용 후 본인부담금을 납부합니다.',
                        '서비스 내용이 계약과 다르면 기관에 조정을 요청합니다.'
                    ]
                }
            ]
        },
        {
            id: 'home-care',
            no: '07',
            title: '재가급여',
            subtitle: '집에서 이용하는 서비스',
            icon: 'home',
            color: 'teal',
            pages: [21, 22, 23, 24, 25, 26, 27],
            topics: [
                {
                    id: 'visit-care',
                    title: '방문요양',
                    pages: [21],
                    summary: [
                        '요양보호사가 집으로 방문해 어르신의 일상생활을 돕는 서비스입니다.',
                        '식사, 이동, 세면, 주변 정리 등 필요한 도움을 받을 수 있습니다.',
                        '서비스 시간과 내용은 계약과 급여제공계획서에 맞춰 정합니다.'
                    ]
                },
                {
                    id: 'visit-bath',
                    title: '방문목욕',
                    pages: [22],
                    summary: [
                        '목욕 장비를 갖춘 인력이 방문해 목욕을 돕는 서비스입니다.',
                        '거동이 불편해 집에서 목욕이 어려운 경우 이용을 검토합니다.',
                        '방문 방식과 비용은 기관 설명을 듣고 계약합니다.'
                    ]
                },
                {
                    id: 'visit-nursing',
                    title: '방문간호',
                    pages: [22],
                    summary: [
                        '간호 인력이 집으로 방문해 간호와 건강 관리를 돕는 서비스입니다.',
                        '의료적 관리가 필요한 경우 이용을 검토합니다.',
                        '방문간호 이용 조건과 지시는 기관 상담 때 확인합니다.'
                    ]
                },
                {
                    id: 'day-night-care',
                    title: '주야간보호',
                    pages: [23],
                    summary: [
                        '낮 또는 밤 일정 시간 동안 기관에서 돌봄을 받는 서비스입니다.',
                        '식사, 프로그램, 이동 지원 등을 함께 받을 수 있습니다.',
                        '가족 돌봄 부담을 줄이는 데 도움이 됩니다.'
                    ]
                },
                {
                    id: 'short-stay',
                    title: '단기보호',
                    pages: [23],
                    summary: [
                        '일정 기간 동안 기관에 머물며 돌봄을 받는 서비스입니다.',
                        '보호자의 부재나 일시적 돌봄 공백이 있을 때 검토합니다.',
                        '이용 가능 기간과 비용 기준을 확인합니다.'
                    ]
                }
            ]
        },
        {
            id: 'equipment',
            no: '08',
            title: '복지용구',
            subtitle: '구입과 대여 품목',
            icon: 'accessibility',
            color: 'mint',
            pages: [16, 24, 25],
            topics: [
                {
                    id: 'equipment-use',
                    title: '복지용구란?',
                    pages: [24],
                    summary: [
                        '어르신의 일상생활과 이동을 돕는 용품을 지원하는 급여입니다.',
                        '품목에 따라 구입하거나 대여할 수 있습니다.',
                        '이용 가능 품목은 복지용구 급여확인서를 기준으로 봅니다.'
                    ]
                },
                {
                    id: 'buy-rent',
                    title: '구입과 대여',
                    pages: [24, 25],
                    summary: [
                        '일부 품목은 구입, 일부 품목은 대여 방식으로 이용합니다.',
                        '대여 품목은 사용 기간과 반납 조건을 확인합니다.',
                        '구입 품목은 내구연한과 재구입 가능 기준을 봅니다.'
                    ]
                },
                {
                    id: 'equipment-cost',
                    title: '복지용구 비용',
                    pages: [16, 17],
                    summary: [
                        '복지용구에도 본인부담금이 적용될 수 있습니다.',
                        '연간 한도 안에서 이용해야 합니다.',
                        '감경 대상 여부에 따라 부담금이 달라질 수 있습니다.'
                    ]
                }
            ]
        },
        {
            id: 'facility',
            no: '09',
            title: '시설급여',
            subtitle: '요양시설 이용',
            icon: 'hospital',
            color: 'slate',
            pages: [6, 7, 13, 14],
            topics: [
                {
                    id: 'facility-meaning',
                    title: '시설급여란?',
                    pages: [6, 7],
                    summary: [
                        '장기요양기관 시설에 입소해 돌봄을 받는 급여입니다.',
                        '집에서 생활하기 어려운 경우 시설 이용을 검토합니다.',
                        '시설급여 이용 가능 여부는 인정서와 급여 종류를 기준으로 봅니다.'
                    ]
                },
                {
                    id: 'facility-types',
                    title: '시설 종류',
                    pages: [7, 13],
                    summary: [
                        '노인요양시설과 노인요양공동생활가정 등으로 구분해 볼 수 있습니다.',
                        '시설 규모와 생활 방식이 다를 수 있습니다.',
                        '어르신 상태와 생활 선호도를 함께 고려합니다.'
                    ]
                },
                {
                    id: 'facility-cost',
                    title: '시설 이용 비용',
                    pages: [13, 14, 15],
                    summary: [
                        '시설급여는 보통 급여비용의 20%를 본인이 부담합니다.',
                        '식비, 상급침실료 등 비급여 항목이 따로 있을 수 있습니다.',
                        '감경 대상이면 본인부담금이 줄어들 수 있습니다.'
                    ]
                }
            ]
        },
        {
            id: 'copayment',
            no: '10',
            title: '본인부담금',
            subtitle: '급여비용과 감경',
            icon: 'wallet',
            color: 'plum',
            pages: [11, 12, 13, 14, 15, 16, 17, 18],
            topics: [
                {
                    id: 'rate',
                    title: '본인부담률',
                    pages: [11, 12, 13],
                    summary: [
                        '재가급여는 보통 급여비용의 15%를 본인이 부담합니다.',
                        '시설급여는 보통 급여비용의 20%를 본인이 부담합니다.',
                        '복지용구도 품목과 기준에 따라 본인부담금이 생길 수 있습니다.'
                    ]
                },
                {
                    id: 'reduction',
                    title: '감경 대상',
                    pages: [15, 18],
                    summary: [
                        '소득과 자격 기준에 따라 본인부담금이 줄어들 수 있습니다.',
                        '감경 여부는 개인별로 다르게 적용됩니다.',
                        '감경 대상이면 같은 서비스를 이용해도 납부 금액이 달라집니다.'
                    ]
                },
                {
                    id: 'payment',
                    title: '납부와 영수증',
                    pages: [12, 17],
                    summary: [
                        '서비스 이용 후 본인부담금을 납부합니다.',
                        '청구 금액이 계약 내용과 맞는지 봅니다.',
                        '영수증이나 이용 내역은 보관해 두는 것이 좋습니다.'
                    ]
                },
                {
                    id: 'non-covered',
                    title: '비급여 비용',
                    pages: [14, 15],
                    summary: [
                        '장기요양급여로 처리되지 않는 비용이 따로 있을 수 있습니다.',
                        '식비, 상급침실료 등은 별도 부담이 될 수 있습니다.',
                        '계약 전에 급여와 비급여를 나눠서 설명받습니다.'
                    ]
                }
            ]
        }
    ],

    legacySectionMap: {
        'procedure-overview': 'contract',
        intro: 'grade',
        'use-process': 'documents',
        cost: 'copayment',
        counseling: 'institution',
        'home-care': 'home-care',
        notice: 'documents',
        benefit: 'benefit-types',
        caregiver: 'home-care',
        appendix: 'copayment'
    },

    quickMenus: [
        { title: '인정서발급', href: '#category/documents', icon: 'file-text', tone: 'blue' },
        { title: '급여이용방법', href: '#category/benefit-types', icon: 'route', tone: 'green' },
        { title: '기관찾기', href: '#category/institution', icon: 'building-2', tone: 'purple' },
        { title: '본인부담금', href: '#category/copayment', icon: 'wallet', tone: 'yellow' }
    ],

    mainMenus: [
        {
            title: '장기요양 인정신청',
            subtitle: '신청부터 인정서 수령까지',
            href: '#guide/application',
            icon: 'file-plus-2',
            tone: 'blue'
        },
        {
            title: '등급판정 결과 확인',
            subtitle: '내 등급과 이용 가능 급여',
            href: '#guide/grade-result',
            icon: 'badge-check',
            tone: 'purple'
        },
        {
            title: '급여계약 전 확인사항',
            subtitle: '기관 선택과 계약 준비',
            href: '#category/contract',
            icon: 'signature',
            tone: 'yellow'
        },
        {
            title: '재가급여 이용방법',
            subtitle: '집에서 받는 돌봄 서비스',
            href: '#category/home-care',
            icon: 'home',
            tone: 'green'
        },
        {
            title: '시설급여 이용방법',
            subtitle: '요양시설 입소와 비용',
            href: '#category/facility',
            icon: 'hospital',
            tone: 'blue'
        },
        {
            title: '복지용구 이용방법',
            subtitle: '구입·대여 품목 안내',
            href: '#category/equipment',
            icon: 'accessibility',
            tone: 'green'
        },
        {
            title: '본인부담금 안내',
            subtitle: '급여비용과 감경 기준',
            href: '#category/copayment',
            icon: 'wallet',
            tone: 'purple'
        },
        {
            title: '자주 찾는 전체 안내',
            subtitle: '10개 큰 목차 한눈에 보기',
            href: '#contents',
            icon: 'circle-help',
            tone: 'yellow'
        }
    ],

    categoryDetails: {
        grade: {
            title: '장기요양등급',
            flowTitle: '등급 확인 순서',
            tableTitle: '등급 구분 한눈에 보기',
            checklistTitle: '인정서에서 확인할 것',
            faqTitle: '등급 확인 FAQ',
            newsCards: [
                {
                    title: '대상 확인',
                    headline: '65세 이상 또는 노인성 질병',
                    text: '6개월 이상 혼자 일상생활이 어렵다면 확인이 필요합니다.',
                    icon: 'search-check',
                    tone: 'news-blue'
                },
                {
                    title: '등급 구분',
                    headline: '1~5등급 및 인지지원등급',
                    text: '심신상태와 필요한 도움의 정도에 따라 판정됩니다.',
                    icon: 'badge-check',
                    tone: 'news-green'
                },
                {
                    title: '유효기간',
                    headline: '인정서의 종료 날짜 확인',
                    text: '계속 이용하려면 갱신 신청 기간을 놓치지 않아야 합니다.',
                    icon: 'calendar-check',
                    tone: 'news-orange'
                }
            ],
            steps: [
                { title: '대상 확인', text: '65세 이상 또는 노인성 질병 여부 확인', icon: 'user-check' },
                { title: '등급판정', text: '심신상태와 장기요양 필요 정도에 따라 등급 결정', icon: 'clipboard-check' },
                { title: '서류 수령', text: '인정서, 이용계획서, 복지용구 급여확인서 확인', icon: 'files' },
                { title: '급여 이용', text: '기관 선택 후 급여계약을 체결하고 이용', icon: 'handshake' }
            ],
            keyTable: [
                { label: '1등급', rows: [{ label: '원문 핵심', value: '전적으로 다른 사람의 도움이 필요한 자' }, { label: '점수', value: '95점 이상' }] },
                { label: '2등급', rows: [{ label: '원문 핵심', value: '상당 부분 다른 사람의 도움이 필요한 자' }, { label: '점수', value: '75점 이상 95점 미만' }] },
                { label: '3등급', rows: [{ label: '원문 핵심', value: '부분적으로 다른 사람의 도움이 필요한 자' }, { label: '점수', value: '60점 이상 75점 미만' }] },
                { label: '4등급', rows: [{ label: '원문 핵심', value: '일정 부분 다른 사람의 도움이 필요한 자' }, { label: '점수', value: '51점 이상 60점 미만' }] },
                { label: '5등급', rows: [{ label: '원문 핵심', value: '치매환자' }, { label: '점수', value: '45점 이상 51점 미만' }] },
                { label: '인지지원등급', rows: [{ label: '원문 핵심', value: '치매환자' }, { label: '점수', value: '45점 미만' }] }
            ],
            checklist: [
                { title: '장기요양인정서의 등급을 확인했나요?', text: '인정서에 표시된 등급을 먼저 봅니다.' },
                { title: '유효기간 시작일과 종료일을 확인했나요?', text: '급여를 이용할 수 있는 기간입니다.' },
                { title: '이용 가능한 급여 종류를 확인했나요?', text: '인정서와 이용계획서를 함께 봅니다.' }
            ],
            faqs: [
                { q: '장기요양등급은 무엇을 기준으로 나뉘나요?', a: '심신상태와 장기요양이 필요한 정도에 따라 1~5등급 및 인지지원등급으로 구분됩니다.' },
                { q: '인지지원등급도 장기요양등급인가요?', a: '책자에서는 1~5등급과 함께 인지지원등급을 장기요양등급 구분에 포함해 안내합니다.' },
                { q: '등급에 따라 이용 가능한 급여가 달라지나요?', a: '등급별로 이용 가능한 급여 종류가 다르게 안내되어 있으므로 인정서와 이용계획서를 확인해야 합니다.' }
            ],
            caution: '등급만 보고 서비스를 바로 정하기보다, 인정서와 개인별장기요양이용계획서의 급여 종류 및 내용을 함께 확인해야 합니다.',
            sourcePages: [4, 7, 28]
        },

        'benefit-types': {
            title: '장기요양급여 종류',
            flowTitle: '급여 종류 확인 순서',
            tableTitle: '급여 종류 비교',
            checklistTitle: '급여 선택 전 확인할 것',
            faqTitle: '급여 종류 FAQ',
            newsCards: [
                { title: '재가급여', headline: '집에서 받는 장기요양', text: '방문요양, 방문목욕, 방문간호, 주야간보호, 단기보호, 복지용구가 안내되어 있습니다.', icon: 'home', tone: 'news-blue' },
                { title: '시설급여', headline: '시설에 입소해 이용', text: '노인요양시설과 노인요양공동생활가정이 안내되어 있습니다.', icon: 'hospital', tone: 'news-green' },
                { title: '특별현금급여', headline: '가족요양비', text: '가족 등으로부터 방문요양에 상당한 돌봄을 받는 경우 안내됩니다.', icon: 'banknote', tone: 'news-orange' }
            ],
            steps: [
                { title: '인정서 확인', text: '이용 가능한 급여 종류 및 내용을 확인', icon: 'file-check' },
                { title: '급여 구분', text: '재가급여, 시설급여, 특별현금급여 중 확인', icon: 'layers' },
                { title: '중복 이용 확인', text: '재가급여와 시설급여는 중복 이용할 수 없음', icon: 'copy-x' },
                { title: '기관 상담', text: '이용하려는 급여에 맞는 기관과 상담', icon: 'messages-square' }
            ],
            keyTable: [
                { label: '재가급여', content: '집에 살면서 받을 수 있는 장기요양 서비스', check: '방문요양, 목욕, 간호, 주야간보호, 단기보호, 복지용구' },
                { label: '시설급여', content: '시설에 입소해 돌봄을 받는 급여', check: '노인요양시설, 노인요양공동생활가정' },
                { label: '특별현금급여', content: '가족 등으로부터 돌봄을 받는 경우의 현금 급여', check: '가족요양비 지급신청서 제출' }
            ],
            checklist: [
                { title: '인정서의 급여 종류 및 내용을 확인했나요?', text: '' },
                { title: '재가급여와 시설급여를 중복 이용하지 않는지 확인했나요?', text: '' },
                { title: '복지용구 이용 가능 여부를 급여확인서로 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '재가급여와 시설급여를 같이 이용할 수 있나요?', a: '재가급여와 시설급여는 중복하여 이용할 수 없습니다.' },
                { q: '복지용구는 어떤 급여인가요?', a: '책자에서는 복지용구를 기타재가급여로 안내하고 있습니다.' },
                { q: '가족요양비 대상자도 복지용구를 이용할 수 있나요?', a: '특별현금급여 지급 대상자는 재가급여 중 복지용구를 추가 이용할 수 있다고 안내되어 있습니다.' }
            ],
            caution: '이용 가능한 급여는 장기요양인정서와 개인별장기요양이용계획서의 내용을 기준으로 확인합니다.',
            sourcePages: [5, 6, 7]
        },

        'eligible-benefits': {
            title: '등급별 이용 가능 급여',
            flowTitle: '내 등급으로 확인하는 순서',
            tableTitle: '등급별 급여 안내',
            checklistTitle: '급여 이용 전 확인',
            faqTitle: '등급별 급여 FAQ',
            newsCards: [
                { title: '1~2등급', headline: '재가급여 또는 시설급여', text: '인정서와 이용계획서에 따라 이용 급여를 확인합니다.', icon: 'badge-check', tone: 'news-blue' },
                { title: '3~5등급', headline: '재가급여 중심 확인', text: '시설급여가 필요한 경우 변경신청 안내를 확인합니다.', icon: 'home', tone: 'news-green' },
                { title: '인지지원등급', headline: '주야간보호 확인', text: '인지지원등급은 주야간보호로 안내되어 있습니다.', icon: 'brain', tone: 'news-orange' }
            ],
            steps: [
                { title: '등급 확인', text: '장기요양인정서의 등급 확인', icon: 'badge-check' },
                { title: '급여 종류 확인', text: '인정서의 급여 종류 및 내용 확인', icon: 'file-text' },
                { title: '이용 가능 급여 확인', text: '등급별 이용 가능한 급여와 대조', icon: 'list-checks' },
                { title: '변경 필요 확인', text: '시설급여 필요 시 급여종류·내용변경신청 확인', icon: 'refresh-cw' }
            ],
            keyTable: [
                { label: '1등급', content: '재가급여 또는 시설급여', check: '인정서와 이용계획서 확인' },
                { label: '2등급', content: '재가급여 또는 시설급여', check: '인정서와 이용계획서 확인' },
                { label: '3~5등급', content: '재가급여', check: '시설급여 필요 시 변경신청 확인' },
                { label: '인지지원등급', content: '주야간보호', check: '인지지원등급 이용 가능 급여 확인' }
            ],
            checklist: [
                { title: '인정서의 등급을 확인했나요?', text: '' },
                { title: '인정서에 적힌 급여 종류 및 내용을 확인했나요?', text: '' },
                { title: '시설급여가 필요한 경우 변경신청 대상인지 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '1~2등급은 어떤 급여를 이용할 수 있나요?', a: '책자에서는 1~2등급을 재가급여 또는 시설급여 이용 가능 등급으로 안내합니다.' },
                { q: '3~5등급은 시설급여를 바로 이용할 수 있나요?', a: '3~5등급은 재가급여로 안내되며, 시설급여가 필요한 경우 급여종류·내용변경신청 후 인정받아야 합니다.' },
                { q: '인지지원등급은 어떤 급여를 확인해야 하나요?', a: '책자에서는 인지지원등급의 이용 가능 급여로 주야간보호를 안내합니다.' }
            ],
            caution: '등급별 표는 기본 안내이며, 실제 이용은 인정서와 개인별장기요양이용계획서에 적힌 내용을 기준으로 확인합니다.',
            sourcePages: [7, 28]
        },

        documents: {
            title: '서류 수령 방법',
            flowTitle: '서류 확인 순서',
            tableTitle: '필수 서류 3종',
            checklistTitle: '서류를 받으면 확인할 것',
            faqTitle: '서류 수령 FAQ',
            newsCards: [
                { title: '인정서', headline: '등급과 유효기간 확인', text: '장기요양급여를 이용할 수 있는 기본 서류입니다.', icon: 'file-badge', tone: 'news-blue' },
                { title: '이용계획서', headline: '맞춤형 급여 이용 계획', text: '어르신 상태와 욕구를 고려한 이용계획서입니다.', icon: 'clipboard-list', tone: 'news-green' },
                { title: '복지용구 확인서', headline: '사용 가능 품목 확인', text: '복지용구 이용 시 꼭 확인해야 하는 서류입니다.', icon: 'accessibility', tone: 'news-orange' }
            ],
            steps: [
                { title: '결과 확인', text: '등급판정 결과와 장기요양등급 확인', icon: 'search-check' },
                { title: '서류 수령', text: '인정서, 이용계획서, 복지용구 급여확인서 확인', icon: 'files' },
                { title: '급여 확인', text: '인정서와 이용계획서의 급여 종류 및 내용 확인', icon: 'list-checks' },
                { title: '기관 선택 준비', text: '이용 가능 기관 현황과 상담 안내 확인', icon: 'building-2' }
            ],
            keyTable: [
                { label: '장기요양인정서', content: '등급, 유효기간, 급여 종류 및 내용 확인', check: '가장 먼저 확인할 기본 서류' },
                { label: '개인별장기요양이용계획서', content: '필요한 급여, 이용 계획, 비용 확인', check: '기관과 계약할 때 제시' },
                { label: '복지용구 급여확인서', content: '사용 가능한 복지용구와 연 한도액 적용기간 확인', check: '복지용구 이용 시 확인' }
            ],
            checklist: [
                { title: '필수 서류 3종을 모두 받았나요?', text: '' },
                { title: '인정서에 적힌 등급과 유효기간을 확인했나요?', text: '' },
                { title: '이용계획서의 급여 종류와 내용을 확인했나요?', text: '' },
                { title: '복지용구 이용 시 사용 가능 품목을 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '등급판정 후 어떤 서류를 받나요?', a: '장기요양인정서, 개인별장기요양이용계획서, 복지용구 급여확인서를 받습니다.' },
                { q: '서류를 다시 출력할 수 있나요?', a: '노인장기요양보험 홈페이지, 건강보험공단 모바일 앱, 정부24에서 재발급할 수 있습니다.' },
                { q: '유효기간은 어디서 보나요?', a: '장기요양인정서에 적힌 유효기간을 확인합니다.' }
            ],
            caution: '필수 서류 원본은 수급자 또는 보호자가 보관해야 합니다.',
            sourcePages: [8, 9]
        },

        institution: {
            title: '장기요양기관 선택',
            flowTitle: '기관 선택 순서',
            tableTitle: '기관 선택 핵심',
            checklistTitle: '상담 전 확인할 것',
            faqTitle: '기관 선택 FAQ',
            sectionOrder: ['news', 'flow', 'comparison', 'checklist', 'faq', 'caution', 'source'],
            newsCards: [
                { title: '기관 찾기', headline: '홈페이지에서 기관 정보 확인', text: '노인장기요양보험 홈페이지에서 기관 정보를 조회할 수 있습니다.', icon: 'search', tone: 'news-blue' },
                { title: '평가결과', headline: '기관 평가등급 확인', text: '기관 평가결과와 기관 현황을 함께 확인합니다.', icon: 'star', tone: 'news-green' },
                { title: '계약 전 상담', headline: '급여내용과 비용 상담', text: '계약 전 급여내용과 비용 설명을 받아야 합니다.', icon: 'messages-square', tone: 'news-orange' }
            ],
            steps: [
                { title: '기관 찾기', text: '홈페이지 또는 모바일 앱에서 기관 정보 확인', icon: 'search' },
                { title: '평가결과 확인', text: '기관 평가등급과 기관 현황 확인', icon: 'badge-check' },
                { title: '상담 받기', text: '급여내용과 비용 상담', icon: 'message-circle' },
                { title: '계약 전 확인', text: '계약서, 이용계획서, 비급여 항목 확인', icon: 'clipboard-check' }
            ],
            keyTable: [
                { label: '기관 정보', content: '이용하려는 급여 종류에 맞는 기관 확인', check: '급여종류, 기관명, 이용 가능 여부' },
                { label: '평가결과', content: '서비스 질 확인을 위한 참고자료', check: '평가등급과 기관 현황' },
                { label: '시설급여', content: '시설 환경을 직접 방문해 확인', check: '입소 전 시설 환경 확인' }
            ],
            checklist: [
                { title: '이용하려는 급여 종류에 맞는 기관인가요?', text: '' },
                { title: '기관 정보와 평가결과를 확인했나요?', text: '' },
                { title: '급여내용과 비용 상담을 받았나요?', text: '' },
                { title: '시설급여라면 시설 환경을 방문해 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '장기요양기관은 어디서 찾을 수 있나요?', a: '노인장기요양보험 홈페이지의 장기요양기관 찾기에서 전국 장기요양기관 정보를 조회할 수 있습니다.' },
                { q: '기관 평가결과도 볼 수 있나요?', a: '기관 평가결과는 홈페이지와 장기요양기관 현황에서 확인할 수 있습니다.' },
                { q: '계약 전 무엇을 상담해야 하나요?', a: '급여내용과 비용을 상담하고, 시설급여는 시설 환경을 방문해 확인합니다.' }
            ],
            caution: '장기요양기관을 선택할 때는 평가결과, 급여내용, 비용, 계약 조건을 함께 확인합니다.',
            sourcePages: [10, 31]
        },

        contract: {
            title: '급여계약 절차',
            flowTitle: '계약부터 이용까지',
            tableTitle: '계약 전후 확인사항',
            checklistTitle: '서명 전 확인할 것',
            faqTitle: '급여계약 FAQ',
            newsCards: [
                { title: '필수 서류', headline: '인정서 등 서류 준비', text: '계약 전 필수 서류를 기관에 제시합니다.', icon: 'files', tone: 'news-blue' },
                { title: '계약서', headline: '2부 작성 후 각각 보관', text: '수급자와 기관이 계약서를 각각 1부씩 보관합니다.', icon: 'signature', tone: 'news-green' },
                { title: '이용 기록', headline: '급여제공기록지 확인', text: '서비스 이용 후 제공기록지를 받아 이용 내용을 확인합니다.', icon: 'clipboard-list', tone: 'news-orange' }
            ],
            steps: [
                { title: '필수 서류 준비', text: '인정서, 이용계획서, 복지용구 급여확인서 등 준비', icon: 'files' },
                { title: '상담 및 계약', text: '급여내용, 이용 시간, 비용 확인', icon: 'messages-square' },
                { title: '계약서 보관', text: '계약서 2부 작성 후 수급자와 기관이 각각 보관', icon: 'archive' },
                { title: '계획 확인', text: '급여제공계획서를 확인하고 동의', icon: 'clipboard-check' },
                { title: '기록 확인', text: '급여제공기록지를 받아 이용 내용 확인', icon: 'list-checks' }
            ],
            keyTable: [
                { label: '계약서', content: '계약기간, 급여 종류와 내용, 비급여대상 확인', check: '서명 전 꼼꼼히 확인' },
                { label: '이용계획서', content: '개인별장기요양이용계획서 내용 확인', check: '급여 종류, 횟수, 제공 내용' },
                { label: '계약 종료', content: '중단 또는 종료 시 기관에 계약 해지 통보', check: '이용 중단 전 기관에 알림' }
            ],
            checklist: [
                { title: '계약서의 계약기간을 확인했나요?', text: '' },
                { title: '급여 종류와 제공 내용을 확인했나요?', text: '' },
                { title: '본인부담금과 비급여 항목을 확인했나요?', text: '' },
                { title: '계약서 1부를 보호자가 보관하고 있나요?', text: '' },
                { title: '급여제공계획서에 동의한 뒤 이용하고 있나요?', text: '' }
            ],
            faqs: [
                { q: '계약서에는 무엇을 확인해야 하나요?', a: '계약기간, 급여 종류와 내용, 비급여대상 항목을 확인합니다.' },
                { q: '계약서는 누가 보관하나요?', a: '계약서는 2부 작성해 수급자와 장기요양기관이 각각 1부씩 보관합니다.' },
                { q: '내가 받은 서비스 기록을 볼 수 있나요?', a: '기관은 장기요양급여 제공기록지를 수급자에게 제공해야 합니다.' }
            ],
            caution: '계약 전에는 급여내용, 이용 시간, 비용, 비급여 항목을 충분히 확인한 뒤 서명합니다.',
            sourcePages: [10, 33, 34]
        },

        'home-care': {
            title: '재가급여',
            flowTitle: '재가급여 이용 순서',
            checklistTitle: '재가급여 이용 전 확인',
            faqTitle: '재가급여 FAQ',
            sectionOrder: ['visuals', 'flow', 'checklist', 'faq', 'caution', 'source'],
            newsCards: [
                { title: '집에서 이용', headline: '집에 살면서 받는 장기요양', text: '어르신이 가정에서 생활하면서 필요한 도움을 받습니다.', icon: 'home', tone: 'news-blue' },
                { title: '월 한도액', headline: '한도 초과분은 전액 본인 부담', text: '월 한도액 안에서 급여를 이용하는지 확인합니다.', icon: 'wallet', tone: 'news-green' },
                { title: '서비스 기록', headline: '급여제공기록지 확인', text: '이용 후 기관이 제공하는 기록지를 확인합니다.', icon: 'clipboard-list', tone: 'news-orange' }
            ],
            visualBlocks: [
                {
                    type: 'gallery',
                    title: '그림으로 보는 재가급여',
                    icon: 'images',
                    iconTone: 'green',
                    items: [
                        {
                            badge: '방문요양',
                            title: '집에서 일상생활 도움',
                            text: '요양보호사가 가정을 방문해 식사, 이동, 위생관리 등을 돕습니다.',
                            image: 'assets/guide-media/visit-care.jpeg',
                            alt: '방문요양 일러스트'
                        },
                        {
                            badge: '방문목욕',
                            title: '목욕이 어려울 때',
                            text: '목욕 설비를 이용해 전신목욕을 돕는 급여입니다.',
                            image: 'assets/guide-media/visit-bath.jpeg',
                            alt: '방문목욕 일러스트'
                        },
                        {
                            badge: '방문간호',
                            title: '간호와 건강관리',
                            text: '방문간호지시서에 따라 간호사 등이 가정을 방문합니다.',
                            image: 'assets/guide-media/visit-nursing.jpeg',
                            alt: '방문간호 일러스트'
                        },
                        {
                            badge: '주야간보호',
                            title: '기관에서 일정 시간 돌봄',
                            text: '기관에서 신체활동, 사회활동, 인지훈련 등을 지원합니다.',
                            image: 'assets/guide-media/day-care.jpeg',
                            alt: '주야간보호 일러스트'
                        },
                        {
                            badge: '단기보호',
                            title: '잠시 시설에서 돌봄',
                            text: '보호자가 일시적으로 돌보기 어려울 때 단기간 보호시설을 이용합니다.',
                            image: 'assets/guide-media/short-stay-care.png',
                            alt: '단기보호 일러스트'
                        },
                        {
                            badge: '복지용구',
                            title: '생활에 필요한 용구',
                            text: '일상생활과 신체활동 지원에 필요한 복지용구를 이용합니다.',
                            image: 'assets/guide-media/welfare-equipment.jpeg',
                            alt: '복지용구 일러스트'
                        }
                    ]
                }
            ],
            steps: [
                { title: '급여 종류 확인', text: '방문요양, 목욕, 간호, 주야간보호, 단기보호, 복지용구 확인', icon: 'layers' },
                { title: '기관 상담', text: '어르신 상태와 필요한 서비스를 상담', icon: 'messages-square' },
                { title: '급여계약', text: '계약서와 급여제공계획서 확인', icon: 'signature' },
                { title: '서비스 이용', text: '계약한 일정과 내용에 따라 이용', icon: 'hand-heart' },
                { title: '기록 확인', text: '급여제공기록지를 받아 이용 내용 확인', icon: 'clipboard-check' }
            ],
            checklist: [
                { title: '이용하려는 재가급여 종류를 확인했나요?', text: '' },
                { title: '월 한도액 안에서 이용하는지 확인했나요?', text: '' },
                { title: '기관과 급여제공계획서를 확인했나요?', text: '' },
                { title: '급여제공기록지를 받아 이용 내용을 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '월 한도액을 넘으면 어떻게 되나요?', a: '월 한도액을 초과하여 이용한 금액은 전액 본인이 부담합니다.' },
                { q: '방문간호는 어떻게 이용하나요?', a: '방문간호지시서에 따라 방문간호기관과 계약한 뒤 이용합니다.' },
                { q: '단기보호는 언제 이용하나요?', a: '가족 보호자가 병원 입원, 집안 경조사 등으로 일시적으로 돌볼 수 없을 때 이용할 수 있습니다.' }
            ],
            caution: '급여 종류별 비용과 이용 기준은 책자 원문의 급여비용 표를 함께 확인합니다.',
            sourcePages: [5, 11, 15, 21, 22]
        },

        equipment: {
            title: '복지용구',
            flowTitle: '복지용구 이용 순서',
            tableTitle: '구입·대여 방식',
            checklistTitle: '복지용구 이용 전 확인',
            faqTitle: '복지용구 FAQ',
            sectionOrder: ['visuals', 'flow', 'comparison', 'checklist', 'faq', 'caution', 'source'],
            newsCards: [
                { title: '품목 확인', headline: '급여확인서 먼저 보기', text: '사용 가능한 복지용구 품목을 확인합니다.', icon: 'clipboard-check', tone: 'news-blue' },
                { title: '연 한도액', headline: '1인당 연간 160만원', text: '연 한도액을 초과한 금액은 전액 본인이 부담합니다.', icon: 'wallet-cards', tone: 'news-green' },
                { title: '구입·대여', headline: '품목별 방식이 다릅니다', text: '구입 품목, 대여 품목, 구입 또는 대여 품목을 구분합니다.', icon: 'accessibility', tone: 'news-orange' }
            ],
            visualBlocks: [
                {
                    type: 'diagram',
                    title: '대표 복지용구 이미지',
                    icon: 'accessibility',
                    iconTone: 'green',
                    image: 'assets/guide-media/welfare-equipment.jpeg',
                    alt: '복지용구 대표 품목 일러스트',
                    caption: '품목별 이용 가능 여부는 복지용구 급여확인서를 기준으로 확인합니다.',
                    points: [
                        { title: '먼저 볼 서류', text: '복지용구 급여확인서의 사용 가능 품목을 확인합니다.' },
                        { title: '이용 방식', text: '품목에 따라 구입, 대여, 구입 또는 대여로 나뉩니다.' }
                    ]
                }
            ],
            steps: [
                { title: '품목 확인', text: '복지용구 급여확인서의 사용 가능 품목 확인', icon: 'clipboard-check' },
                { title: '사업소 선택', text: '복지용구사업소 선택', icon: 'store' },
                { title: '계약', text: '인정서, 이용계획서, 급여확인서를 제시하고 계약', icon: 'signature' },
                { title: '이용', text: '구입 또는 대여 방식으로 이용', icon: 'package-check' }
            ],
            keyTable: [
                { label: '구입 품목', content: '이동변기, 목욕의자, 성인용보행기, 안전손잡이 등', check: '품목별 사용 가능 횟수와 급여한도 확인' },
                { label: '대여 품목', content: '수동휠체어, 전동침대, 수동침대, 이동욕조 등', check: '품목별 사용 가능 기간 확인' },
                { label: '구입 또는 대여', content: '욕창예방매트리스, 경사로, 대화형 정서지원기기 등', check: '품목별 이용 가능 방식 확인' },
                { label: '배회감지기', content: '길을 잃거나 배회성향이 있는 경우 위치 확인 등에 사용하는 품목', check: 'GPS형, 매트형, 태그형 안내' }
            ],
            checklist: [
                { title: '복지용구 급여확인서에서 사용 가능 품목을 확인했나요?', text: '' },
                { title: '연 한도액 적용기간을 확인했나요?', text: '' },
                { title: '구입인지 대여인지 확인했나요?', text: '' },
                { title: '이미 사용 중인 품목과 중복되지 않는지 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '복지용구를 이용하려면 어떤 서류가 필요한가요?', a: '장기요양인정서, 개인별장기요양이용계획서, 복지용구 급여확인서가 필요합니다.' },
                { q: '복지용구 연 한도액은 얼마인가요?', a: '1인당 연간 160만원입니다.' },
                { q: '시설급여를 이용 중이어도 복지용구를 이용할 수 있나요?', a: '시설급여를 이용하는 경우 복지용구를 이용할 수 없습니다.' }
            ],
            caution: '복지용구는 수급자의 신체기능 상태에 따라 사용 가능한 품목이 달라지므로 급여확인서를 기준으로 봅니다.',
            sourcePages: [9, 15, 23, 24, 25]
        },

        facility: {
            title: '시설급여',
            flowTitle: '시설급여 확인 순서',
            tableTitle: '시설 종류 비교',
            checklistTitle: '입소 전 확인할 것',
            faqTitle: '시설급여 FAQ',
            sectionOrder: ['visuals', 'flow', 'comparison', 'checklist', 'faq', 'caution', 'source'],
            newsCards: [
                { title: '시설 입소', headline: '시설에 입소해 돌봄 이용', text: '노인요양시설 또는 노인요양공동생활가정에 입소합니다.', icon: 'hospital', tone: 'news-blue' },
                { title: '비용 확인', headline: '본인부담금과 비급여 확인', text: '급여비용과 비급여 항목을 나누어 확인합니다.', icon: 'wallet', tone: 'news-green' },
                { title: '계약의사', headline: '입소 수급자 건강상태 확인', text: '시설 입소 수급자는 계약의사 진찰을 받을 수 있습니다.', icon: 'stethoscope', tone: 'news-orange' }
            ],
            visualBlocks: [
                {
                    type: 'gallery',
                    title: '시설 이용 전 떠올릴 장면',
                    icon: 'hospital',
                    iconTone: 'blue',
                    items: [
                        {
                            badge: '시설 방문',
                            title: '입소 전 환경 확인',
                            text: '시설급여는 계약 전 시설 환경을 직접 방문해 확인합니다.',
                            image: 'assets/guide-media/facility-care.jpeg',
                            alt: '시설 방문 상담 일러스트'
                        },
                        {
                            badge: '계약 확인',
                            title: '비용과 비급여 확인',
                            text: '급여비용, 본인부담금, 비급여 항목을 나누어 확인합니다.',
                            image: 'assets/book-pages/page-17.jpg',
                            alt: '시설급여 비용 원문 페이지'
                        }
                    ]
                }
            ],
            steps: [
                { title: '이용 가능 확인', text: '인정서의 시설급여 이용 가능 여부 확인', icon: 'file-check' },
                { title: '기관 찾기', text: '노인요양시설 또는 노인요양공동생활가정 확인', icon: 'building-2' },
                { title: '방문 확인', text: '시설 환경을 직접 방문해 확인', icon: 'map-pin-check' },
                { title: '계약 확인', text: '비용, 비급여 항목, 계약 내용을 확인', icon: 'signature' }
            ],
            keyTable: [
                { label: '노인요양시설', content: '입소정원 10명 이상', check: '급식, 요양, 일상생활 편의 제공' },
                { label: '노인요양공동생활가정', content: '입소정원 5~9명', check: '가정과 같은 주거여건에서 급식, 요양, 편의 제공' },
                { label: '계약의사 제도', content: '입소 수급자의 건강상태를 정기적으로 확인', check: '진찰비용 중 본인부담금 해당 금액 납부' }
            ],
            checklist: [
                { title: '인정서에 시설급여 이용 가능 여부를 확인했나요?', text: '' },
                { title: '시설을 방문해 환경을 확인했나요?', text: '' },
                { title: '계약 전 비용과 비급여 항목을 확인했나요?', text: '' },
                { title: '입소 후 급여제공기록지를 확인하고 있나요?', text: '' }
            ],
            faqs: [
                { q: '시설급여에는 어떤 기관이 있나요?', a: '노인요양시설과 노인요양공동생활가정이 안내되어 있습니다.' },
                { q: '시설급여 이용 중 입원하거나 외박하면 비용은 어떻게 되나요?', a: '의료기관 입원 또는 외박 시 급여비용의 50%가 적용되며, 적용 가능한 기간 기준이 있습니다.' },
                { q: '4~5등급도 시설급여 비용을 확인해야 하나요?', a: '책자에서는 장기요양 4~5등급 수급자가 시설급여를 이용하는 경우 3등급 급여비용을 적용한다고 안내합니다.' }
            ],
            caution: '시설급여는 급여비용 외에 식사재료비, 이미용비, 상급침실 이용 추가비용 등 비급여 항목이 있을 수 있습니다.',
            sourcePages: [6, 16, 17, 18, 32]
        },

        copayment: {
            title: '본인부담금',
            flowTitle: '비용 확인 순서',
            tableTitle: '본인부담률 비교',
            checklistTitle: '계약 전 비용 확인',
            faqTitle: '본인부담금 FAQ',
            newsCards: [
                { title: '재가급여', headline: '일반대상자 15%', text: '재가급여는 총 급여비용 일부를 본인이 부담합니다.', icon: 'home', tone: 'news-blue' },
                { title: '시설급여', headline: '일반대상자 20%', text: '시설급여는 재가급여와 본인부담률이 다릅니다.', icon: 'hospital', tone: 'news-green' },
                { title: '비급여', headline: '전액 본인 부담', text: '식사재료비, 이미용비 등은 별도 부담이 될 수 있습니다.', icon: 'receipt-text', tone: 'news-orange' }
            ],
            steps: [
                { title: '급여 종류 확인', text: '재가급여, 시설급여, 복지용구 중 확인', icon: 'layers' },
                { title: '부담률 확인', text: '일반대상자와 감경대상자 부담률 확인', icon: 'percent' },
                { title: '비급여 확인', text: '식사재료비, 이미용비 등 별도 비용 확인', icon: 'receipt' },
                { title: '계약 전 설명', text: '기관에서 비용 설명을 듣고 계약', icon: 'messages-square' }
            ],
            keyTable: [
                { label: '재가급여', rows: [{ label: '일반대상자', value: '15%' }, { label: '40% 감경대상자', value: '9%' }, { label: '60% 감경대상자 또는 기타 의료급여 수급권자', value: '6%' }, { label: '의료급여 수급자', value: '면제' }] },
                { label: '시설급여', rows: [{ label: '일반대상자', value: '20%' }, { label: '40% 감경대상자', value: '12%' }, { label: '60% 감경대상자 또는 기타 의료급여 수급권자', value: '8%' }, { label: '의료급여 수급자', value: '면제' }] },
                { label: '복지용구', rows: [{ label: '일반대상자', value: '15%' }, { label: '40% 감경대상자', value: '9%' }, { label: '60% 감경대상자 또는 기타 의료급여 수급권자', value: '6%' }, { label: '의료급여 수급자', value: '면제' }] },
                { label: '비급여', content: '식사재료비, 이미용비, 상급침실 이용 추가비용 등', check: '장기요양급여로 처리되지 않는 비용은 전액 본인 부담' }
            ],
            checklist: [
                { title: '이용하려는 급여의 본인부담률을 확인했나요?', text: '' },
                { title: '감경대상 여부를 확인했나요?', text: '' },
                { title: '비급여 항목을 따로 설명받았나요?', text: '' },
                { title: '월 한도액을 초과하지 않는지 확인했나요?', text: '' }
            ],
            faqs: [
                { q: '재가급여와 시설급여의 본인부담률은 다른가요?', a: '재가급여는 15%, 시설급여는 20%입니다.' },
                { q: '비급여 항목은 무엇인가요?', a: '식사재료비, 이미용비, 상급침실 이용 추가비용 등이 안내되어 있습니다.' },
                { q: '본인부담금을 할인받을 수 있나요?', a: '책자에서는 기관의 본인부담금 면제 또는 할인이 위법이라고 안내하고 있습니다.' }
            ],
            caution: '야간, 일요일, 공휴일, 근로자의 날 이용 시 가산비용이 적용될 수 있어 본인부담금이 늘어날 수 있습니다.',
            sourcePages: [11, 12, 13, 14, 15, 16, 17, 18]
        }
    },

    applicationGuide: {
        id: 'application',
        title: '장기요양 인정신청',
        description: '신청 대상 확인부터 신청 방법, 결과 확인까지의 전 과정을 안내합니다.',
        badge: '신청',
        color: 'blue',
        flowTitle: '신청부터 결과통보까지',
        checklistTitle: '신청 전에 확인할 것',
        faqTitle: '신청할 때 많이 묻는 질문',
        menu: {
            title: '장기요양 인정신청',
            subtitle: '신청부터 결과통보까지 쉽게 보기',
            href: '#guide/application',
            icon: 'file-plus-2',
            tone: 'blue'
        },
        newsCards: [
            {
                title: '대상 확인하기',
                headline: '우리 부모님도 신청될까?',
                text: '65세 이상 또는 노인성 질병이 있는 분',
                icon: 'search',
                tone: 'news-blue',
                source: 'PDF 4, 5쪽'
            },
            {
                title: '간편 결과 조회',
                headline: '등급 결과, 앱으로 확인!',
                text: '건강보험25시 앱에서 즉시 조회 가능',
                icon: 'smartphone',
                tone: 'news-green',
                source: 'PDF 8쪽'
            },
            {
                title: '갱신 신청 안내',
                headline: '갱신 기간을 놓치지 마세요',
                text: '유효기간 종료 90일 전부터 30일 전까지 신청',
                icon: 'calendar-check',
                tone: 'news-orange',
                source: 'PDF 28쪽'
            }
        ],
        steps: [
            {
                title: '인정신청',
                text: '공단 방문, 우편, 팩스, 인터넷 접수',
                icon: 'file-input',
                source: ''
            },
            {
                title: '등급판정',
                text: '등급판정위원회에서 심사 및 결정',
                icon: 'users',
                source: ''
            },
            {
                title: '결과통보',
                text: '필수 서류 3종 및 기관 현황 제공',
                icon: 'mail',
                source: ''
            },
            {
                title: '급여이용',
                text: '요양기관 선택 및 서비스 계약 체결',
                icon: 'hand-heart',
                source: ''
            }
        ],
        keyTable: [
            {
                label: '인정신청',
                content: '장기요양보험 혜택을 위한 첫 단계',
                check: '65세 이상 또는 노인성 질병 여부',
                pages: '4, 5'
            },
            {
                label: '등급판정',
                content: '어르신 상태에 따른 등급 결정',
                check: '1~5등급 및 인지지원등급 구분',
                pages: '6'
            },
            {
                label: '결과확인',
                content: '판정 결과 조회 및 서류 발급',
                check: '홈페이지, 앱(건강보험25시), 정부24',
                pages: '8'
            },
            {
                label: '유효기간',
                content: '급여를 이용할 수 있는 기간',
                check: '인정서에 명시된 종료 날짜 확인',
                pages: '28'
            }
        ],
        checklist: [
            {
                title: '어르신이 6개월 이상 혼자 일상생활이 어려운 상태인가요?',
                text: '',
                source: ''
            },
            {
                title: '65세 미만이라면 노인성 질병에 해당하는지 확인했나요?',
                text: '',
                source: ''
            },
            {
                title: '공단에서 보낸 인정서 등 필수 서류 3종을 모두 받으셨나요?',
                text: '',
                source: ''
            },
            {
                title: '계속 이용 시 갱신 신청 기간을 확인했나요?',
                text: '',
                source: ''
            }
        ],
        faqs: [
            {
                q: '등급 판정 결과는 어디서 확인할 수 있나요?',
                a: '홈페이지, 모바일 앱(건강보험25시), 또는 정부24 홈페이지 및 앱에서 직접 조회하고 출력할 수 있습니다.'
            },
            {
                q: '갱신 신청은 어떻게 하나요?',
                a: '유효기간이 끝나기 90일 전부터 30일 전까지 갱신신청을 해야 하며, 갱신신청 절차는 인정신청 절차와 같습니다.'
            },
            {
                q: '등급 판정 후 어르신 상태가 나빠지면 어떡하죠?',
                a: "유효기간 내라도 상태가 변하여 다른 등급을 받고자 할 때는 '등급변경신청'을 할 수 있습니다."
            }
        ],
        caution: '본 콘텐츠는 현재 폴더에 있는 장기요양급여 이용 안내 PDF 원문을 기준으로 요약·정리한 안내입니다.',
        sourceRefs: ['PDF 4쪽', 'PDF 5쪽', 'PDF 6쪽', 'PDF 8쪽', 'PDF 28쪽'],
        sourcePages: [4, 5, 6, 8, 28]
    },

    gradeResultGuide: {
        id: 'grade-result',
        title: '등급판정 결과 확인',
        description: '장기요양 등급 구분과 판정 결과 확인, 서류 수령 내용을 안내합니다.',
        badge: '등급',
        color: 'violet',
        flowTitle: '결과 확인 순서',
        checklistTitle: '결과통보 후 확인할 것',
        faqTitle: '결과 확인 때 많이 묻는 질문',
        sectionOrder: ['flow', 'comparison', 'news', 'checklist', 'faq', 'caution', 'source'],
        menu: {
            title: '등급판정 결과 확인',
            subtitle: '등급, 서류, 결과조회 확인',
            href: '#guide/grade-result',
            icon: 'badge-check',
            tone: 'purple'
        },
        newsCards: [
            {
                title: '결과 조회',
                headline: '홈페이지·앱·정부24에서 확인',
                text: '판정 결과를 직접 조회하고 출력할 수 있습니다.',
                icon: 'smartphone',
                tone: 'news-blue',
                source: 'PDF 8쪽'
            },
            {
                title: '서류 수령',
                headline: '인정서 등 3종 확인',
                text: '인정서, 개인별장기요양이용계획서, 복지용구 급여확인서를 확인하세요.',
                icon: 'files',
                tone: 'news-green',
                source: 'PDF 8쪽'
            },
            {
                title: '등급 구분',
                headline: '1~5등급 및 인지지원등급',
                text: '심신상태와 장기요양이 필요한 정도에 따라 판정됩니다.',
                icon: 'badge-check',
                tone: 'news-orange',
                source: 'PDF 6쪽'
            }
        ],
        steps: [
            {
                title: '결과조회',
                text: '홈페이지, 건강보험25시, 정부24에서 조회 및 출력',
                icon: 'search-check',
                source: 'PDF 8쪽'
            },
            {
                title: '서류수령',
                text: '필수 서류 3종 및 기관 현황 제공',
                icon: 'mail',
                source: 'PDF 8쪽'
            },
            {
                title: '등급확인',
                text: '1~5등급 및 인지지원등급 구분',
                icon: 'badge-check',
                source: 'PDF 6쪽'
            },
            {
                title: '유효기간 확인',
                text: '인정서에 명시된 종료 날짜 확인',
                icon: 'calendar-check',
                source: 'PDF 28쪽'
            }
        ],
        keyTable: [
            {
                label: '결과확인',
                content: '판정 결과 조회 및 서류 발급',
                check: '홈페이지, 앱(건강보험25시), 정부24',
                pages: '8'
            },
            {
                label: '서류수령',
                content: '인정서, 개인별장기요양이용계획서, 복지용구 급여확인서',
                check: '필수 서류 3종 확인',
                pages: '8'
            },
            {
                label: '등급구분',
                content: '어르신 상태에 따른 등급 결정',
                check: '1~5등급 및 인지지원등급 구분',
                pages: '6'
            },
            {
                label: '유효기간',
                content: '급여를 이용할 수 있는 기간',
                check: '인정서에 명시된 종료 날짜 확인',
                pages: '28'
            }
        ],
        checklist: [
            {
                title: '판정 결과를 홈페이지, 건강보험25시, 정부24에서 확인했나요?',
                text: '',
                source: 'PDF 8쪽'
            },
            {
                title: '인정서 등 필수 서류 3종을 모두 받으셨나요?',
                text: '',
                source: 'PDF 8쪽'
            },
            {
                title: '인정서에 적힌 등급과 유효기간을 확인했나요?',
                text: '',
                source: 'PDF 28쪽'
            },
            {
                title: '상태가 변한 경우 등급변경신청이 필요한지 확인했나요?',
                text: '',
                source: 'PDF 28쪽'
            }
        ],
        faqs: [
            {
                q: '등급 판정 결과는 어디서 확인할 수 있나요?',
                a: '홈페이지, 모바일 앱(건강보험25시), 또는 정부24 홈페이지 및 앱에서 직접 조회하고 출력할 수 있습니다.'
            },
            {
                q: '등급 판정 후 어떤 서류를 받나요?',
                a: '인정서, 개인별장기요양이용계획서, 복지용구 급여확인서 3종을 공단으로부터 수령합니다.'
            },
            {
                q: '등급 판정 후 어르신 상태가 나빠지면 어떡하죠?',
                a: "유효기간 내라도 상태가 변하여 다른 등급을 받고자 할 때는 '등급변경신청'을 할 수 있습니다."
            }
        ],
        caution: '본 콘텐츠는 현재 폴더에 있는 장기요양급여 이용 안내 PDF 원문을 기준으로 요약·정리한 안내입니다.',
        sourceRefs: ['PDF 5쪽', 'PDF 6쪽', 'PDF 8쪽', 'PDF 10쪽', 'PDF 28쪽'],
        sourcePages: [5, 6, 8, 10, 28]
    }
};
