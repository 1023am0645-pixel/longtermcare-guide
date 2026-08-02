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
                },
                {
                    id: 'integrated-home-care',
                    title: '통합재가서비스',
                    pages: [26, 27],
                    summary: [
                        '여러 재가급여를 어르신 상황에 맞게 통합해 제공하는 방식입니다.',
                        '방문요양, 방문목욕, 주야간보호 등을 조합해 볼 수 있습니다.',
                        '기관이 제공 가능한 서비스 범위를 확인해야 합니다.'
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
                source: 'PDF 12쪽'
            },
            {
                title: '갱신 신청 안내',
                headline: '갱신 기간을 놓치지 마세요',
                text: '유효기간 종료 30일 전까지 신청 완료',
                icon: 'calendar-check',
                tone: 'news-orange',
                source: 'PDF 57쪽'
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
                pages: '12'
            },
            {
                label: '유효기간',
                content: '급여를 이용할 수 있는 기간',
                check: '인정서에 명시된 종료 날짜 확인',
                pages: '57'
            }
        ],
        checklist: [
            {
                title: '어르신이 6개월 이상 혼자 일상생활이 어려운 상태인가요?',
                text: '',
                source: ''
            },
            {
                title: '65세 미만이라면 노인성 질병 진단서가 준비되어 있나요?',
                text: '',
                source: ''
            },
            {
                title: '공단에서 보낸 인정서 등 필수 서류 3종을 모두 받으셨나요?',
                text: '',
                source: ''
            },
            {
                title: '계속 이용 시 유효기간 종료 30일 전까지 갱신을 완료했나요?',
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
                a: '유효기간 종료 30일 전까지 공단 지사 방문, 우편, 팩스, 인터넷으로 신청해야 하며, 갱신에 한해 전화 신청도 가능합니다.'
            },
            {
                q: '등급 판정 후 어르신 상태가 나빠지면 어떡하죠?',
                a: "유효기간 내라도 상태가 변하여 다른 등급을 받고자 할 때는 '등급변경신청'을 할 수 있습니다."
            }
        ],
        caution: '본 콘텐츠는 제공된 PDF 원문의 내용을 기반으로 요약·정리되었습니다. 구체적인 신청 방법 및 서류 양식은 국민건강보험공단(1577-1000)을 통해 다시 한번 확인하시기 바랍니다.',
        sourceRefs: ['PDF 4쪽', 'PDF 5쪽', 'PDF 6쪽', 'PDF 12쪽', 'PDF 57쪽'],
        sourcePages: [4, 5, 6, 12]
    },

    gradeResultGuide: {
        id: 'grade-result',
        title: '등급판정 결과 확인',
        description: '장기요양 등급 구분과 판정 결과 확인, 서류 수령 내용을 안내합니다.',
        badge: '등급',
        color: 'violet',
        flowTitle: '판정 결과 확인 흐름',
        checklistTitle: '결과통보 후 확인할 것',
        faqTitle: '결과 확인 때 많이 묻는 질문',
        menu: {
            title: '등급판정 결과 확인',
            subtitle: '등급, 서류, 결과조회 확인',
            href: '#guide/grade-result',
            icon: 'badge-check',
            tone: 'purple'
        },
        newsCards: [
            {
                title: '등급 구분',
                headline: '1~5등급 및 인지지원등급',
                text: '심신상태와 장기요양이 필요한 정도에 따라 판정됩니다.',
                icon: 'badge-check',
                tone: 'news-blue',
                source: 'PDF 6쪽'
            },
            {
                title: '결과 조회',
                headline: '홈페이지·앱·정부24에서 확인',
                text: '판정 결과를 직접 조회하고 출력할 수 있습니다.',
                icon: 'smartphone',
                tone: 'news-green',
                source: 'PDF 12쪽'
            },
            {
                title: '필수 서류',
                headline: '인정서 등 3종 수령',
                text: '인정서, 개인별장기요양이용계획서, 복지용구 급여확인서를 확인하세요.',
                icon: 'files',
                tone: 'news-orange',
                source: 'PDF 12쪽'
            }
        ],
        steps: [
            {
                title: '등급판정',
                text: '등급판정위원회에서 심사 및 결정',
                icon: 'users',
                source: 'PDF 5쪽'
            },
            {
                title: '결과확인',
                text: '홈페이지, 건강보험25시, 정부24에서 조회 및 출력',
                icon: 'search-check',
                source: 'PDF 12쪽'
            },
            {
                title: '서류수령',
                text: '필수 서류 3종 및 기관 현황 제공',
                icon: 'mail',
                source: 'PDF 12쪽'
            },
            {
                title: '급여이용 준비',
                text: '요양기관 선택 및 서비스 계약 체결',
                icon: 'hand-heart',
                source: 'PDF 10, 12쪽'
            }
        ],
        keyTable: [
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
                pages: '12'
            },
            {
                label: '서류수령',
                content: '인정서, 개인별장기요양이용계획서, 복지용구 급여확인서',
                check: '필수 서류 3종 확인',
                pages: '12'
            },
            {
                label: '유효기간',
                content: '급여를 이용할 수 있는 기간',
                check: '인정서에 명시된 종료 날짜 확인',
                pages: '57'
            }
        ],
        checklist: [
            {
                title: '판정 결과를 홈페이지, 건강보험25시, 정부24에서 확인했나요?',
                text: '',
                source: 'PDF 12쪽'
            },
            {
                title: '인정서 등 필수 서류 3종을 모두 받으셨나요?',
                text: '',
                source: 'PDF 12쪽'
            },
            {
                title: '인정서에 적힌 등급과 유효기간을 확인했나요?',
                text: '',
                source: 'PDF 57쪽'
            },
            {
                title: '상태가 변한 경우 등급변경신청이 필요한지 확인했나요?',
                text: '',
                source: 'PDF 57쪽'
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
        caution: '본 콘텐츠는 제공된 PDF 원문의 내용을 기반으로 요약·정리되었습니다. 구체적인 신청 방법 및 서류 양식은 국민건강보험공단(1577-1000)을 통해 다시 한번 확인하시기 바랍니다.',
        sourceRefs: ['PDF 5쪽', 'PDF 6쪽', 'PDF 10쪽', 'PDF 12쪽', 'PDF 57쪽'],
        sourcePages: [5, 6, 10, 12]
    }
};
