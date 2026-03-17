import Image from 'next/image'

// ── 네비게이션 ────────────────────────────────────────────────
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-gray-900 tracking-tight">문신의</span>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#about" className="hover:text-blue-600">소개</a>
          <a href="#education" className="hover:text-blue-600">학력</a>
          <a href="#research" className="hover:text-blue-600">연구</a>
          <a href="#skills" className="hover:text-blue-600">역량</a>
          <a href="#activities" className="hover:text-blue-600">활동</a>
        </nav>
        <a
          href="mailto:msi39670@gmail.com"
          className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Contact
        </a>
      </div>
    </header>
  )
}

// ── 히어로 ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
        <div className="shrink-0">
          <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-gray-100">
            <Image
              src="/profile.jpg"
              alt="문신의 프로필 사진"
              width={144}
              height={144}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-blue-600 mb-2">영남대학교 화학공학부 에너지화공전공 · 4학년</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            문신의
            <span className="text-2xl sm:text-3xl font-medium text-gray-400 ml-3">Moon Shinui</span>
          </h1>
          <p className="text-gray-500 text-lg mb-6 leading-relaxed">
            에너지 소재 연구자 · 전기화학 / 광촉매 · AI 도구 활용
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="mailto:msi39670@gmail.com" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors">
              <span>✉</span> msi39670@gmail.com
            </a>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span>☎</span> 010-9900-3967
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <span>📍</span> 경상북도 경산시
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 섹션 헤더 공통 ────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-2 w-10 h-1 bg-blue-600 rounded-full" />
    </div>
  )
}

// ── 소개 ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-16 px-6 max-w-5xl mx-auto">
      <SectionHeader title="소개" />
      <div className="bg-gray-50 rounded-2xl p-8">
        <p className="text-gray-700 leading-8 text-base">
          영남대학교 화학공학부 에너지화공전공에서 <strong className="text-gray-900">학점 4.42 / 4.5</strong>를 유지하며
          에너지 소재 연구의 이론적·실험적 기반을 다져왔습니다. 광촉매(CO₂ 전환)에서 전기촉매(알칼라인 수전해)로
          이어지는 연구 흐름을 통해 차세대 에너지 소재에 대한 깊은 관심을 키워왔습니다.
        </p>
        <p className="text-gray-700 leading-8 text-base mt-4">
          동시에 n8n, Make, Claude Code 등 AI 도구를 실질적으로 활용하며, 계산–실험–데이터가 결합된
          폐루프(Closed-loop) 연구 방식에 관심을 갖고 있습니다. 실험 역량과 AI 활용 능력을 결합하여
          소재 발견을 가속화하는 연구에 기여하고자 합니다.
        </p>
      </div>
    </section>
  )
}

// ── 학력 ──────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="학력 및 수상" />
      <div className="space-y-6">
        {/* 대학교 */}
        <div className="flex gap-6">
          <div className="w-32 shrink-0 pt-1">
            <span className="text-sm font-medium text-blue-600">2021.03 ~ 현재</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">영남대학교</h3>
            <p className="text-gray-600 mt-0.5">공과대학 화학공학부 에너지화공전공 · 4학년 재학</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                GPA 4.42 / 4.5
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium">
                학과 내 최상위 성적
              </span>
            </div>
          </div>
        </div>

        {/* 장학금 */}
        <div className="flex gap-6">
          <div className="w-32 shrink-0 pt-1">
            <span className="text-sm font-medium text-blue-600">2025 2학기</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">영남대학교학술진흥재단 장학금</h3>
            <p className="text-gray-600 mt-0.5">학과 수석 학생에게 수여 (1,000,000원)</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-32 shrink-0 pt-1">
            <span className="text-sm font-medium text-blue-600">2021 ~ 2026</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">학업성적우수 장학금</h3>
            <p className="text-gray-600 mt-0.5">전학년 최상위 성적 유지로 매학기 수혜</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 연구 경험 ─────────────────────────────────────────────────
function Research() {
  const items = [
    {
      period: '2025 여름',
      title: 'DGIST 대학원 하계 연구 인턴십',
      org: 'DGIST 에너지공학과 · 인수일 교수 지도',
      topic: '이산화탄소 전환을 위한 광촉매 개발',
      details: [
        '소재 합성, 특성 분석, 반응 조건 최적화 전 과정 수행',
        'UV-Vis, XRD, GC(가스크로마토그래피) 장비 활용',
      ],
      color: 'blue',
    },
    {
      period: '2025 ~ 현재',
      title: '알칼라인 수전해 효율 향상을 위한 전기촉매 개발',
      org: '영남대학교 화학공학부 · 캡스톤 프로젝트',
      topic: '전기촉매 소재 합성 및 전기화학 특성 분석',
      details: [
        '전기촉매 소재 합성 및 전기화학 특성 분석',
        '반응 메커니즘 탐구 및 전극 소재 설계',
      ],
      color: 'purple',
    },
  ]

  return (
    <section id="research" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="연구 경험" />
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl p-6 border-l-4 ${
              item.color === 'blue'
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-purple-500 bg-purple-50/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.org}</p>
              </div>
              <span className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full ${
                item.color === 'blue'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {item.period}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">📌 {item.topic}</p>
            <ul className="space-y-1">
              {item.details.map((d) => (
                <li key={d} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── 학술 활동 ─────────────────────────────────────────────────
function AcademicActivities() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="학술 활동" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">2025</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">한국화학공학회 Chem Frontier</h3>
          <p className="text-sm text-gray-600">식물 폐기물을 활용한 천연 항진균제 연구 발표</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">2024</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">한국화학공학회 Chem Frontier</h3>
          <p className="text-sm text-gray-600">Red Mud를 활용한 광촉매 개발 연구 발표</p>
        </div>
      </div>
    </section>
  )
}

// ── 역량 ──────────────────────────────────────────────────────
function Skills() {
  const categories = [
    {
      title: '전공 역량',
      icon: '⚗️',
      items: ['전기화학', '이차전지 및 연료전지', '반응공학', '열역학', '알칼라인 수전해 메커니즘'],
    },
    {
      title: '실험 기술',
      icon: '🔬',
      items: ['촉매 합성 (DGIST 인턴십)', 'UV-Vis 분석', 'XRD 분석', 'GC (가스크로마토그래피)'],
    },
    {
      title: 'AI / 도구',
      icon: '🤖',
      items: ['n8n · Make (워크플로우 자동화)', 'Claude Code (웹개발 실습)', 'Notion · Obsidian (지식 관리)'],
    },
    {
      title: '어학',
      icon: '🌐',
      items: ['TOEIC 805점 (2025)', '학술 논문 독해', '기초 연구 영어 소통'],
    },
  ]

  return (
    <section id="skills" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="역량" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-gray-50 rounded-2xl p-5">
            <div className="text-2xl mb-3">{cat.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">{cat.title}</h3>
            <ul className="space-y-1.5">
              {cat.items.map((item) => (
                <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── 과외 활동 ─────────────────────────────────────────────────
function Activities() {
  return (
    <section id="activities" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="과외 활동" />
      <div className="space-y-4">
        <div className="flex gap-6">
          <div className="w-32 shrink-0 pt-1">
            <span className="text-sm font-medium text-blue-600">2025</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              영남대학교 화학공학부 학술동아리 A.H.A — 회장
            </h3>
            <p className="text-sm text-gray-600 mt-1">자체 학술대회 기획 및 진행, 학년 간 멘토링 프로그램 운영</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-32 shrink-0 pt-1">
            <span className="text-sm font-medium text-blue-600">2025</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">AI 컨퍼런스 참가</h3>
            <p className="text-sm text-gray-600 mt-1">
              Notion · Obsidian 기반 지식 관리, AI 활용 비즈니스 강연 수강
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 푸터 ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 text-center">
      <p className="text-sm text-gray-400">
        © 2026 Moon Shinui · <a href="mailto:msi39670@gmail.com" className="hover:text-blue-600 transition-colors">msi39670@gmail.com</a>
      </p>
    </footer>
  )
}

// ── 메인 ──────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Research />
        <AcademicActivities />
        <Skills />
        <Activities />
      </main>
      <Footer />
    </>
  )
}
