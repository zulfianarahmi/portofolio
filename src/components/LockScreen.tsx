'use client'

import { useState, useEffect } from 'react'

interface LockScreenProps {
  onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [input, setInput] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onUnlock()
      } else if (e.key.length === 1) {
        setInput(prev => prev + e.key)
      } else if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1))
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onUnlock])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl w-full px-8">
        <div className="space-y-6">
          {/* Terminal Output */}
          <div className="space-y-2 text-sm">
            <p className="text-muted">$ cat /etc/portfolio/info</p>
            <p className="terminal-output">Zulfiana Rahmi</p>
            <p className="terminal-output">Cyber Security Engineer</p>
          </div>

          <div className="border-t-1 my-6"></div>

          {/* Prompt */}
          <div className="space-y-4">
            {input && (
              <p className="text-sm text-muted">
                {input}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={onUnlock}
              className="px-6 py-3 border-1 border-accent text-accent hover:bg-accent hover:text-bg transition-colors font-mono text-sm uppercase tracking-wider"
            >
              [ ACCESS SYSTEM ]
            </button>
            <p className="text-xs text-muted">
              hint: press [enter] or click button
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
