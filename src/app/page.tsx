'use client'

import { FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi'
import Image from 'next/image'
import { Navigation } from '@/components/ui'
import { useRef, useState, useEffect } from 'react'
import LockScreen from '@/components/LockScreen'
import Typewriter from '@/components/Typewriter'

interface MediumArticle {
  title: string
  url: string
  description: string
  date: string
  category: string
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLocked, setIsLocked] = useState(true)
  const [mediumArticles, setMediumArticles] = useState<MediumArticle[]>([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true)
  const [articlesError, setArticlesError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark') // Default dark
  const [activeActivity, setActiveActivity] = useState(0)

  const handleUnlock = () => {
    setIsLocked(false)
  }

  const fetchArticles = async () => {
    try {
      setIsLoadingArticles(true)
      setArticlesError(null)

      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        if (!controller.signal.aborted) {
          controller.abort('Request timeout after 10 seconds')
        }
      }, 10000) // 10s timeout

      const response = await fetch(`/api/medium?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      if (data.articles && data.articles.length > 0) {
        setMediumArticles(data.articles)
      } else {
        setMediumArticles([])
      }
    } catch (error) {
      console.error('Error fetching Medium articles:', error)
      // Don't show error for timeout or network issues, just fail silently
      if (error instanceof Error && error.name === 'AbortError') {
        setArticlesError('Request timed out. Please refresh to try again.')
      } else {
        setArticlesError('Unable to load articles at this time.')
      }
      setMediumArticles([])
    } finally {
      setIsLoadingArticles(false)
    }
  }

  useEffect(() => {
    if (!isLocked) {
      fetchArticles()

      // Fetch every 2 minutes for safe, real-time updates
      const interval = setInterval(() => {
        fetchArticles()
      }, 2 * 60 * 1000) // 2 minutes

      return () => clearInterval(interval)
    }
  }, [isLocked])

  // Scroll-triggered animations
  useEffect(() => {
    if (!isLocked) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)

      // Observe all sections and animated elements
      const sections = document.querySelectorAll('.fade-in-up')
      const timelineItems = document.querySelectorAll('.timeline-item')
      const cards = document.querySelectorAll('.card')

      sections.forEach((section) => observer.observe(section))
      timelineItems.forEach((item) => observer.observe(item))
      cards.forEach((card) => observer.observe(card))

      return () => observer.disconnect()
    }
  }, [isLocked])

  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const previousActivity = () => {
    setActiveActivity(prev => (prev === 0 ? activities.length - 1 : prev - 1))
  }

  const nextActivity = () => {
    setActiveActivity(prev => (prev === activities.length - 1 ? 0 : prev + 1))
  }

  const navItems = [
    { label: 'education', href: '#about' },
    { label: 'experience', href: '#experience' },
    { label: 'leadership', href: '#leadership' },
    { label: 'skills', href: '#skills' },
    { label: 'projects', href: '#projects' },
    { label: 'certifications', href: '#certifications' },
    { label: 'writing', href: '#writing' },
    { label: 'activities', href: '#activities' },
    { label: 'contact', href: '#contact' },
  ]

  const activities = [
    {
      title: 'Indonesia AI Day 2025',
      src: '/activities/ndonesia AI Day 2025  As a graduate of the Cisco Cybersecurity program through IDCamp 2024,.jpeg',
      width: 960,
      height: 1280
    },
    {
      title: 'Indonesia AI Day 2025 - Cisco Cybersecurity Graduate',
      src: '/activities/ndonesia AI Day 2025  As a graduate of the Cisco Cybersecurity program through IDCamp 2024, 2.jpeg',
      width: 1280,
      height: 960
    },
    {
      title: 'Telkom CyberFest Vol. 2 - Cyber Showdown',
      src: '/activities/Telkom CyberFest Vol. 2 - Cyber Showdown- Hack the Web or Hold the Line .jpeg',
      width: 1280,
      height: 720
    },
    {
      title: 'COMPFEST 17 - Building Digital Resilience',
      src: '/activities/Building Digital Resilience- A Practical Introduction to Cybersecurity di COMPFEST 17.jpeg',
      width: 720,
      height: 1280
    },
    {
      title: 'Alibaba Cloud Indonesia GenAI Hackathon 2025',
      src: '/activities/Alibaba Cloud Indonesia – GenAI Hackathon 2025, in partnership with GoTo.jpeg',
      width: 720,
      height: 1280
    },
    {
      title: 'Telkom AI Space Vol.2 x Generation Girl',
      src: '/activities/Telkom AI Space Vol.2 x Generation Girl- Beyond the Hype - Using AI the Right Way.jpeg',
      width: 1280,
      height: 645
    },
    {
      title: 'Telkom AI Space Vol.2 x Generation Girl - Community Moment',
      src: '/activities/Telkom AI Space Vol.2 x Generation Girl- Beyond the Hype - Using AI the Right Way 2.jpeg',
      width: 1280,
      height: 853
    },
    {
      title: 'GDG Jakarta x Women Techmakers - International Women’s Day',
      src: '/activities/GDG Jakarta and Women Techmakers for giving us a space to learn about AI and celebrate International Women\'s Day!.jpeg',
      width: 2048,
      height: 1365
    },
    {
      title: 'AWS AI Hackathon Demo Day & Community Meetup',
      src: '/activities/I attended the AWS AI Hackathon Demo Day and Community Meetup at AWS Indonesia office.jpeg',
      width: 2048,
      height: 1536
    },
    {
      title: 'Codex Community Meetup Jakarta',
      src: '/activities/Codex Community Meetup Jakarta.jpeg',
      width: 1200,
      height: 675
    },
    {
      title: 'Offline Meetup of Power BI Community Indonesia',
      src: '/activities/Offline Meetup of Power BI Community Indonesia.jpeg',
      width: 4096,
      height: 3072
    },
    {
      title: 'Offline Meetup of Power BI Community Indonesia - Community Moment',
      src: '/activities/Offline Meetup of Power BI Community Indonesia 2.jpeg',
      width: 1179,
      height: 1179
    }
  ]

  useEffect(() => {
    if (isLocked) return

    const interval = setInterval(() => {
      setActiveActivity(prev => (prev === activities.length - 1 ? 0 : prev + 1))
    }, 4500)

    return () => clearInterval(interval)
  }, [isLocked, activities.length])

  return (
    <>
      {isLocked && <LockScreen onUnlock={handleUnlock} />}

      {!isLocked && (
        <>
          <Navigation items={navItems} theme={theme} onThemeToggle={toggleTheme} />
          <div ref={containerRef} className="min-h-screen relative" style={{ zIndex: 10 }}>

            {/* Hero Section - Window Style */}
            <section className="section fade-in-up">
              <div className="container">
                <div className="window-container">
                  {/* Window Title Bar */}
                  <div className="window-titlebar">
                    <div className="window-title">PORTFOLIO.EXE</div>
                    <div className="window-controls">
                      <div className="window-control"></div>
                      <div className="window-control"></div>
                      <div className="window-control"></div>
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className="window-content">
                    {/* Profile Photo */}
                    <div className="profile-photo">
                      <Image src="/profile.jpg" alt="Profile" width={200} height={200} quality={100} priority className="w-full h-full" />
                    </div>

                    {/* Speech Bubble */}
                    <div className="speech-bubble">
                      <h2 className="text-xl font-bold mb-2 min-h-[1.5em]">
                        <Typewriter text="Hi! Welcome to my portfolio" speed={70} delay={500} />
                      </h2>
                      <p>
                        Information Systems student with a growing focus on <span className="text-accent">Security Operations (SOC)</span> and{' '}
                        <span className="text-accent">Penetration Testing</span>. Gained foundational experience in building security automation workflows.
                      </p>
                    </div>
                  </div>

                  {/* Window Info Section */}
                  <div className="window-info">
                    <div className="mb-4">
                      <p className="terminal-prompt mb-2">whoami</p>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">Zulfiana Rahmi 🌸</h1>
                      <p className="terminal-output">Cyber Security Engineer</p>
                      <p className="text-sm text-muted mt-2">Depok, West Java, Indonesia</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-4">
                        <a href="https://www.linkedin.com/in/zulfiana-rahmi" target="_blank" rel="noopener noreferrer" className="link-underline">
                          linkedin
                        </a>
                        <a href="https://github.com/zulfianarahmi" target="_blank" rel="noopener noreferrer" className="link-underline">
                          github
                        </a>
                        <a href="mailto:zulfianarahmi4@gmail.com" className="link-underline">
                          email
                        </a>
                        <a href="https://medium.com/@zulfianarahmi4" target="_blank" rel="noopener noreferrer" className="link-underline">
                          medium
                        </a>
                      </div>

                      {/* Download CV Button */}
                      <a
                        href="/Zulfiana_Rahmi_cv.pdf"
                        download="Zulfiana_Rahmi_CV.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-bg-primary font-semibold rounded hover:opacity-90 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download CV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Education Section */}
            <section id="about" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Education</h2>

                <div className="max-w-4xl">
                  <div className="card">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">Universitas Terbuka</h4>
                        <p className="text-muted text-sm mb-2">Bachelor&apos;s Degree in Information Systems</p>
                        <p className="text-xs text-muted">Sep 2022 – Present</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">SMK Al Asiyah</h4>
                        <p className="text-muted text-sm mb-2">Computer Software Engineering</p>
                        <p className="text-xs text-muted">Jun 2018 – Jun 2021</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Professional Experience Section */}
            <section id="experience" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Professional Experience</h2>

                <div className="max-w-4xl">
                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">L2 Security Intern</h3>
                      <p className="text-muted mb-1">Alto Network</p>
                      <p className="text-sm text-muted">Mar 2026 – Present</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Developed SIEM automation workflows using low-code orchestration tools to streamline alert handling, notifications, and repetitive security operations tasks</li>
                      <li>• Supported endpoint security reporting by preparing recurring EDR visibility summaries and operational findings for internal review</li>
                      <li>• Assisted with security platform administration documentation, including process notes, operational references, and division-level documentation support</li>
                      <li>• Built reminder and notification automation for cloud security posture follow-up activities, improving task tracking and response discipline</li>
                      <li>• Collaborated with security analysts and platform owners to translate operational needs into maintainable automation flows</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Cyber Security Engineer (Intern)</h3>
                      <p className="text-muted mb-1">Telkom Indonesia</p>
                      <p className="text-sm text-muted">Aug 2025 – Jan 2026</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Designed security automation workflows using workflow automation platforms to streamline cybersecurity operations</li>
                      <li>• Developed automated processes to enhance security operations monitoring and data processing workflows</li>
                      <li>• Assisted the security team in identifying and automating repetitive manual tasks to improve operational efficiency</li>
                      <li>• Awarded as a Top Mentee for Soft Skills among 200 interns for demonstrating exceptional adaptability, professional communication, and performance during the internship</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Administrative Staff</h3>
                      <p className="text-muted mb-1">PT. Satya Putra Bangsa</p>
                      <p className="text-sm text-muted">Apr 2023 – Jul 2025</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Performed rigorous cross-verification and validation of operational data to ensure 100% accuracy for organizational logistics and reporting</li>
                      <li>• Managed the secure processing and storage of sensitive organizational documents and personnel records, maintaining strict confidentiality standards</li>
                      <li>• Oversaw petty cash management and financial record-keeping, ensuring full accountability and accuracy in all transactions</li>
                      <li>• Implemented standardized digital filing systems that improved information retrieval efficiency and supported overall data organization</li>
                      <li>• Contributed to the preparation of internal reports and audit documentation, ensuring alignment with organizational protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Leadership & Programs Section */}
            <section id="leadership" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Leadership & Programs</h2>

                <div className="max-w-4xl">
                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Lead Hunter</h3>
                      <p className="text-muted mb-1">Project Ghost-Hunter - Futuremakers Youth Employability Programme</p>
                      <p className="text-sm text-muted">2026</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Led a proactive threat hunting simulation for a FinTech-inspired infrastructure</li>
                      <li>• Directed investigation workflows across ELK, Wazuh, Sysmon, Velociraptor, Zeek, Atomic Red Team, and dnscat2</li>
                      <li>• Secured 2nd place in the Standard Chartered Foundation Futuremakers Youth Employability Programme</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">AI Backend / Data Engineer</h3>
                      <p className="text-muted mb-1">Telkomathon Final Project</p>
                      <p className="text-sm text-muted">2026</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Designed the modular LLM data flow for an AI-driven learning design automation system</li>
                      <li>• Implemented document ingestion, PII sanitization, strict JSON guardrails, and final DOCX generation logic</li>
                      <li>• Secured 3rd place with a B2B SaaS prototype for corporate learning design automation</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Group Leader – Technical A</h3>
                      <p className="text-muted mb-1">Women in Tech Security Mentorship Program 2025</p>
                      <p className="text-sm text-muted">Jun 2025 – Jul 2025</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Leading Technical Group A in the cybersecurity technical track (offensive & defensive)</li>
                      <li>• Responsible for team coordination, facilitating discussions, and weekly progress updates</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Project Manager (GDG Polsri Code 1)</h3>
                      <p className="text-muted mb-1">Google APAC Community Event</p>
                      <p className="text-sm text-muted">Mar 2025 – May 2025</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Led a 3-member cross-functional team in executing a project for a Google APAC community competition</li>
                      <li>• Managed project timelines and monitored individual task progress through direct coordination to ensure on-time delivery</li>
                      <li>• Facilitated team communication and brainstorming sessions to maintain project alignment and resolve bottlenecks</li>
                      <li>• Utilized Agile-inspired workflows and tools like Jira to track team completion rates and maintain organized documentation</li>
                    </ul>
                  </div>

                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Project Manager & Backend Developer (Tim 2)</h3>
                      <p className="text-muted mb-1">Google Developer Group Bootcamp - Universitas Gunadarma</p>
                      <p className="text-sm text-muted">Mar 2025</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Led a 2-member team to develop a &quot;Notely&quot; backend service, ensuring all milestones were met within a 1-month intensive bootcamp timeline</li>
                      <li>• Contributed to the codebase by refining and editing core backend logic using Node.js and Express, ensuring the API remained functional for the team&apos;s requirements</li>
                      <li>• Managed the project&apos;s structure and coordinated daily updates to maintain development momentum and clear communication between team members</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Skills Section */}
            <section id="skills" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Skills</h2>

                <div className="grid-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm">Cybersecurity Fundamentals</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Foundational SOC Operations</li>
                      <li>• Basic Network Security & Administration</li>
                      <li>• Web Application Security Concepts (OWASP)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm">Automation & Tools</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Workflow Automation Platforms</li>
                      <li>• LLM Pipeline Design & Prompt Guardrails</li>
                      <li>• Document Processing & PII Sanitization</li>
                      <li>• Python Scripting for Task Automation</li>
                      <li>• Basic Bash Shell Scripting</li>
                      <li>• Google Cloud & Oracle Cloud Infrastructure</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm">Leadership</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Agile Project Management (Jira)</li>
                      <li>• Cross-functional Team Coordination</li>
                      <li>• Team Facilitation & Progress Tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>



            {/* Projects Section */}
            <section id="projects" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Projects</h2>

                <div className="grid-2">
                  {[
                    {
                      title: 'AI-Driven Learning Design Automation System',
                      description: 'B2B SaaS prototype for automating corporate training syllabus design using modular LLM pipelines, document ingestion, PII sanitization, and 70/20/10 learning framework compliance. Built as a Telkomathon final project and awarded 3rd place.',
                      links: [
                        { label: 'github', url: 'https://github.com/naufalrf4/telkomathon-5' },
                        { label: 'winner post', url: 'https://www.instagram.com/p/DW6CmY5kvBq/' }
                      ]
                    },
                    {
                      title: 'Project Ghost-Hunter: Hybrid Threat Hunting Experiment',
                      description: 'Led a proactive threat hunting simulation for a FinTech-inspired infrastructure, detecting multi-stage stealth attacks using LotL techniques and DNS tunneling. Built an open-source telemetry stack with ELK, Wazuh, Sysmon, Velociraptor, and Zeek, reducing detection visibility from >200 days industry dwell time to approximately 2 days. Secured 2nd place in the Standard Chartered Foundation Futuremakers Youth Employability Programme.',
                      links: [
                        { label: 'github', url: 'https://github.com/ndtsaniyah/DE_ProjectGhost-hunter/tree/main' }
                      ]
                    },
                    {
                      title: 'Web Application Penetration Testing (OWASP Juice Shop)',
                      description: 'Security assessment on OWASP Juice Shop identifying and exploiting vulnerabilities from OWASP Top 10.',
                      links: [
                        { label: 'medium', url: 'https://medium.com/@zulfianarahmi4/studi-kasus-vapt-membedah-owasp-juice-shop-39eb210b0af8' },
                        { label: 'github', url: 'https://github.com/zulfianarahmi/owasp-juice-shop-vapt-report' }
                      ]
                    },
                    {
                      title: 'Phishing Image Detection (Proof-of-Concept)',
                      description: 'Building ML model to detect phishing sites based on visual/UI using Python and Computer Vision.',
                      links: [
                        { label: 'medium', url: 'https://medium.com/@zulfianarahmi4/mendeteksi-situs-phishing-hanya-dari-tampilan-eksperimen-machine-learning-fb7308c4d27b' },
                        { label: 'colab', url: 'https://colab.research.google.com/drive/1fNftxDWd0zVc6cpSPfUllp4ZrknrzWbd?usp=sharing' }
                      ]
                    },
                    {
                      title: 'Automated External Attack Surface Discovery Suite',
                      description: 'A modular Python-based reconnaissance pipeline designed to automate the initial phases of VAPT (Vulnerability Assessment and Penetration Testing).',
                      links: [
                        { label: 'medium', url: 'https://medium.com/p/58d2382a82b9?postPublishedType=initial' }
                      ]
                    },
                    {
                      title: 'Network Penetration Testing (Lab Environment)',
                      description: 'Conducting network security assessments in controlled lab environments to identify and exploit network vulnerabilities.',
                      links: [
                        { label: 'view projects', url: '/playground' }
                      ]
                    },
                    {
                      title: 'Automated Honeypot Intelligence',
                      description: 'An automated threat intelligence collection system that combines Honeypot (as bait) with VirusTotal API v3 to perform real-time attacker IP investigation and generate visual PDF-based reports.',
                      links: [
                        { label: 'medium', url: 'https://medium.com/@zulfianarahmi4/ccb71fd165e5' }
                      ]
                    },
                    {
                      title: 'TechMateBot Cloud Assistant (Python/Telegram API)',
                      description: 'Chatbot based on Python and Telegram API for cloud computing assistant. Implementation of automation workflow and cloud resource management.',
                      links: [
                        { label: 'medium', url: 'https://medium.com/@zulfianarahmi4/techmate-chatbot-pertamaku-6ee692db7bd9' },
                        { label: 'github', url: 'https://github.com/zulfianarahmi/TechMateBot' }
                      ]
                    }
                  ].map((project, i) => (
                    <div key={i} className="card">
                      <h3 className="text-lg font-semibold mb-3">{project.title}</h3>
                      <p className="text-sm mb-4 text-muted">{project.description}</p>
                      {project.links && project.links.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link, j) => (
                            <a
                              key={j}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm link-underline"
                            >
                              {link.label} →
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* See All Projects Link */}
                <div className="text-center mt-12">
                  <a
                    href="/playground"
                    className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
                  >
                    See All Projects →
                  </a>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Certifications Section */}
            <section id="certifications" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Certifications</h2>

                <div className="grid-2 md:grid-cols-4 gap-6">
                  {/* Cybersecurity */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Cybersecurity</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• IDCamp Indosat Ooredoo Hutchison - Cybersecurity Essentials, Intermediate Level (Jun 2026 - Jun 2029)</li>
                      <li>• TryHackMe - Jr Penetration Tester Certificate (Apr 2026 - Apr 2029)</li>
                      <li>• Cisco - Junior Cybersecurity Analyst Career Path (Jun 2026)</li>
                      <li>• ID-Networkers - Cyber Security Penetration Testing Bootcamp (Apr 2026)</li>
                      <li>• Google Cybersecurity Certificate Courses - Foundations, Risk Management, and Network Security (2025)</li>
                    </ul>
                  </div>

                  {/* Cloud */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Cloud & AI</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• IDCamp Indosat Ooredoo Hutchison - Gen AI Engineer, Intermediate (Mar 2026)</li>
                      <li>• Udacity - AWS AI Practitioner Challenge (Apr 2026)</li>
                      <li>• Telkom Indonesia - Cloud Mentoring Class DCI 2025 (Jan 2026)</li>
                      <li>• Dewacloud - Certified Cloud Developer Fundamental (Dec 2025)</li>
                    </ul>
                  </div>

                  {/* Governance */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Security Governance</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• Qualys - PCI Compliance (May 2026)</li>
                      <li>• NIST - SP 800-53 Security and Privacy Controls (May 2026)</li>
                      <li>• The Linux Foundation - Understanding the OWASP® Top 10 Security Threats SKF100 (2024)</li>
                    </ul>
                  </div>

                  {/* Language */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Language</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• EF SET - English Certificate, 69/100 (Jan 2026)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Writing Section */}
            <section id="writing" className="section fade-in-up">
              <div className="container">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold section-title">Writing</h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={fetchArticles}
                      disabled={isLoadingArticles}
                      className="text-sm hover:text-accent transition-colors disabled:opacity-50"
                      title="Refresh articles"
                    >
                      {isLoadingArticles ? '⟳' : '↻'} refresh
                    </button>
                    <a
                      href="https://medium.com/@zulfianarahmi4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm link-underline"
                    >
                      view all on medium →
                    </a>
                  </div>
                </div>

                {isLoadingArticles ? (
                  <div className="text-center py-12">
                    <FiLoader className="animate-spin text-2xl mx-auto mb-4" />
                    <p className="text-sm text-muted">Loading articles...</p>
                  </div>
                ) : articlesError ? (
                  <div className="card-surface card">
                    <p className="text-sm text-muted">{articlesError}</p>
                  </div>
                ) : mediumArticles.length > 0 ? (
                  <div className="space-y-6 max-w-4xl">
                    {mediumArticles.slice(0, 5).map((article, i) => (
                      <a
                        key={i}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-b-1 pb-6 hover:border-accent transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-semibold flex-1">{article.title}</h3>
                          <span className="tag tag-accent text-xs flex-shrink-0">{article.category}</span>
                        </div>
                        <p className="text-sm text-muted mb-2">{article.description}</p>
                        <p className="text-xs text-muted">{article.date}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="card-surface card">
                    <p className="text-sm text-muted">No articles found.</p>
                  </div>
                )}
              </div>
            </section>

            <div className="divider"></div>

            {/* Activities Section */}
            <section id="activities" className="section fade-in-up">
              <div className="container">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-4 section-title">Activities & Milestones</h2>
                  <p className="text-sm text-muted max-w-2xl">
                    A small archive of communities, meetups, hackathons, and learning moments I joined along the way.
                  </p>
                </div>

                <div className="max-w-4xl">
                  <div className="card overflow-hidden p-0">
                    <div className="relative bg-surface">
                      <Image
                        src={activities[activeActivity].src}
                        alt={activities[activeActivity].title}
                        width={activities[activeActivity].width}
                        height={activities[activeActivity].height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="h-[360px] w-full object-contain"
                      />

                      <button
                        type="button"
                        onClick={previousActivity}
                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-primary/80 text-accent border-1 hover:bg-accent hover:text-bg-primary transition-colors"
                        aria-label="Previous activity"
                      >
                        <FiChevronLeft />
                      </button>

                      <button
                        type="button"
                        onClick={nextActivity}
                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-bg-primary/80 text-accent border-1 hover:bg-accent hover:text-bg-primary transition-colors"
                        aria-label="Next activity"
                      >
                        <FiChevronRight />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted">
                        {activities[activeActivity].title}
                      </p>
                      <div className="flex items-center gap-2">
                        {activities.map((activity, i) => (
                          <button
                            key={activity.title}
                            type="button"
                            onClick={() => setActiveActivity(i)}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === activeActivity ? 'bg-accent' : 'bg-muted/40 hover:bg-muted'}`}
                            aria-label={`Show ${activity.title}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider"></div>

            {/* Contact Section */}
            <section id="contact" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Contact</h2>

                <div className="max-w-2xl">
                  <p className="mb-6">Feel free to reach out for collaboration, opportunities, or just to connect.</p>

                  <div className="grid-2">
                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">Email</p>
                      <a href="mailto:zulfianarahmi4@gmail.com" className="link-underline">
                        zulfianarahmi4@gmail.com
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">Location</p>
                      <p className="text-sm">Depok, West Java, Indonesia</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">LinkedIn</p>
                      <a href="https://www.linkedin.com/in/zulfiana-rahmi" target="_blank" rel="noopener noreferrer" className="link-underline">
                        linkedin.com/in/zulfiana-rahmi
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">GitHub</p>
                      <a href="https://github.com/zulfianarahmi" target="_blank" rel="noopener noreferrer" className="link-underline">
                        github.com/zulfianarahmi
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">Medium</p>
                      <a href="https://medium.com/@zulfianarahmi4" target="_blank" rel="noopener noreferrer" className="link-underline">
                        medium.com/@zulfianarahmi4
                      </a>
                    </div>

                    <div>
                      <p className="text-sm text-muted mb-2 uppercase">TryHackMe</p>
                      <a href="https://tryhackme.com/p/zulfianarahmi4" target="_blank" rel="noopener noreferrer" className="link-underline">
                        tryhackme.com/p/zulfianarahmi4
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t-1 py-8">
              <div className="container">
                <p className="text-sm text-muted text-center">
                  © {new Date().getFullYear()} Zulfiana Rahmi. Built with Next.js.
                </p>
              </div>
            </footer>

          </div>
        </>
      )}
    </>
  )
}
