'use client'

import { useEffect, useRef } from 'react'

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Code characters (binary + katakana) and flowers
        const codeChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
        const flowerChars = ['🌼', '🌻'] // Only daisy and sunflower

        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)

        // Array of drops - one per column
        interface Drop {
            y: number
            speed: number
            char: string
            isFlower: boolean
        }

        const drops: Drop[] = []
        for (let i = 0; i < columns; i++) {
            const isFlower = Math.random() > 0.85 // 15% chance of flower
            drops[i] = {
                y: Math.random() * -100,
                speed: isFlower ? 0.5 + Math.random() * 1 : 1 + Math.random() * 2,
                char: isFlower
                    ? flowerChars[Math.floor(Math.random() * flowerChars.length)]
                    : codeChars[Math.floor(Math.random() * codeChars.length)],
                isFlower
            }
        }

        // Get current theme
        const getTheme = () => {
            return document.documentElement.getAttribute('data-theme') || 'dark'
        }

        // Draw function
        function draw() {
            if (!ctx || !canvas) return

            const theme = getTheme()

            // Semi-transparent background to create trail effect
            ctx.fillStyle = theme === 'dark'
                ? 'rgba(10, 10, 10, 0.05)'
                : 'rgba(255, 255, 255, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px monospace`

            // Draw code rain and flowers
            for (let i = 0; i < drops.length; i++) {
                const drop = drops[i]

                // Set color based on type and theme
                if (drop.isFlower) {
                    ctx.fillStyle = theme === 'dark'
                        ? 'rgba(255, 215, 0, 0.5)' // Golden yellow for dark mode
                        : 'rgba(255, 193, 7, 0.4)' // Amber for light mode
                } else {
                    ctx.fillStyle = theme === 'dark'
                        ? 'rgba(0, 255, 136, 0.12)' // Green cyber accent (very subtle)
                        : 'rgba(0, 102, 255, 0.08)' // Blue for light mode (very subtle)
                }

                ctx.fillText(drop.char, i * fontSize, drop.y)

                // Move drop down
                drop.y += drop.speed

                // Reset drop to top randomly
                if (drop.y > canvas.height && Math.random() > 0.975) {
                    const isFlower = Math.random() > 0.85
                    drops[i] = {
                        y: 0,
                        speed: isFlower ? 0.5 + Math.random() * 1 : 1 + Math.random() * 2,
                        char: isFlower
                            ? flowerChars[Math.floor(Math.random() * flowerChars.length)]
                            : codeChars[Math.floor(Math.random() * codeChars.length)],
                        isFlower
                    }
                }
            }
        }

        // Animation loop
        const interval = setInterval(draw, 50)

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}
