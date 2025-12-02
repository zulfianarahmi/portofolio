'use client'

import Link from 'next/link'
import ArcadeCard from '@/components/ui/ArcadeCard'
import ProjectTerminal from '@/components/ui/ProjectTerminal'
import Typewriter from '@/components/Typewriter'

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen flex flex-col pb-20">
            {/* Header */}
            <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-sm text-gray-400 hover:text-blue-400 transition-colors font-mono">
                            ← Back to Portfolio
                        </Link>
                        <div className="font-mono font-semibold text-gray-200">
                            Security Lab
                        </div>
                        <div className="w-24"></div>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 font-mono">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Security Research & Development
                        </span>
                    </h1>
                    <div className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        <p className="mb-4">
                            Explore my active security research, CTF writeups, and development projects.
                        </p>
                        <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-mono text-blue-300">
                            <span className="mr-2">⚡</span>
                            <Typewriter text="Zulfiana is currently solving challenges on..." delay={50} />
                        </div>
                    </div>
                </div>

                {/* Platforms (Training) */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ArcadeCard
                            title="LEETCODE"
                            subtitle="Algorithm & Data Structures"
                            href="https://leetcode.com/u/zulfianarahmi4/"
                            color="yellow"
                            icon={<span className="text-2xl">⚡</span>}
                        />
                        <ArcadeCard
                            title="TRYHACKME"
                            subtitle="Cybersecurity Training"
                            href="https://tryhackme.com/p/zulfianarahmi4"
                            color="red"
                            icon={<span className="text-2xl">🛡️</span>}
                        />
                        <ArcadeCard
                            title="CODEWARS"
                            subtitle="Code Challenges"
                            href="https://www.codewars.com/users/zulfianarahmi"
                            color="purple"
                            icon={<span className="text-2xl">⚔️</span>}
                        />
                    </div>
                </section>

                {/* Project Archives */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xl font-bold text-gray-200">
                            Research Archives
                        </h2>
                        <div className="h-px flex-1 bg-gray-800"></div>
                    </div>

                    <ProjectTerminal />
                </section>
            </main>
        </div>
    )
}
