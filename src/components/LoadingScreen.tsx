'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const bootSequence = [
    '[OK] Initializing system...',
    '[OK] Loading security protocols...',
    '[OK] System ready.',
    '',
    'Welcome to ZULFIANA_RAHMI Portfolio',
  ]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const line = bootSequence[currentLine]
      let charIndex = 0
      setDisplayedText('')

      const typingInterval = setInterval(() => {
        if (charIndex < line.length) {
          setDisplayedText((prev) => prev + line[charIndex])
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setDisplayedText('')
          }, currentLine === bootSequence.length - 1 ? 300 : 50)
        }
      }, 10)

      return () => clearInterval(typingInterval)
    } else {
      setTimeout(() => {
        onComplete()
      }, 100)
    }
  }, [currentLine, bootSequence, onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9998] bg-black flex items-center justify-center font-mono"
      >
        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] animate-[scanlines_8s_linear_infinite]"></div>
        </div>

        {/* Terminal Window */}
        <div className="relative z-10 w-full max-w-3xl mx-8">
          {/* Terminal Header */}
          <div className="bg-gray-900 border-2 border-green-500/50 rounded-t-lg p-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-green-500 text-sm">root@portfolio:~</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-gray-900/95 border-2 border-t-0 border-green-500/50 rounded-b-lg p-6 min-h-[400px]">
            <div className="space-y-1 text-green-500 text-sm">
              {bootSequence.slice(0, currentLine).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono"
                >
                  {line}
                </motion.div>
              ))}
              
              {currentLine < bootSequence.length && (
                <motion.div
                  key={currentLine}
                  className="font-mono"
                >
                  {displayedText}
                  <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
                </motion.div>
              )}

              {currentLine >= bootSequence.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500 font-mono"
                >
                  <span className="text-gray-500">root@portfolio</span>
                  <span className="text-green-500">:~$</span>
                  <span className="ml-2">_</span>
                </motion.div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-500 text-xs font-mono">Loading:</span>
                <div className="flex-1 h-2 bg-gray-800 border border-green-500/30 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentLine + 1) / bootSequence.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <span className="text-green-500 text-xs font-mono">
                  {Math.round(((currentLine + 1) / bootSequence.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-xs font-mono">
          <span className="text-green-500">[SYSTEM]</span>
          <span className="text-gray-500 ml-2">Initializing secure connection...</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

