import { Team } from "./types";

export const teams: Team[] = [
    {
        id: "t1",
        name: "메디브릿지 (MediBridge)",
        hackathonId: "1",
        hackathonTitle: "AI Future Hackathon 2025",
        description:
            "AI를 활용한 의료 진단 보조 솔루션을 개발 중입니다. ML 엔지니어와 백엔드 개발자를 찾고 있어요!",
        members: [
            { userId: "u1", role: "팀장 / AI 엔지니어" },
            { userId: "u2", role: "프론트엔드 개발자" },
        ],
        maxMembers: 4,
        requiredRoles: ["ai", "backend"],
        requiredSkills: ["ML Engineering", "Backend (Python)", "Data Science"],
        requiredSkillsByRole: {
            ai: ["Python", "PyTorch", "TensorFlow"],
            backend: ["Node.js", "Python", "Java"]
        },
        problem: "기존의 의료 진단은 시간과 비용이 많이 소요되며, 특히 전문의가 부족한 지역에서는 조기 진단이 매우 어렵습니다.",
        solution: "ML 모델을 활용하여 흉부 X-ray 이미지를 실시간으로 분석하고, 비정상 징후를 판독하여 의사의 보조 도구로 활용할 수 있는 시스템을 구축합니다.",
        keyFeatures: [
            "흉부 X-ray 다중 질환 판독 모델",
            "병변 부위 히트맵 가이드라인 제공",
            "의료 기록 자동 요약 및 보고서 생성"
        ],
        timeline: [
            { date: "2026-03-10", task: "팀 빌딩 완료" },
            { date: "2026-03-25", task: "AI 모델 레이어 설계" },
            { date: "2026-04-10", task: "데이터셋 학습 및 검증" },
            { date: "2026-04-30", task: "최종 제출" }
        ],
        communication: "평일 비대면 슬랙 소통 / 매주 토요일 오후 오프라인 정기 미팅",
        isRecruiting: true,
        createdAt: "2025-03-10",
    },
    {
        id: "t2",
        name: "지갑술사",
        hackathonId: "2",
        hackathonTitle: "Web3 Global Summit 2025",
        description:
            "DeFi 서비스의 접근성을 높이기 위해 복잡한 트랜잭션을 추상화한 지갑 서비스를 만들고자 합니다.",
        members: [
            { userId: "u3", role: "팀장 / 블록체인 개발자" },
            { userId: "u4", role: "UI/UX 디자이너" },
        ],
        maxMembers: 3,
        requiredRoles: ["frontend"],
        requiredSkills: ["React", "Web3.js", "Tailwind CSS"],
        problem: "일반 사용자들이 DeFi를 사용하기 위해서는 복잡한 개인키 관리와 높은 가스비, 이해하기 어려운 트랜잭션 과정이 큰 진입 장벽이 됩니다.",
        solution: "Account Abstraction(EIP-4337)을 적용하여 소셜 로그인이 가능하고, 가스비를 대납해주며 복잡한 과정을 버튼 하나로 해결해주는 지능형 지갑을 개발합니다.",
        keyFeatures: [
            "소셜 계정 연동 지갑 생성",
            "일괄 트랜잭션(Batching) 처리",
            "가산 자산 자동 스와핑 추천"
        ],
        timeline: [
            { date: "2026-03-12", task: "스마트 컨트랙트 설계" },
            { date: "2026-03-30", task: "AA 지갑 모듈 구현" },
            { date: "2026-04-15", task: "토큰 스왑 엔진 연동" },
            { date: "2026-04-25", task: "최종 제출" }
        ],
        communication: "전면 원격 근무 / 게더타운 상주 및 노션 비동기 협업 중심",
        isRecruiting: true,
        createdAt: "2025-03-12",
    },
    {
        id: "t3",
        name: "분리수거왕",
        hackathonId: "1",
        hackathonTitle: "AI Future Hackathon 2025",
        description: "스마트 재활용 분류 AI 시스템을 개발합니다. 풀스택 개발자를 찾습니다!",
        members: [
            { userId: "u5", role: "PM / 기획" },
            { userId: "u6", role: "백엔드 개발자" },
            { userId: "u7", role: "ML 엔지니어" },
        ],
        maxMembers: 5,
        requiredRoles: ["frontend", "mobile"],
        requiredSkills: ["Frontend (React)", "Mobile (Flutter or React Native)"],
        communication: "카카오톡 실시간 소통 / 주 2회 구글 미트 화상 회의",
        problem: "재활용 분리배출 규정이 복잡하여 오분류율이 높고, 실제 재활용 가능 자원이 쓰레기로 버려지는 양이 방대합니다.",
        solution: "스마트폰 카메라로 쓰레기를 촬영하면 AI가 즉각적으로 재질을 분석하고, 해당 지자체의 규정에 맞는 배출 방법을 가이드합니다.",
        keyFeatures: [
            "객체 인식 기반 실시간 분리배출 가이드",
            "지역별 분리수거 요일 및 장소 알림 서비스",
            "분리배출 실천 기록을 통한 에코 포인트 리워드"
        ],
        timeline: [
            { date: "2026-03-08", task: "지자체별 데이터 수집" },
            { date: "2026-03-22", task: "분류 모델 알고리즘 확정" },
            { date: "2026-04-15", task: "최종 제출" }
        ],
        isRecruiting: true,
        createdAt: "2025-03-08",
    },
    {
        id: "t4",
        name: "HealthPulse",
        hackathonId: "4",
        hackathonTitle: "Healthcare Innovation Sprint",
        description: "환자 모니터링 IoT + AI 플랫폼 개발. 팀 구성 완료, 열정적인 멘토 구함!",
        members: [
            { userId: "u8", role: "iOS 개발자" },
            { userId: "u9", role: "AI 엔지니어" },
            { userId: "u10", role: "백엔드 / DevOps" },
            { userId: "u11", role: "UX 디자이너" },
        ],
        maxMembers: 4,
        requiredRoles: [],
        requiredSkills: [],
        communication: "Slack 및 GitHub 위주의 비동기 협업",
        problem: "고령화 시대에 독거노인의 건강 이상 징후를 실시간으로 감지하고 대응할 수 있는 저비용 고효율 시스템이 부족합니다.",
        solution: "웨어러블 기기와 가정 내 센서 데이터를 통합 분석하여 낙상, 심박수 이상 등을 감지하고 보호자에게 즉시 알림을 전달합니다.",
        keyFeatures: [
            "비정상 생체 신호 감지 알림 시스템",
            "과거 건강 데이터 추이 분석 대시보드",
            "이상 징후 발생 시 긴급 호출 기능"
        ],
        timeline: [
            { date: "2026-03-05", task: "H/W 센서 프로토타이핑" },
            { date: "2026-03-18", task: "클라우드 데이터 파이프라인" },
            { date: "2026-04-05", task: "최종 제출" }
        ],
        isRecruiting: false,
        createdAt: "2025-03-05",
    },
    {
        id: "t5",
        name: "돈길만걷자",
        hackathonId: "5",
        hackathonTitle: "FinTech Disrupt 2025",
        description: "AI 기반 개인 자산관리 서비스 개발. 경험 있는 백엔드 개발자와 데이터 분석가를 찾습니다.",
        members: [
            { userId: "u12", role: "풀스택 개발자" },
        ],
        maxMembers: 4,
        requiredRoles: ["backend", "ai", "design"],
        requiredSkills: ["Backend (Java/Spring)", "Data Analytics", "UI/UX"],
        communication: "평일 저녁 온라인 미팅 / 피그마 실시간 공유",
        problem: "사회 초년생들이 자신의 소비 패턴을 분석하고 자산 형성을 위한 구체적인 포트폴리오를 구성하는 데 어려움을 겪고 있습니다.",
        solution: "마이데이터 API를 연동하여 소비 내역을 자동 분류하고, AI가 개인의 재무 목표에 최적화된 저축 및 투자 전략을 제안합니다.",
        keyFeatures: [
            "소비 패턴 분석 및 과소비 경고 리포트",
            "개인 맞춤형 금융 상품 추천 엔진",
            "목표 자산 달성을 위한 시뮬레이션 위젯"
        ],
        timeline: [
            { date: "2026-03-14", task: "마이데이터 샌드박스 연동" },
            { date: "2026-03-28", task: "자산관리 모델 정교화" },
            { date: "2026-04-15", task: "최종 제출" }
        ],
        isRecruiting: true,
        createdAt: "2025-03-14",
    },
    {
        id: "t6",
        name: "빛나래",
        hackathonId: "6",
        hackathonTitle: "EduHack 2025",
        description: "시각 장애 학생을 위한 AI 학습 도우미 개발. 접근성과 교육에 열정 있는 분 환영!",
        members: [
            { userId: "u13", role: "프론트엔드 개발자" },
            { userId: "u14", role: "AI 엔지니어" },
        ],
        maxMembers: 4,
        requiredRoles: ["mobile", "design"],
        requiredSkills: ["Mobile Developer", "UX/Accessibility Design"],
        communication: "유동적인 시간 조율 / 주말 집중 개발 사이클",
        problem: "시각 장애 학생들이 그림, 도표 등이 포함된 학습 자료를 이해하는 데 큰 장벽이 존재하며, 기존 스크린 리더는 시각 정보 전달에 한계가 있습니다.",
        solution: "멀티모달 AI를 활용하여 교재 내 시각 요소를 상세한 음성 설명으로 변환하고, 대화형 질의응답을 통해 학습 내용을 심화 이해하도록 돕습니다.",
        keyFeatures: [
            "이미지 및 도표의 실시간 텍스트 묘사(Image-to-Text)",
            "대화형 AI 튜터와의 음성 질의응답",
            "접근성 표준을 준수한 스크린 리더 최적화 UI"
        ],
        timeline: [
            { date: "2026-03-11", task: "OCR 및 TTS 최적화" },
            { date: "2026-04-05", task: "모바일 접근성 테스트" },
            { date: "2026-04-15", task: "최종 제출" }
        ],
        isRecruiting: true,
        createdAt: "2025-03-11",
    },
];