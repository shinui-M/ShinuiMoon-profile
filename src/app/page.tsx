"use client"
import { useState, useEffect, useRef } from 'react'

// ── 훅: 스크롤 진입 감지 ─────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── 컴포넌트: 페이드인 래퍼 ──────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── 훅: 활성 섹션 감지 ────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [ids])
  return active
}

// ── 훅: 스크롤 진행률 ─────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// ── 네비게이션 ────────────────────────────────────────────────
const NAV_LINKS = [
  { href: 'about', label: '소개' },
  { href: 'education', label: '학력' },
  { href: 'research', label: '연구' },
  { href: 'interests', label: '연구관심사' },
  { href: 'skills', label: '역량' },
  { href: 'activities', label: '활동' },
  { href: 'certificates', label: '증명서' },
]

function Nav() {
  const active = useActiveSection(NAV_LINKS.map((l) => l.href))
  const progress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      {/* 스크롤 진행 바 */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-blue-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-gray-900 tracking-tight">문신의</span>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className={`relative pb-0.5 transition-colors duration-200 ${
                active === link.href
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="mailto:msi39670@gmail.com"
            className="hidden sm:inline-flex text-sm px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:scale-95 transition-all duration-150"
          >
            Contact
          </a>
          {/* 햄버거 버튼 (모바일) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <div
        className={`sm:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 text-sm font-medium border-b border-gray-50 last:border-0 transition-colors ${
                active === link.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:msi39670@gmail.com"
            className="mt-3 text-center text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

// ── 히어로 ────────────────────────────────────────────────────
function useTypingEffect(text: string, speed = 55) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return { displayed, done }
}

function Hero() {
  const { displayed, done } = useTypingEffect('에너지 소재 연구자 · 전기화학 / 광촉매 · AI 도구 활용', 45)

  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
        <FadeIn delay={0} className="shrink-0">
          <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-md border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="문신의 증명사진"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </FadeIn>
        <div>
          <FadeIn delay={0}>
            <p className="text-sm font-medium text-blue-600 mb-2">
              영남대학교 화학공학부 에너지화공전공 · 4학년
            </p>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              문신의
              <span className="text-2xl sm:text-3xl font-medium text-gray-400 ml-3">Moon Shinui</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed min-h-[1.75rem]">
              {displayed}
              {!done && (
                <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 align-middle animate-pulse" />
              )}
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="mailto:msi39670@gmail.com"
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 transition-colors"
              >
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
          </FadeIn>
          <FadeIn delay={340}>
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { label: 'GPA', value: '4.42 / 4.5' },
                { label: '연구 인턴', value: '1회 (DGIST)' },
                { label: '학술 발표', value: '2회' },
                { label: 'TOEIC', value: '805점' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-sm"
                >
                  <span className="text-gray-400 font-medium">{stat.label}</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span className="text-blue-700 font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ── 섹션 헤더 공통 ────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <FadeIn className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="mt-2 w-10 h-1 bg-blue-600 rounded-full" />
    </FadeIn>
  )
}

// ── 소개 ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-16 px-6 max-w-5xl mx-auto">
      <SectionHeader title="소개" />
      <FadeIn delay={100}>
        <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
          <p className="text-gray-700 leading-8 text-base">
            영남대학교 화학공학부 에너지화공전공에서{' '}
            <strong className="text-gray-900">학점 4.42 / 4.5</strong>를 유지하며
            에너지 소재 연구의 이론적·실험적 기반을 다져왔습니다. 광촉매(CO₂ 전환)에서 전기촉매(알칼라인 수전해)로
            이어지는 연구 흐름을 통해 차세대 에너지 소재에 대한 깊은 관심을 키워왔습니다.
          </p>
          <p className="text-gray-700 leading-8 text-base mt-4">
            소재 합성부터 전기화학 분석(CV, LSV, EIS)까지 실험 전 과정을 직접 수행하며 데이터를 해석하는 역량을
            키워왔습니다. 그린 수소 생산 및 에너지 소재 분야에서 실험과 데이터 분석을 결합한 연구로
            기여하고자 합니다.
          </p>
        </div>
      </FadeIn>
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
        <FadeIn delay={80}>
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
              <div className="mt-3 overflow-x-auto">
                <table className="text-sm text-gray-600 border-collapse">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="pr-6 pb-1 font-medium text-left">학년</th>
                      <th className="pr-6 pb-1 font-medium text-center">1학기</th>
                      <th className="pb-1 font-medium text-center">2학기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['1학년', '4.33', '4.35'],
                      ['2학년', '4.42', '4.50'],
                      ['3학년', '4.50', '4.43'],
                    ].map(([grade, s1, s2]) => (
                      <tr key={grade} className="hover:bg-gray-50 transition-colors rounded">
                        <td className="pr-6 py-0.5 text-gray-700 font-medium">{grade}</td>
                        <td className="pr-6 py-0.5 text-center">{s1}</td>
                        <td className="py-0.5 text-center">{s2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 장학금 */}
        <FadeIn delay={160}>
          <div className="flex gap-6">
            <div className="w-32 shrink-0 pt-1">
              <span className="text-sm font-medium text-blue-600">2025 2학기</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">영남대학교학술진흥재단 장학금</h3>
              <p className="text-gray-600 mt-0.5">학과 수석 학생에게 수여 (1,000,000원)</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={220}>
          <div className="flex gap-6">
            <div className="w-32 shrink-0 pt-1">
              <span className="text-sm font-medium text-blue-600">2021 ~ 2026</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">학업성적우수 장학금</h3>
              <p className="text-gray-600 mt-0.5">전학년 최상위 성적 유지로 수혜</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── 연구 경험 ─────────────────────────────────────────────────
function Research() {
  const items = [
    {
      period: '2025 ~ 현재',
      title: '알칼라인 수전해 효율 향상을 위한 전기촉매 개발',
      org: '영남대학교 화학공학부 · 캡스톤 프로젝트',
      topic: '전기촉매 소재 합성 및 전기화학 특성 분석',
      details: [
        '전기촉매 소재 합성 및 전극 제작',
        'CV(순환전압전류법), LSV(선형주사전위법), EIS(전기화학 임피던스 분광법) 측정 및 분석',
        '반응 메커니즘 탐구 및 전극 소재 설계',
      ],
      color: 'purple',
    },
    {
      period: '2025 여름',
      title: 'DGIST 대학원 하계 연구 인턴십',
      org: 'DGIST 에너지공학과 · 인수일 교수 지도',
      topic: '이산화탄소 전환을 위한 광촉매 개발',
      details: [
        'TiO₂ 기반 광촉매 합성 및 밴드갭 제어를 통한 기능성 향상 연구',
        'UV-Vis 분광법으로 광흡수 특성 분석, XRD로 결정 구조 규명',
        'GC(가스크로마토그래피)를 활용한 수소 발생 효율 측정',
        'OriginPro를 활용한 실험 데이터 시각화 및 분석',
      ],
      color: 'blue',
    },
  ]

  return (
    <section id="research" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="연구 경험" />
      <div className="space-y-6">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 120}>
            <div
              className={`rounded-2xl p-6 border-l-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                item.color === 'blue'
                  ? 'border-blue-500 bg-blue-50/50 hover:bg-blue-50'
                  : 'border-purple-500 bg-purple-50/50 hover:bg-purple-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{item.org}</p>
                </div>
                <span
                  className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full ${
                    item.color === 'blue'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
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
          </FadeIn>
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
        {[
          { year: '2025', title: '한국화학공학회 Chem Frontier', desc: '식물 폐기물을 활용한 천연 항진균제 연구 발표' },
          { year: '2024', title: '한국화학공학회 Chem Frontier', desc: 'Red Mud를 활용한 광촉매 개발 연구 발표' },
        ].map((item, i) => (
          <FadeIn key={item.year + item.desc} delay={i * 100}>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-250">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {item.year}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── 연구 관심사 ────────────────────────────────────────────────
function ResearchInterests() {
  const interests = [
    {
      icon: '🔋',
      title: '이차전지 소재 및 전해질',
      desc: '고체·액체 전해질 설계, 음극재 및 폐자원 기반 실리콘 소재, 리튬이온전지 전극 특성 향상',
      color: 'green',
    },
    {
      icon: '💧',
      title: '그린 수소 생산',
      desc: '수전해(알칼라인·PEM), CO₂ 환원, 터콰이즈 수소 (암모니아 분해·메탄 열분해)',
      color: 'blue',
    },
    {
      icon: '⚡',
      title: '광촉매 및 전기촉매',
      desc: '밴드 구조 제어, 표면 특성 최적화, 반응 선택성 향상 — TiO₂ 계열 합성 경험 보유',
      color: 'yellow',
    },
    {
      icon: '♻️',
      title: '환경 촉매 / 자원순환',
      desc: '폐자원(Red mud) 활용 촉매 합성, 온실가스 저감 소재',
      color: 'teal',
    },
  ]

  const colorMap: Record<string, string> = {
    blue: 'border-blue-400 bg-blue-50/60 hover:bg-blue-50',
    yellow: 'border-yellow-400 bg-yellow-50/60 hover:bg-yellow-50',
    green: 'border-green-400 bg-green-50/60 hover:bg-green-50',
    teal: 'border-teal-400 bg-teal-50/60 hover:bg-teal-50',
  }

  return (
    <section id="interests" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="연구 관심사" />
      <div className="grid sm:grid-cols-2 gap-4">
        {interests.map((item, i) => (
          <FadeIn key={item.title} delay={i * 80}>
            <div
              className={`rounded-2xl p-5 border-l-4 transition-all duration-250 hover:shadow-md hover:-translate-y-0.5 ${colorMap[item.color]}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
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
      items: ['전기화학', '이차전지 및 연료전지', '고체화학', '물리화학', '열역학'],
    },
    {
      title: '실험 기술',
      icon: '🔬',
      items: [
        'TiO₂ 계열 광촉매 합성',
        'UV-Vis 분광 분석',
        'XRD (결정 구조 규명)',
        'GC (수소 발생 효율 측정)',
        'OriginPro (데이터 시각화)',
      ],
    },
    {
      title: 'AI / 도구',
      icon: '🤖',
      items: ['n8n · Make (워크플로우 자동화)', 'Claude Code (웹개발, 프로젝트 파이프라인 제작)', 'Notion · Obsidian (지식 관리)'],
    },
    {
      title: '어학 · 자격',
      icon: '🌐',
      items: ['TOEIC 805점 (2025)', 'ADsP 데이터분석 준전문가', '학술 논문 독해', '기초 연구 영어 소통'],
    },
  ]

  return (
    <section id="skills" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="역량" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i * 80}>
            <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-250 h-full">
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
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── 과외 활동 ─────────────────────────────────────────────────
function Activities() {
  const items = [
    {
      year: '2026',
      title: 'AI시대 인간지능 컨퍼런스 참가',
      desc: 'Notion · Obsidian 기반 지식 관리, AI 활용 비즈니스 강연 수강',
    },
    {
      year: '2025',
      title: '영남대학교 화학공학부 학술동아리 A.H.A — 회장',
      desc: '자체 학술대회 기획 및 진행, 학년 간 멘토링 프로그램 운영',
    },
    {
      year: '2025',
      title: '영남대학교 Y또! 프로그램 — 멘토',
      desc: '후배 학생 대상 학업·진로 멘토링 참여',
    },
    {
      year: '2024',
      title: '영남대학교 화학공학부 학술동아리 A.H.A — 집행부장',
      desc: '동아리 운영 전반 보조',
    },
  ]

  return (
    <section id="activities" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="과외 활동" />
      <div className="space-y-4">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 80}>
            <div className="flex gap-6 group">
              <div className="w-32 shrink-0 pt-1">
                <span className="text-sm font-medium text-blue-600">{item.year}</span>
              </div>
              <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── 증명서 ────────────────────────────────────────────────────
function Certificates() {
  const files = [
    { title: '재학증명서', desc: '영남대학교 · 2026년 1학기', icon: '🎓', href: '/certificates/enrollment.pdf' },
    { title: '성적증명서', desc: '영남대학교 · 2025년 2학기', icon: '📋', href: '/certificates/transcript.pdf' },
    { title: 'TOEIC 성적표', desc: '805점 · 2025년 9월 14일', icon: '📄', href: '/certificates/toeic.pdf' },
    { title: 'DGIST 인턴 수료증', desc: 'DGIST 에너지공학과 · 2025년 하계', icon: '🏫', href: '/certificates/dgist-intern.pdf' },
  ]

  return (
    <section id="certificates" className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
      <SectionHeader title="증명서" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {files.map((f, i) => (
          <FadeIn key={f.title} delay={i * 70}>
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{f.title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── 상단으로 버튼 ──────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
      className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-90 transition-colors flex items-center justify-center"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

// ── 푸터 ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 text-center">
      <p className="text-sm text-gray-400">
        © 2026 Moon Shinui ·{' '}
        <a href="mailto:msi39670@gmail.com" className="hover:text-blue-600 transition-colors">
          msi39670@gmail.com
        </a>
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
        <ResearchInterests />
        <Skills />
        <Activities />
        <Certificates />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
