'use client'

import { motion } from 'framer-motion'
import { FiLinkedin, FiMail, FiCloud, FiShield, FiArrowRight, FiCode, FiBriefcase, FiBook, FiAward, FiUsers, FiTrendingUp, FiLock, FiActivity, FiLayers, FiGithub, FiExternalLink, FiFileText, FiLoader } from 'react-icons/fi'
import { Navigation } from '@/components/ui'
import { useRef, useState, useEffect } from 'react'
import LockScreen from '@/components/LockScreen'

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

  const handleUnlock = () => {
    setIsLocked(false)
  }

  // Fetch Medium articles function
  const fetchArticles = async () => {
    try {
      setIsLoadingArticles(true)
      setArticlesError(null)
      // Add timestamp to bypass cache for real-time updates
      const response = await fetch(`/api/medium?t=${Date.now()}`, {
        cache: 'no-store', // Force fresh fetch
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      console.log('Fetched Medium articles:', data.articles?.length || 0, 'articles')
      if (data.articles && data.articles.length > 0) {
        setMediumArticles(data.articles)
        console.log('Articles loaded:', data.articles.map((a: MediumArticle) => a.title))
      } else {
        console.warn('No articles found in response')
        setMediumArticles([])
      }
    } catch (error) {
      console.error('Error fetching Medium articles:', error)
      setArticlesError('Failed to load articles. Please try again later.')
      setMediumArticles([])
    } finally {
      setIsLoadingArticles(false)
    }
  }

  useEffect(() => {
    if (!isLocked) {
      fetchArticles()
      
      // Refresh articles every 5 minutes for real-time updates
      const interval = setInterval(() => {
        fetchArticles()
      }, 5 * 60 * 1000) // 5 minutes
      
      return () => clearInterval(interval)
    }
  }, [isLocked])

  // Helper function to get icon based on category/title
  const getArticleIcon = (article: MediumArticle) => {
    const titleLower = article.title.toLowerCase()
    const categoryLower = article.category.toLowerCase()
    
    if (categoryLower.includes('penetration') || titleLower.includes('vapt') || titleLower.includes('owasp')) {
      return { Icon: FiLock, borderClass: 'border-blue-200 dark:border-blue-800', bgClass: 'bg-blue-100 dark:bg-blue-900/50', iconClass: 'text-blue-600 dark:text-blue-400' }
    }
    if (categoryLower.includes('machine learning') || titleLower.includes('phishing') || titleLower.includes('ml')) {
      return { Icon: FiLayers, borderClass: 'border-purple-200 dark:border-purple-800', bgClass: 'bg-purple-100 dark:bg-purple-900/50', iconClass: 'text-purple-600 dark:text-purple-400' }
    }
    if (categoryLower.includes('automation') || titleLower.includes('chatbot') || titleLower.includes('telegram')) {
      return { Icon: FiCode, borderClass: 'border-pink-200 dark:border-pink-800', bgClass: 'bg-pink-100 dark:bg-pink-900/50', iconClass: 'text-pink-600 dark:text-pink-400' }
    }
    if (categoryLower.includes('security operations') || categoryLower.includes('secops') || titleLower.includes('workflow') || titleLower.includes('n8n')) {
      return { Icon: FiActivity, borderClass: 'border-blue-200 dark:border-blue-800', bgClass: 'bg-blue-100 dark:bg-blue-900/50', iconClass: 'text-blue-600 dark:text-blue-400' }
    }
    if (titleLower.includes('malware') || titleLower.includes('reverse engineering')) {
      return { Icon: FiShield, borderClass: 'border-purple-200 dark:border-purple-800', bgClass: 'bg-purple-100 dark:bg-purple-900/50', iconClass: 'text-purple-600 dark:text-purple-400' }
    }
    // Default
    return { Icon: FiFileText, borderClass: 'border-purple-200 dark:border-purple-800', bgClass: 'bg-purple-100 dark:bg-purple-900/50', iconClass: 'text-purple-600 dark:text-purple-400' }
  }

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      {isLocked && <LockScreen onUnlock={handleUnlock} />}
      
      {!isLocked && (
        <>
          <Navigation items={navItems} />
          <div ref={containerRef} className="relative min-h-screen overflow-hidden">

      {/* Asymmetric Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Cybersecurity Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div className="h-full w-full bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
          
          {/* Hexagonal Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <div className="h-full w-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff41' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
            <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] animate-[scanlines_8s_linear_infinite]"></div>
          </div>

          {/* Diagonal Background Split */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/20 via-transparent to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

          {/* Circuit Board Lines */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <path d="M0,200 Q250,150 500,200 T1000,200" stroke="rgba(0,255,65,0.3)" strokeWidth="1" fill="none" />
              <path d="M0,400 Q250,350 500,400 T1000,400" stroke="rgba(0,255,65,0.3)" strokeWidth="1" fill="none" />
              <path d="M0,600 Q250,550 500,600 T1000,600" stroke="rgba(0,255,65,0.3)" strokeWidth="1" fill="none" />
              <path d="M0,800 Q250,750 500,800 T1000,800" stroke="rgba(0,255,65,0.3)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Floating Code Snippets */}
          <div className="absolute top-20 left-10 opacity-[0.03] dark:opacity-[0.05] font-mono text-green-500 text-xs">
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {'> sudo apt-get install security'}
            </motion.div>
          </div>
          <div className="absolute bottom-40 right-20 opacity-[0.03] dark:opacity-[0.05] font-mono text-green-500 text-xs">
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              {'[OK] System secure'}
            </motion.div>
          </div>
      </div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-3xl rotate-12 blur-xl"
          animate={{ y: [0, 30, 0], rotate: [12, 18, 12] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Side - Text Content (Asymmetric) */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
      <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    Cyber Security Engineer
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ZULFIANA
                  </span>
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ml-8">
                    RAHMI
                  </span>
          </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  Depok, West Java
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed"
              >
                Passionate cybersecurity professional specializing in Security Operations (SecOps), Blue Teaming, and Cyber Defense.
              </motion.p>

              {/* Social Links - Diagonal Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="https://www.linkedin.com/in/zulfiana-rahmin"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <FiLinkedin className="text-2xl text-blue-600 dark:text-blue-400" />
                </motion.a>
                <motion.a
                  href="mailto:zulfianarahmi4@gmail.com"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <FiMail className="text-2xl text-purple-600 dark:text-purple-400" />
                </motion.a>
                <motion.a
                  href="https://github.com/zulfianarahmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700"
                >
                  <FiGithub className="text-2xl text-gray-700 dark:text-gray-300" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Elements (Asymmetric) */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Floating Cards */}
              <motion.div
                className="absolute top-0 right-0 w-64 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <FiShield className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Cybersecurity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cisco Certified</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-0 w-56 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                    <FiCloud className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Cloud & DevOps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GCP & OCI</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600">
                    <FiUsers className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Leadership</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Team Lead</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Professional Summary */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        
        {/* Cybersecurity Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        {/* Diagonal Divider */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 to-transparent transform -skew-y-1"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left - Large Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-7xl md:text-9xl font-black text-gray-200 dark:text-gray-800 leading-none">
                ABOUT
              </h2>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 transform rotate-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Professional Summary</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Passionate cybersecurity professional specializing in <span className="font-bold text-blue-600 dark:text-blue-400">Security Operations (SecOps)</span>, <span className="font-bold text-purple-600 dark:text-purple-400">Blue Teaming</span>, and <span className="font-bold text-pink-600 dark:text-pink-400">Cyber Defense</span>. I am dedicated to developing efficient, secure, and scalable systems through hands-on experience in Linux, DevOps, and scripting. My focus is on building robust defenses against modern threats, and I actively seek opportunities to collaborate and innovate in this field.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Timeline Style */}
      <section id="experience" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Professional journey & achievements</p>
          </motion.div>

          <div className="space-y-8">
            {/* Experience 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 transform -rotate-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Cyber Security Engineer (Intern)</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-1">Telkom Indonesia</p>
                  <p className="text-gray-600 dark:text-gray-400">08/2025 – Present</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/50">
                  <FiShield className="text-blue-600 dark:text-blue-400 text-3xl" />
                </div>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <FiArrowRight className="text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Developed and implemented automation workflows for SecOps tasks</span>
                </li>
              </ul>
            </motion.div>

            {/* Experience 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, x: -10 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 transform rotate-1 ml-auto max-w-6xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-900/50">
                  <FiBriefcase className="text-purple-600 dark:text-purple-400 text-3xl" />
                </div>
                <div className="text-right flex-1 ml-6">
                  <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Administrative Staff</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-1">PT. Satya Putra Bangsa</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Apr 2023 – July 2025</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-right">
                    <li>Implemented digital document management system, improving file retrieval efficiency by 30%</li>
                    <li>Generated 50+ data-driven reports with 99% accuracy</li>
                    <li>Maintained 100% financial accuracy for petty cash management</li>
                    <li>Improved company-wide data integrity from 95% to 99% within 6 months</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Experience 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-pink-200 dark:border-pink-800 transform -rotate-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">Group Leader – Technical A</h3>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-1">Women in Tech Security Mentorship Program</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">06/2025 – 07/2025</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <FiArrowRight className="text-pink-600 dark:text-pink-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Leading Technical Group A in cybersecurity technical track (offensive & defensive)</span>
                </li>
                    <li className="flex items-start">
                      <FiArrowRight className="text-pink-600 dark:text-pink-400 mr-3 mt-1 flex-shrink-0" />
                      <span>Responsible for team coordination, facilitating discussions, and weekly progress updates</span>
                </li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-pink-100 dark:bg-pink-900/50">
                  <FiUsers className="text-pink-600 dark:text-pink-400 text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Experience 4 & 5 - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500">
                    <FiTrendingUp className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Project Manager</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GDG Polsri Code 1 | Google APAC</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">03/2025 – 05/2025</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Led 3-member cross-functional team, improved task completion rate by 40% using Agile workflows</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500">
                    <FiCode className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">PM & Backend Developer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GDG Bootcamp - Gunadarma</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">03/2025</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Led 2-member team, built CRUD APIs with Node.js/Express/TypeScript, reduced task time by 25%</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Core Competencies */}
      <section id="skills" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Core Competencies
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Technical skills and expertise</p>
          </motion.div>

          {/* Staggered Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cybersecurity - Large */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="md:col-span-1 lg:col-span-2 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 transform -rotate-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <FiShield className="text-white text-3xl" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Cybersecurity Fundamentals</h3>
              </div>
              <ul className="space-y-4">
                {['Cisco Cybersecurity Certified', 'Linux Server Management (Ubuntu)', 'Basic Network Administration', 'Incident Triage & Alert Analysis', 'Log Analysis (Splunk/SIEM)'].map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-lg text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mr-4"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Cloud & DevOps */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800 transform rotate-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600">
                  <FiCloud className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Cloud & DevOps</h3>
              </div>
              <ul className="space-y-4">
                {['Python Scripting for Automation', 'Bash Shell Scripting', 'Google Cloud Platform (GCP)', 'Oracle Cloud Infrastructure'].map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Collaboration & Leadership */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="md:col-span-2 lg:col-span-1 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-pink-200 dark:border-pink-800 transform -rotate-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600">
                  <FiUsers className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400">Collaboration & Leadership</h3>
              </div>
              <ul className="space-y-4">
                {['Agile Project Management (Jira)', 'Cross-functional Team Coordination'].map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-pink-600 dark:bg-pink-400 rounded-full mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section - Technical Projects */}
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CYBERSECURITY PORTFOLIO
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Hands-on Projects & Write-ups</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { 
                name: 'VAPT: Membedah OWASP Juice Shop', 
                bullets: ['Melakukan security assessment pada OWASP Juice Shop menggunakan tools seperti Burp Suite, OWASP ZAP', 'Mengidentifikasi dan memanfaatkan vulnerability OWASP Top 10'], 
                links: [
                  { label: 'Medium Write-up', url: 'https://medium.com/@zulfianarahmi4/studi-kasus-vapt-membedah-owasp-juice-shop-39eb210b0af8', icon: FiExternalLink },
                  { label: 'GitHub Repository', url: 'https://github.com/zulfianarahmi/owasp-juice-shop-vapt-report', icon: FiGithub }
                ],
                Icon: FiLock, 
                borderClass: 'border-blue-200 dark:border-blue-800', 
                bgClass: 'bg-blue-100 dark:bg-blue-900/50', 
                iconClass: 'text-blue-600 dark:text-blue-400' 
              },
              { 
                name: 'Phishing Detection: Mendeteksi Situs Phishing dari Tampilan (Machine Learning Experiment)', 
                bullets: ['Membangun model ML untuk mendeteksi phishing berbasis visual/UI menggunakan Python dan Computer Vision', 'Eksperimen dengan Machine Learning untuk analisis tampilan website secara otomatis'], 
                links: [
                  { label: 'Medium Write-up', url: 'https://medium.com/@zulfianarahmi4/mendeteksi-situs-phishing-hanya-dari-tampilan-eksperimen-machine-learning-fb7308c4d27b', icon: FiExternalLink },
                  { label: 'Google Colab Notebook', url: 'https://colab.research.google.com/drive/1fNftxDWd0zVc6cpSPfUllp4ZrknrzWbd?usp=sharing', icon: FiCode }
                ],
                Icon: FiLayers, 
                borderClass: 'border-purple-200 dark:border-purple-800', 
                bgClass: 'bg-purple-100 dark:bg-purple-900/50', 
                iconClass: 'text-purple-600 dark:text-purple-400' 
              },
              { 
                name: 'TechMateBot Cloud Assistant', 
                bullets: ['Membangun chatbot berbasis Python dan Telegram API untuk asisten cloud computing', 'Implementasi automation workflow dan cloud resource management melalui bot interface'], 
                links: [
                  { label: 'Medium Write-up', url: 'https://medium.com/@zulfianarahmi4/techmate-chatbot-pertamaku-6ee692db7bd9', icon: FiExternalLink },
                  { label: 'GitHub Repository', url: 'https://github.com/zulfianarahmi/TechMateBot', icon: FiGithub }
                ],
                Icon: FiCode, 
                borderClass: 'border-pink-200 dark:border-pink-800', 
                bgClass: 'bg-pink-100 dark:bg-pink-900/50', 
                iconClass: 'text-pink-600 dark:text-pink-400' 
              },
              { 
                name: 'Workflow n8n Pertama: "Cyberpulse"', 
                bullets: ['Membangun workflow automation menggunakan n8n untuk cybersecurity monitoring dan alerting', 'Mengintegrasikan berbagai tools dan services untuk automated security operations'], 
                links: [
                  { label: 'Medium Write-up', url: 'https://medium.com/@zulfianarahmi4/workflow-n8n-pertama-cyberpulse-82d8c44c0d10', icon: FiExternalLink }
                ],
                Icon: FiActivity, 
                borderClass: 'border-blue-200 dark:border-blue-800', 
                bgClass: 'bg-blue-100 dark:bg-blue-900/50', 
                iconClass: 'text-blue-600 dark:text-blue-400' 
              },
            ].map((project, i) => {
              const IconComponent = project.Icon
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5, x: i % 2 === 0 ? 5 : -5 }}
                  className={`block p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 ${project.borderClass} transform ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:shadow-2xl transition-all`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-3 rounded-xl ${project.bgClass} flex-shrink-0`}>
                      <IconComponent className={`${project.iconClass} text-2xl`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.name}</h3>
                      <ul className="space-y-2 mb-4">
                        {project.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start text-gray-700 dark:text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-current rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link, j) => {
                          const LinkIcon = link.icon
                          return (
                            <motion.a
                              key={j}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 3 }}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                            >
                              <LinkIcon className="text-base" />
                              <span>{link.label}</span>
                            </motion.a>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog & Articles Section - Medium Posts */}
      <section id="blog" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Cybersecurity Background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <FiFileText className="text-white text-4xl" />
              </div>
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    BLOG & ARTICLES
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">Knowledge sharing & hands-on write-ups on Medium</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://medium.com/@zulfianarahmi4"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all"
              >
                <span>Follow on Medium</span>
                <FiExternalLink className="text-lg" />
              </motion.a>
              <motion.button
                onClick={fetchArticles}
                disabled={isLoadingArticles}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh articles"
              >
                <FiActivity className={`text-lg ${isLoadingArticles ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>
            </div>
          </motion.div>

          {isLoadingArticles ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/50"
              >
                <FiLoader className="text-4xl text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="ml-4 text-lg text-gray-600 dark:text-gray-400">Loading articles...</span>
            </div>
          ) : articlesError ? (
            <div className="text-center py-20">
              <p className="text-lg text-red-600 dark:text-red-400 mb-4">{articlesError}</p>
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                Try Again
              </motion.button>
            </div>
          ) : mediumArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 dark:text-gray-400">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumArticles.map((article, i) => {
                const { Icon: ArticleIcon, borderClass, bgClass, iconClass } = getArticleIcon(article)
                return (
                  <motion.a
                    key={article.url}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5, rotate: i % 2 === 0 ? 1 : -1 }}
                    className={`block p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 ${borderClass} transform ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:shadow-2xl transition-all h-full flex flex-col`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl ${bgClass} flex-shrink-0`}>
                        <ArticleIcon className={`${iconClass} text-2xl`} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-500">{article.date}</span>
                      <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                        <span>Read Article</span>
                        <FiArrowRight className="text-lg" />
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.a
              href="https://medium.com/@zulfianarahmi4"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <FiFileText className="text-2xl" />
              <span>View All Articles on Medium</span>
              <FiExternalLink className="text-xl" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Education
                </span>
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-blue-200 dark:border-blue-800 transform -rotate-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-blue-500">
                      <FiBook className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bachelor&apos;s Degree in Information Systems</h3>
                      <p className="text-gray-600 dark:text-gray-400">Universitas Terbuka</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">09/2022 – Present</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-purple-200 dark:border-purple-800 transform rotate-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-purple-500">
                      <FiBook className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Computer Software Engineering</h3>
                      <p className="text-gray-600 dark:text-gray-400">SMK Al Asiyah</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">06/2018 - 06/2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h2>
              <div className="space-y-4">
                {[
                  { category: 'Cybersecurity', items: ['Google - Connect and Protect: Networks and Network Security', 'Google - Foundations of Cybersecurity', 'Google - Play It Safe: Manage Security Risks', 'The Linux Foundation - Understanding OWASP® Top 10', 'Cisco - Cybersecurity Essentials'] },
                  { category: 'Cloud', items: ['Oracle Cloud Certified (2024)', 'Cisco Cybersecurity & Networking (2024)'] },
                  { category: 'Data', items: ['IBM Database Admin (2024)', 'MySQL Bootcamp (2024)', 'Python Data Analysis (2024)'] },
                  { category: 'Leadership', items: ['UNDP +LEADers (2025)'] },
                ].map((cat, i) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <FiAward className="text-purple-600 dark:text-purple-400 text-xl" />
                      <h3 className="font-bold text-gray-900 dark:text-white">{cat.category}</h3>
                </div>
                    <ul className="space-y-2">
                      {cat.items.map((item, j) => (
                        <li key={j} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Split Diagonal */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        {/* Diagonal Split */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-500/5 to-transparent transform skew-x-12"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Let&apos;s
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Connect</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Get in touch and let&apos;s collaborate
              </p>
            </motion.div>

            {/* Right - Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { Icon: FiLinkedin, label: 'LinkedIn', value: 'www.linkedin.com/in/zulfiana-rahmin', href: 'https://www.linkedin.com/in/zulfiana-rahmin', borderClass: 'border-blue-200 dark:border-blue-800', bgClass: 'bg-blue-500' },
                { Icon: FiMail, label: 'Email', value: 'zulfianarahmi4@gmail.com', href: 'mailto:zulfianarahmi4@gmail.com', borderClass: 'border-purple-200 dark:border-purple-800', bgClass: 'bg-purple-500' },
                { Icon: FiGithub, label: 'GitHub', value: 'github.com/zulfianarahmi', href: 'https://github.com/zulfianarahmi', borderClass: 'border-gray-200 dark:border-gray-800', bgClass: 'bg-gray-700' },
              ].map((contact, i) => {
                const ContactIcon = contact.Icon
                return (
            <motion.a 
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className={`flex items-center gap-6 p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border-2 ${contact.borderClass} transform hover:rotate-1 transition-all`}
                  >
                    <div className={`p-4 rounded-xl ${contact.bgClass}`}>
                      <ContactIcon className="text-white text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">{contact.label}</p>
                      <p className="text-gray-600 dark:text-gray-400">{contact.value}</p>
                    </div>
                    <FiArrowRight className="ml-auto text-gray-400 text-xl" />
            </motion.a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

        {/* Footer */}
        <footer className="relative border-t border-gray-200 dark:border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Zulfiana Rahmi. All rights reserved.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              Built with Next.js, Tailwind CSS & Untitled UI
            </p>
          </div>
          </footer>
        </div>
        </>
      )}
    </>
  )
}
