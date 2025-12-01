'use client'

import Link from 'next/link'

export default function PlaygroundPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="border-b-1">
                <div className="container">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-sm hover:text-accent transition-colors">
                            ← back
                        </Link>
                        <h1 className="font-semibold">playground</h1>
                        <div className="w-16"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Coming Soon</h2>
                        <p className="text-muted mb-8">
                            Interactive coding challenges and cybersecurity projects will be available here.
                        </p>

                        <div className="grid-2 gap-6 mt-12">
                            <div className="card text-left">
                                <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                                <p className="text-sm text-muted mb-4">
                                    Test your skills with hands-on cybersecurity challenges and CTF-style problems.
                                </p>
                                <span className="tag">coming soon</span>
                            </div>

                            <div className="card text-left">
                                <h3 className="text-lg font-semibold mb-3">Labs</h3>
                                <p className="text-sm text-muted mb-4">
                                    Explore interactive labs for penetration testing, network security, and more.
                                </p>
                                <span className="tag">coming soon</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t-1">
                <div className="container">
                    <div className="h-16 flex items-center justify-center">
                        <p className="text-sm text-muted">Under construction</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
