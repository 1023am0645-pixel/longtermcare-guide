document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PAGES = 44;
    const BOOK_BASE = 'assets/book-pages';
    const SOURCE_URL = 'https://ligsystemup.kdtidc.com/e-book/2026%EC%9E%A5%EA%B8%B0%EC%9A%94%EC%96%91%EA%B8%89%EC%97%AC%EC%9D%B4%EC%9A%A9_ebook/index.html';

    const categories = [
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
                    ],
                    details: [
                        '인정서에 적힌 등급이 실제 서비스 이용의 기준입니다.',
                        '등급이 바뀌면 이용 가능한 서비스와 비용도 함께 달라질 수 있습니다.'
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
                    ],
                    details: [
                        '정확한 등급명은 장기요양인정서에서 확인합니다.',
                        '등급별 설명은 원문 5쪽의 표와 함께 보면 이해하기 쉽습니다.'
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
                    ],
                    details: [
                        '서비스를 시작하기 전 기관에 인정서와 이용계획서를 제시합니다.',
                        '유효기간이 지난 인정서는 그대로 사용할 수 없습니다.'
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
                    ],
                    details: [
                        '서비스 종류마다 이용 시간과 비용 산정 방식이 다릅니다.',
                        '재가급여 세부 내용은 별도 카테고리에서 더 자세히 볼 수 있습니다.'
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
                    ],
                    details: [
                        '시설 이용 전 계약 내용, 비용, 제공 서비스를 확인합니다.',
                        '시설급여 세부 내용은 시설급여 카테고리에서 이어서 볼 수 있습니다.'
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
                    ],
                    details: [
                        '침대, 휠체어, 보행보조용품 등은 품목별 기준이 있습니다.',
                        '연간 한도와 본인부담금이 적용될 수 있습니다.'
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
                    ],
                    details: [
                        '시설 입소 여부는 비용, 생활환경, 돌봄 필요도를 함께 비교합니다.',
                        '재가급여를 이용하는 경우 방문요양 등 세부 서비스를 조합할 수 있습니다.'
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
                    ],
                    details: [
                        '등급만으로 결정하지 말고 실제 돌봄 시간과 생활 패턴을 함께 봅니다.',
                        '기관 상담 시 이용 가능 시간과 월 한도를 같이 확인합니다.'
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
                    ],
                    details: [
                        '치매 관련 돌봄이 필요한 경우 서비스 내용과 프로그램을 확인합니다.',
                        '인지지원등급은 이용 가능 급여가 제한될 수 있어 원문 페이지와 함께 봅니다.'
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
                    ],
                    details: [
                        '세 서류는 기관 선택과 계약 단계에서 계속 필요합니다.',
                        '분실했거나 내용이 헷갈리면 재발급 여부를 확인합니다.'
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
                    ],
                    details: [
                        '어르신 상태와 이용계획서 내용이 맞지 않는다고 느껴지면 기관 상담 때 설명을 요청합니다.',
                        '계약 전 비용과 서비스 내용을 서류 기준으로 다시 확인합니다.'
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
                    ],
                    details: [
                        '갱신은 미리 준비하는 것이 좋습니다.',
                        '유효기간은 인정서에 적힌 날짜를 기준으로 봅니다.'
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
                    ],
                    details: [
                        '같은 방문요양이라도 기관마다 제공 가능한 시간과 인력이 다를 수 있습니다.',
                        '주야간보호나 시설은 실제 위치와 이동 방법도 중요합니다.'
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
                    ],
                    details: [
                        '계약 전에 설명받은 내용은 계약서와 급여제공계획서에 반영되어야 합니다.',
                        '비용만 보지 말고 어르신 생활 패턴과 맞는지도 함께 봅니다.'
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
                    ],
                    details: [
                        '기관 상담은 실제 이용 계획을 정하는 단계입니다.',
                        '불분명한 비용이나 서비스 범위는 계약 전 정리해야 합니다.'
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
                    ],
                    details: [
                        '계약 전 설명이 부족하면 바로 서명하지 말고 다시 설명을 요청합니다.',
                        '계약 내용은 실제 서비스 제공 기준이 됩니다.'
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
                    ],
                    details: [
                        '계약서 사본은 보관하는 것이 좋습니다.',
                        '서비스 변경이 있으면 계약 또는 계획서도 함께 확인합니다.'
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
                    ],
                    details: [
                        '이용 내역과 비용 청구 내용을 주기적으로 봅니다.',
                        '어르신 상태가 달라지면 서비스 계획도 조정할 수 있습니다.'
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
                    ],
                    details: [
                        '가사 지원만을 목적으로 이용하는 서비스가 아닙니다.',
                        '어르신에게 필요한 신체활동과 일상생활 지원이 중심입니다.'
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
                    ],
                    details: [
                        '어르신 건강 상태에 따라 목욕 방식이 달라질 수 있습니다.',
                        '목욕 전후 안전 관리가 중요합니다.'
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
                    ],
                    details: [
                        '의료기관 진료를 대신하는 서비스가 아닙니다.',
                        '필요한 간호 내용은 의사 지시와 어르신 상태를 기준으로 봅니다.'
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
                    ],
                    details: [
                        '송영 가능 여부와 이용 시간을 꼭 봅니다.',
                        '인지활동 프로그램이 필요한 경우 제공 여부를 확인합니다.'
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
                    ],
                    details: [
                        '장기간 시설 입소와는 다른 서비스입니다.',
                        '예약 가능 여부와 이용 기간 제한을 함께 봅니다.'
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
                    ],
                    details: [
                        '통합재가서비스 제공 기관인지 먼저 봅니다.',
                        '월 이용 계획을 세울 때 어르신 생활 흐름과 가족 돌봄 시간을 같이 고려합니다.'
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
                    ],
                    details: [
                        '필요한 용구가 모두 지원되는 것은 아닙니다.',
                        '품목별 기준과 한도를 확인해야 합니다.'
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
                    ],
                    details: [
                        '같은 품목이라도 상태와 필요도에 따라 선택이 달라질 수 있습니다.',
                        '복지용구 사업소에서 품목과 비용을 설명받습니다.'
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
                    ],
                    details: [
                        '품목 가격과 본인부담금은 사업소 설명과 원문 표를 함께 봅니다.',
                        '한도 초과 여부를 미리 확인하면 비용 혼선을 줄일 수 있습니다.'
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
                    ],
                    details: [
                        '시설급여는 생활 공간이 바뀌는 결정이므로 가족과 충분히 상의합니다.',
                        '입소 전 제공 서비스와 비용을 꼼꼼히 봅니다.'
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
                    ],
                    details: [
                        '방문 상담이나 시설 견학을 통해 실제 환경을 보는 것이 좋습니다.',
                        '의료적 관리가 필요한 경우 제공 가능 여부를 확인합니다.'
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
                    ],
                    details: [
                        '급여 항목과 비급여 항목을 나눠서 봐야 합니다.',
                        '월 예상 비용을 계약 전에 안내받습니다.'
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
                    ],
                    details: [
                        '실제 부담금은 이용량, 급여 종류, 감경 여부에 따라 달라집니다.',
                        '기관에서 월 예상 부담금을 설명받아야 합니다.'
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
                    ],
                    details: [
                        '감경 적용 여부는 비용 안내를 받을 때 함께 봅니다.',
                        '자격 변동이 있으면 부담금도 달라질 수 있습니다.'
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
                    ],
                    details: [
                        '이용하지 않은 서비스가 청구되지 않았는지 확인합니다.',
                        '비급여 비용이 있다면 급여비용과 구분해서 봅니다.'
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
                    ],
                    details: [
                        '월 예상 비용을 볼 때 비급여를 빼놓으면 실제 부담액이 달라집니다.',
                        '시설 이용 시 비급여 항목 확인이 특히 중요합니다.'
                    ]
                }
            ]
        }
    ];

    const legacySectionMap = {
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
    };

    const quickMenus = [
        { title: '인정서발급', href: '#category/documents', icon: 'file-text', tone: 'blue' },
        { title: '급여이용방법', href: '#category/benefit-types', icon: 'route', tone: 'green' },
        { title: '기관찾기', href: '#category/institution', icon: 'building-2', tone: 'purple' },
        { title: '본인부담금', href: '#category/copayment', icon: 'wallet', tone: 'yellow' }
    ];

    const mainMenus = [
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
            href: '#category/grade',
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
    ];

    const applicationGuide = {
        id: 'application',
        title: '장기요양 인정신청',
        description: '신청 대상 확인부터 신청 방법, 결과 확인까지의 전 과정을 안내합니다.',
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
        tableRows: [
            {
                type: '인정신청',
                content: '장기요양보험 혜택을 위한 첫 단계',
                check: '65세 이상 또는 노인성 질병 여부',
                page: '4, 5'
            },
            {
                type: '등급판정',
                content: '어르신 상태에 따른 등급 결정',
                check: '1~5등급 및 인지지원등급 구분',
                page: '6'
            },
            {
                type: '결과확인',
                content: '판정 결과 조회 및 서류 발급',
                check: '홈페이지, 앱(건강보험25시), 정부24',
                page: '12'
            },
            {
                type: '유효기간',
                content: '급여를 이용할 수 있는 기간',
                check: '인정서에 명시된 종료 날짜 확인',
                page: '57'
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
    };

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

                <div class="topic-detail-box">
                    <h2>조금 더 정리하면</h2>
                    <ul>
                        ${topic.details.map(item => `<li>${item}</li>`).join('')}
                    </ul>
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

    function renderApplicationGuide() {
        setActiveNav('home', 'detail');
        app.innerHTML = `
            <section class="app-guide-detail guide-view blue">
                <a class="back-link" href="#home">
                    <i data-lucide="chevron-left" aria-hidden="true"></i>
                    가이드 홈
                </a>

                <div class="app-detail-hero">
                    <span class="section-number">신청</span>
                    <h1>${applicationGuide.title}</h1>
                    <p>${applicationGuide.description}</p>
                </div>

                <section class="card-news-panel" aria-labelledby="application-cardnews-title">
                    <div class="panel-title">
                        <span class="panel-icon blue">
                            <i data-lucide="panels-top-left" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>카드뉴스</span>
                            <h2 id="application-cardnews-title">핵심만 먼저 보기</h2>
                        </div>
                    </div>
                    <div class="news-card-track" aria-label="장기요양 인정신청 핵심 카드뉴스">
                        ${applicationGuide.newsCards.map(card => `
                            <article class="news-card ${card.tone}">
                                <div class="news-card-icons">
                                    <i data-lucide="${card.icon}" aria-hidden="true"></i>
                                    ${card.secondIcon ? `<i data-lucide="${card.secondIcon}" aria-hidden="true"></i>` : ''}
                                </div>
                                <span>${card.title}</span>
                                <h3>${card.headline}</h3>
                                <p>${card.text}</p>
                                <small>원문 근거: ${card.source}</small>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <section class="flow-panel" aria-labelledby="application-flow-title">
                    <div class="panel-title">
                        <span class="panel-icon purple">
                            <i data-lucide="route" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>진행 순서</span>
                            <h2 id="application-flow-title">신청부터 결과통보까지</h2>
                        </div>
                    </div>
                    <div class="step-timeline">
                        ${applicationGuide.steps.map((step, index) => `
                            <article class="step-card">
                                <span>${index + 1}</span>
                                <div>
                                    <i data-lucide="${step.icon}" aria-hidden="true"></i>
                                    <h3>${step.title}</h3>
                                    <p>${step.text}</p>
                                    ${step.source ? `<small>원문 근거: ${step.source}</small>` : ''}
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <section class="comparison-panel" aria-labelledby="application-table-title">
                    <div class="panel-title">
                        <span class="panel-icon blue">
                            <i data-lucide="table-2" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>핵심 내용 표</span>
                            <h2 id="application-table-title">표로 정리한 핵심 내용</h2>
                        </div>
                    </div>
                    <div class="comparison-list">
                        ${applicationGuide.tableRows.map(row => `
                            <article class="comparison-card">
                                <strong>${row.type}</strong>
                                <dl>
                                    <div>
                                        <dt>핵심 내용</dt>
                                        <dd>${row.content}</dd>
                                    </div>
                                    <div>
                                        <dt>확인할 점</dt>
                                        <dd>${row.check}</dd>
                                    </div>
                                    <div>
                                        <dt>원문 페이지</dt>
                                        <dd>${row.page}</dd>
                                    </div>
                                </dl>
                            </article>
                        `).join('')}
                    </div>
                </section>

                <section class="checklist-panel" aria-labelledby="application-checklist-title">
                    <div class="panel-title">
                        <span class="panel-icon green">
                            <i data-lucide="check-square" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>보호자 체크리스트</span>
                            <h2 id="application-checklist-title">신청 전에 확인할 것</h2>
                        </div>
                    </div>
                    <div class="check-list">
                        ${applicationGuide.checklist.map(item => `
                            <label class="check-item">
                                <input type="checkbox" aria-label="${item.title}">
                                <span>
                                    <strong>${item.title}</strong>
                                    ${item.text ? `<em>${item.text}</em>` : ''}
                                    ${item.source ? `<small>원문 근거: ${item.source}</small>` : ''}
                                </span>
                            </label>
                        `).join('')}
                    </div>
                </section>

                <section class="faq-panel" aria-labelledby="application-faq-title">
                    <div class="panel-title">
                        <span class="panel-icon blue">
                            <i data-lucide="circle-help" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>자주 묻는 질문</span>
                            <h2 id="application-faq-title">신청할 때 많이 묻는 질문</h2>
                        </div>
                    </div>
                    <div class="faq-list">
                        ${applicationGuide.faqs.map(item => `
                            <details class="faq-item">
                                <summary>${item.q}</summary>
                                <p>${item.a}</p>
                                ${item.source ? `<small>원문 근거: ${item.source}</small>` : ''}
                            </details>
                        `).join('')}
                    </div>
                </section>

                <section class="caution-panel" aria-label="주의">
                    <div class="panel-title">
                        <span class="panel-icon yellow">
                            <i data-lucide="alert-circle" aria-hidden="true"></i>
                        </span>
                        <div>
                            <span>주의</span>
                            <h2>원문 기반 요약 안내</h2>
                        </div>
                    </div>
                    <p>${applicationGuide.caution}</p>
                </section>

                <details class="ebook-source-details">
                    <summary>
                        <span>
                            <i data-lucide="book-open" aria-hidden="true"></i>
                            상세 가이드 전문 보기
                        </span>
                        <small>원문 e-book 캡처는 필요할 때만 펼쳐서 확인하세요</small>
                    </summary>
                    <div class="source-ref-list" aria-label="원문 근거 목록">
                        ${applicationGuide.sourceRefs.map(ref => `<span>${ref}</span>`).join('')}
                    </div>
                    <div class="reference-grid">
                        <a class="reference-cover" href="#page/${applicationGuide.sourcePages[0]}/guide/application">
                            <img loading="lazy" src="${pageImage(applicationGuide.sourcePages[0])}" alt="${applicationGuide.title} 원문 ${pageLabel(applicationGuide.sourcePages[0])}">
                            <span>첫 원문 ${pageLabel(applicationGuide.sourcePages[0])}</span>
                        </a>
                        <div class="page-buttons" aria-label="${applicationGuide.title} 원문 페이지">
                            ${applicationGuide.sourcePages.map(page => `
                                <a href="#page/${page}/guide/application">
                                    <strong>${pageLabel(page)}</strong>
                                    <span>원문 보기</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </details>
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
        const guideSource = sourceCategoryId === 'guide' && sourceTopicId === applicationGuide.id;
        const backHref = guideSource ? '#guide/application' : found?.topic ? `#topic/${found.category.id}/${found.topic.id}` : found?.id ? `#category/${found.id}` : '#book';
        const caption = guideSource ? applicationGuide.title : found?.topic ? `${found.category.title} · ${found.topic.title}` : found?.title || '장기요양급여 이용 안내';
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
            const haystack = `${category.title} ${category.subtitle} ${topic.title} ${topic.summary.join(' ')} ${topic.details.join(' ')}`.toLowerCase();
            return haystack.includes(normalized);
        });
        const matchedApplication = `${applicationGuide.title} ${applicationGuide.description} ${applicationGuide.newsCards.map(card => `${card.title} ${card.headline} ${card.text}`).join(' ')} ${applicationGuide.steps.map(step => `${step.title} ${step.text}`).join(' ')} ${applicationGuide.checklist.map(item => `${item.title} ${item.text}`).join(' ')} ${applicationGuide.faqs.map(item => `${item.q} ${item.a}`).join(' ')}`.toLowerCase().includes(normalized);

        setActiveNav('');
        app.innerHTML = `
            <section class="search-results">
                <div class="section-heading wide">
                    <span>검색 결과</span>
                    <h1>“${escapeHtml(query)}”</h1>
                    <p>${matchedCategories.length + matchedTopics.length + (matchedApplication ? 1 : 0) ? '관련 항목을 찾았습니다.' : '검색 결과가 없습니다. 다른 단어로 다시 검색해 보세요.'}</p>
                </div>
                ${matchedApplication ? `
                    <div class="main-menu-grid">
                        ${homeMenuCard(applicationGuide.menu)}
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

        if (hash === '#guide/application') {
            renderApplicationGuide();
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
            button.classList.toggle('active', button.dataset.font === size);
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
