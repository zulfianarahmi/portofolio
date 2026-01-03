'use client'

import { FiLoader } from 'react-icons/fi'
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

  const navItems = [
    { label: 'about', href: '#about' },
    { label: 'experience', href: '#experience' },
    { label: 'skills', href: '#skills' },
    { label: 'projects', href: '#projects' },
    { label: 'certifications', href: '#certifications' },
    { label: 'writing', href: '#writing' },
    { label: 'contact', href: '#contact' },
  ]

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
                      <Image src="/profile.png" alt="Profile" width={120} height={120} priority />
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
                        <a href="https://www.linkedin.com/in/zulfiana-rahmin" target="_blank" rel="noopener noreferrer" className="link-underline">
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

            {/* About Section */}
            <section id="about" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">About</h2>

                <div className="max-w-4xl">
                  <div className="card">
                    <h3 className="text-xl font-semibold mb-4">Education</h3>
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

            {/* Experience Section */}
            <section id="experience" className="section fade-in-up">
              <div className="container">
                <h2 className="text-3xl font-bold mb-12 section-title">Experience</h2>

                <div className="max-w-4xl">
                  {/* Experience 1 */}
                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Cyber Security Engineer (Intern)</h3>
                      <p className="text-muted mb-1">Telkom Indonesia</p>
                      <p className="text-sm text-muted">Aug 2025 – Present</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Designed security automation workflows using workflow automation platforms to streamline cybersecurity operations</li>
                      <li>• Developed automated processes to enhance security operations monitoring and data processing workflows</li>
                      <li>• Assisted the security team in identifying and automating repetitive manual tasks to improve operational efficiency</li>
                      <li>• Awarded as a Top Mentee for Soft Skills among 200 interns for demonstrating exceptional adaptability, professional communication, and performance during the internship</li>
                    </ul>
                  </div>

                  {/* Experience 2 */}
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

                  {/* Experience 3 */}
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

                  {/* Experience 4 */}
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

                  {/* Experience 5 */}
                  <div className="timeline-item">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">Project Manager & Backend Developer (Tim 2)</h3>
                      <p className="text-muted mb-1">Google Developer Group Bootcamp - Universitas Gunardarma</p>
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
                      title: 'Malware Analysis & Reverse Engineering',
                      description: 'Analysis of malware samples and reverse engineering techniques to understand attack vectors and behavior.',
                      links: [
                        { label: 'view projects', url: '/playground' }
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
                      title: 'Applied Cryptography Analysis',
                      description: 'Research and analysis of cryptographic implementations and their security properties.',
                      links: [
                        { label: 'view projects', url: '/playground' }
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
                      <li>• Google - Connect and Protect: Networks and Network Security (Aug 2025)</li>
                      <li>• Google - Foundations of Cybersecurity (Aug 2025)</li>
                      <li>• Google - Play It Safe: Manage Security Risks (Aug 2025)</li>
                      <li>• The Linux Foundation - Understanding the OWASP® Top 10 Security Threats SKF100 (2024)</li>
                      <li>• Cisco - Cybersecurity Essentials (Jul 2024)</li>
                    </ul>
                  </div>

                  {/* Cloud */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Cloud</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• Oracle Cloud Certified (2024)</li>
                      <li>• Cisco Cybersecurity & Networking (2024)</li>
                    </ul>
                  </div>

                  {/* Data */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Data</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• IBM Database Admin (2024)</li>
                      <li>• MySQL Bootcamp (2024)</li>
                      <li>• Python Data Analysis (2024)</li>
                    </ul>
                  </div>

                  {/* Leadership */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase text-sm text-accent">Leadership</h3>
                    <ul className="space-y-3 text-sm">
                      <li>• UNDP +LEADers (2025)</li>
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
                      <a href="https://www.linkedin.com/in/zulfiana-rahmin" target="_blank" rel="noopener noreferrer" className="link-underline">
                        linkedin.com/in/zulfiana-rahmin
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
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t-1 py-8">
              <div className="container">
                <p className="text-sm text-muted text-center">
                  © 2025 Zulfiana Rahmi. Built with Next.js.
                </p>
              </div>
            </footer>

          </div>
        </>
      )}
    </>
  )
}
