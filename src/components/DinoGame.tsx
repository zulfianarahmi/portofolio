'use client'

import { useEffect, useRef, useState } from 'react'

export default function DinoGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Game variables
        let animationId: number
        let gameScore = 0
        let gameSpeed = 3

        // Dino
        const dino = {
            x: 50,
            y: 150,
            width: 20,
            height: 20,
            dy: 0,
            gravity: 0.6,
            jumpPower: -12,
            grounded: true
        }

        // Obstacles
        const obstacles: Array<{ x: number; width: number; height: number }> = []
        let frameCount = 0

        // Get theme
        const getTheme = () => {
            return document.documentElement.getAttribute('data-theme') || 'dark'
        }

        // Jump
        const jump = () => {
            if (dino.grounded && isPlaying) {
                dino.dy = dino.jumpPower
                dino.grounded = false
            }
        }

        // Handle input
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault()
                if (!isPlaying) {
                    setIsPlaying(true)
                    gameScore = 0
                    obstacles.length = 0
                    dino.y = 150
                    dino.dy = 0
                    dino.grounded = true
                }
                jump()
            }
        }

        const handleClick = () => {
            if (!isPlaying) {
                setIsPlaying(true)
                gameScore = 0
                obstacles.length = 0
                dino.y = 150
                dino.dy = 0
                dino.grounded = true
            }
            jump()
        }

        // Game loop
        function gameLoop() {
            if (!ctx || !canvas) return

            const theme = getTheme()

            // Clear canvas
            ctx.fillStyle = theme === 'dark' ? '#0a0a0a' : '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            if (!isPlaying) {
                // Draw start screen
                ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000'
                ctx.font = '12px monospace'
                ctx.fillText('Press SPACE or Click to Start', 60, 100)
                ctx.fillText('🦖', 140, 140)
                animationId = requestAnimationFrame(gameLoop)
                return
            }

            // Update dino
            dino.dy += dino.gravity
            dino.y += dino.dy

            // Ground collision
            if (dino.y >= 150) {
                dino.y = 150
                dino.dy = 0
                dino.grounded = true
            }

            // Spawn obstacles
            frameCount++
            if (frameCount % 100 === 0) {
                obstacles.push({
                    x: canvas.width,
                    width: 15,
                    height: 20 + Math.random() * 10
                })
            }

            // Update obstacles
            for (let i = obstacles.length - 1; i >= 0; i--) {
                obstacles[i].x -= gameSpeed

                // Remove off-screen obstacles
                if (obstacles[i].x + obstacles[i].width < 0) {
                    obstacles.splice(i, 1)
                    gameScore += 10
                    setScore(gameScore)
                }

                // Collision detection
                if (
                    dino.x < obstacles[i].x + obstacles[i].width &&
                    dino.x + dino.width > obstacles[i].x &&
                    dino.y + dino.height > canvas.height - obstacles[i].height
                ) {
                    // Game over
                    setIsPlaying(false)
                }
            }

            // Increase speed over time
            if (frameCount % 500 === 0) {
                gameSpeed += 0.5
            }

            // Draw ground
            ctx.fillStyle = theme === 'dark' ? '#333333' : '#cccccc'
            ctx.fillRect(0, 170, canvas.width, 2)

            // Draw dino
            ctx.fillStyle = theme === 'dark' ? '#00ff88' : '#0066ff'
            ctx.fillText('🦖', dino.x, dino.y + dino.height)

            // Draw obstacles
            ctx.fillStyle = theme === 'dark' ? '#ff6b6b' : '#ff4444'
            obstacles.forEach(obs => {
                ctx.fillRect(obs.x, canvas.height - obs.height, obs.width, obs.height)
            })

            // Draw score
            ctx.fillStyle = theme === 'dark' ? '#888888' : '#666666'
            ctx.font = '10px monospace'
            ctx.fillText(`Score: ${gameScore}`, 10, 20)

            animationId = requestAnimationFrame(gameLoop)
        }

        window.addEventListener('keydown', handleKeyPress)
        canvas.addEventListener('click', handleClick)

        gameLoop()

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            canvas.removeEventListener('click', handleClick)
            cancelAnimationFrame(animationId)
        }
    }, [isPlaying])

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="border-2 rounded" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={180}
                    className="cursor-pointer"
                />
                <div className="px-2 py-1 text-xs text-center border-t-2" style={{ borderColor: 'var(--border)' }}>
                    <span className="text-muted">Mini Dino Game 🦖 • High Score: {score}</span>
                </div>
            </div>
        </div>
    )
}
