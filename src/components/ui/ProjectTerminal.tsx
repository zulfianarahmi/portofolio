'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaMedium } from 'react-icons/fa'

interface ProjectItem {
    title: string
    github?: string
    medium?: string
}

interface ProjectCategory {
    name: string
    items: ProjectItem[]
}

const categories: ProjectCategory[] = [
    {
        name: "Malware Analysis",
        items: [
            {
                title: "Reconstructing a Bad Rabbit Ransomware Attack",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/malware-analysis/Malware%20Analysis%20Bad%20Rabbit%20Ransomware%20Attack%20Reconstruction.md",
                medium: "https://medium.com/@zulfianarahmi4/reconstructing-a-bad-rabbit-ransomware-attack-part-1-741a28ba0b6a"
            },
            {
                title: "Reverse Engineering Macro Excel with REMnux",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/malware-analysis/REMnux%20Malware%20Lab.md",
                medium: "https://medium.com/@zulfianarahmi4"
            }
        ]
    },
    {
        name: "Web Security",
        items: [
            {
                title: "VAPT & GRC Audit: OWASP Juice Shop",
                github: "https://github.com/zulfianarahmi/owasp-juice-shop-vapt-report"
            },
            {
                title: "Hands-On SQL Injection Practice",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/web-security/SQL%20Injection%20Exploitation%20Using%20SQLMap.md",
                medium: "https://medium.com/@zulfianarahmi4"
            },
            {
                title: "SQL Injection & Cookie Manipulation",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/web-security/Web%20App%20Hacking%20Bypassing%20Authentication%20%26%20Access%20Control.md",
                medium: "https://medium.com/@zulfianarahmi4/hacking-the-login-flow-legally-sql-injection-and-cookie-tricks-7c2ab55cf864"
            },
            {
                title: "Web Exploitation: PicoCTF Robots",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/web-security/Web%20Security%20Fundamentals%20Robots.txt%20Reconnaissance%20Challenge.md",
                medium: "https://medium.com/@zulfianarahmi4/web-exploitation-for-beginners-solving-where-are-the-robots-on-picoctf-10bf82c5b443"
            }
        ]
    },
    {
        name: "Network Security",
        items: [
            {
                title: "FTP/SMB/HTTP Enumeration with Metasploit",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/network-security/Network%20Penetration%20Testing%20Service%20Discovery%20%26%20Analysis.md",
                medium: "https://medium.com/@zulfianarahmi4/belajar-metasploit-dokumentasi-praktik-scan-troubleshooting-469534f22a6a"
            },
            {
                title: "Snort IDS: Custom Rules + PCAP Analysis",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/network-security/Snort%20IDS%20Guide%20Custom%20Rules%20and%20PCAP%20Forensic%20Analysis.md",
                medium: "https://medium.com/@zulfianarahmi4"
            },
            {
                title: "MS17-010 Exploitation Simulation",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/network-security/Windows%20SMB%20Vulnerability%20Exploitation%20MS17-010%20Lab.md",
                medium: "https://medium.com/@zulfianarahmi4/simulasi-eksploitasi-ms17-010-di-lingkungan-terisolasi-ee2f335b6e93"
            }
        ]
    },
    {
        name: "Penetration Testing",
        items: [
            {
                title: "Hydra: Password-Guessing Attacks",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/penetration-testing/Hydra%20SSH%20Brute%20Force%20Practice%20%26%20Analysis.md",
                medium: "https://medium.com/@zulfianarahmi4"
            }
        ]
    },
    {
        name: "Cryptography",
        items: [
            {
                title: "Cracking the Code: Journey ROT13",
                github: "https://github.com/zulfianarahmi/security-lab-walkthroughs/blob/main/cryptography/Cryptography%20Basics%20ROT13%20Decryption.md",
                medium: "https://medium.com/@zulfianarahmi4/cracking-the-code-journey-rot13-6a7c23219a8f"
            }
        ]
    },
    {
        name: "DevOps & Cloud",
        items: [
            {
                title: "Web Server Deployment (Nginx/Apache)",
                github: "https://github.com/zulfianarahmi/Simple-Web-Server-Deployment"
            },
            {
                title: "Basic Linux Administration",
                github: "https://github.com/zulfianarahmi/Basic-Linux-Administration"
            },
            {
                title: "Linux Server Monitoring & Logging",
                github: "https://github.com/zulfianarahmi/Linux-Server-Monitoring-Logging-Practice"
            },
            {
                title: "CI/CD Simulation with GitHub Actions",
                github: "https://github.com/zulfianarahmi/ci-cd-express"
            },
            {
                title: "DFG - Linux Hands-on Homework",
                github: "https://github.com/zulfianarahmi/dfg-linux-hands-on",
                medium: "https://medium.com/@zulfianarahmi4"
            }
        ]
    },
    {
        name: "Software Development",
        items: [
            {
                title: "Bloomia Web MVP",
                github: "https://github.com/zulfianarahmi/bloomia-web"
            },
            {
                title: "TechMateBot (Cloud/DevOps Assistant)",
                github: "https://github.com/zulfianarahmi/TechMateBot",
                medium: "https://medium.com/@zulfianarahmi4/techmate-chatbot-pertamaku-6ee692db7bd9"
            },
            {
                title: "Eduquiz App",
                github: "https://github.com/zulfianarahmi/eduquiz-app"
            },
            {
                title: "Python Projects Collection",
                github: "https://github.com/zulfianarahmi/python-projects"
            }
        ]
    },
    {
        name: "Data Science",
        items: [
            {
                title: "Cardiovascular Health EDA",
                github: "https://github.com/zulfianarahmi/Data-Analysis-and-Science-Portfolio/blob/main/Insights%20into%20Cardiovascular%20Health%20EDA%20Project/Exploratory%20Data%20Analysis%20(EDA)%20for%20Heart%20Disease%20Prediction.ipynb"
            },
            {
                title: "Disease Cases Visualization (West Java)",
                github: "https://github.com/zulfianarahmi/Data-Analysis-and-Science-Portfolio"
            },
            {
                title: "Restaurant Reservation DB Design",
                github: "https://github.com/zulfianarahmi/Data-Analysis-and-Science-Portfolio/tree/main/restaurant_reservation_database_design"
            },
            {
                title: "Accreditation Data Analysis (R)",
                github: "https://github.com/zulfianarahmi/Data-Analysis-and-Science-Portfolio/tree/main/R%20Language/"
            },
            {
                title: "User Reviews Analysis",
                github: "https://github.com/zulfianarahmi/Data-Project/tree/main"
            },
            {
                title: "Data Collection to CRM",
                github: "https://github.com/zulfianarahmi/Data_Collection_to_CRM_Project"
            }
        ]
    }
]

export default function ProjectTerminal() {
    const [expanded, setExpanded] = useState<string | null>("Malware Analysis")

    const toggleCategory = (name: string) => {
        setExpanded(expanded === name ? null : name)
    }

    return (
        <div className="w-full max-w-5xl mx-auto font-mono text-sm">
            {/* Terminal Window */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
                {/* Title Bar */}
                <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-gray-500 text-xs">zulfiana@portfolio:~/projects</div>
                    <div className="w-16" />
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row min-h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 border-r border-gray-800 bg-black/20">
                        <div className="p-4">
                            <div className="mb-4 text-gray-500 text-xs font-bold uppercase tracking-wider">Directories</div>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => toggleCategory(cat.name)}
                                        className={`
                                            w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-all duration-200
                                            ${expanded === cat.name
                                                ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500'
                                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent'}
                                        `}
                                    >
                                        <span className="text-xs">{expanded === cat.name ? '📂' : '📁'}</span>
                                        <span className="truncate font-medium">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main View Area */}
                    <div className="flex-1 bg-[#0c0c0c] p-6 overflow-y-auto">
                        {expanded ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 mb-8 text-gray-500 border-b border-gray-800 pb-4">
                                    <span className="text-blue-400">~/projects/{expanded.toLowerCase().replace(/ /g, '-')}</span>
                                    <span className="animate-pulse">_</span>
                                </div>

                                <div className="grid gap-4">
                                    {categories.find(c => c.name === expanded)?.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="group relative p-4 border border-gray-800 bg-black/40 rounded-lg hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="mt-1 text-blue-500/50 group-hover:text-blue-400 transition-colors">📄</span>
                                                    <div>
                                                        <h3 className="text-gray-200 font-medium group-hover:text-blue-300 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                            {item.github && (
                                                                <Link
                                                                    href={item.github}
                                                                    target="_blank"
                                                                    className="flex items-center gap-1 hover:text-white transition-colors"
                                                                >
                                                                    <FaGithub /> GitHub
                                                                </Link>
                                                            )}
                                                            {item.medium && (
                                                                <Link
                                                                    href={item.medium}
                                                                    target="_blank"
                                                                    className="flex items-center gap-1 hover:text-white transition-colors"
                                                                >
                                                                    <FaMedium /> Medium
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {item.github && (
                                                        <Link
                                                            href={item.github}
                                                            target="_blank"
                                                            className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs border border-white/10 hover:border-white/20 transition-all"
                                                        >
                                                            View Code
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                <div className="text-4xl mb-4 opacity-20">⚡</div>
                                <p>Select a category to view project files</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
