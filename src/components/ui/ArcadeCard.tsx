'use client'

import Link from 'next/link'

interface ArcadeCardProps {
    title: string
    subtitle: string
    href: string
    icon?: React.ReactNode
    color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow'
}

export default function ArcadeCard({ title, subtitle, href, icon, color = 'blue' }: ArcadeCardProps) {
    const colorClasses = {
        blue: 'border-blue-500/50 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
        green: 'border-green-500/50 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
        red: 'border-red-500/50 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
        purple: 'border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
        yellow: 'border-yellow-500/50 hover:border-yellow-500 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]',
    }

    return (
        <Link href={href} target="_blank" className={`
            group relative block p-6 bg-black/40 border border-gray-800 rounded-xl transition-all duration-300
            hover:border-opacity-100 hover:-translate-y-1 hover:shadow-xl
            ${colorClasses[color]}
        `}>
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors text-2xl">
                        {icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                        ↗
                    </div>
                </div>

                <h3 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {subtitle}
                </p>
            </div>
        </Link>
    )
}
