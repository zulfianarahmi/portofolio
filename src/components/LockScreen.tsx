'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiLock, FiUnlock } from 'react-icons/fi'
import { useState } from 'react'

interface LockScreenProps {
  onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleUnlock = () => {
    setIsUnlocking(true)
    setTimeout(() => {
      onUnlock()
    }, 500)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center"
      >
        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] animate-[scanlines_8s_linear_infinite]"></div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center space-y-8 px-8"
        >
          {/* Lock Icon */}
          <motion.div
            animate={{ 
              scale: isUnlocking ? [1, 1.2, 1] : 1,
              rotate: isUnlocking ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
              <div className="relative p-6 bg-gray-900/80 backdrop-blur-sm border-2 border-green-500/50 rounded-full">
                {isUnlocking ? (
                  <FiUnlock className="text-6xl text-green-500" />
                ) : (
                  <FiLock className="text-6xl text-green-500" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Username */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-green-500 font-mono tracking-wider"
            >
              ZULFIANA_RAHMI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-sm font-mono"
            >
              Cyber Security Engineer
            </motion.p>
          </div>

          {/* Unlock Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={handleUnlock}
            disabled={isUnlocking}
            className="px-8 py-3 bg-green-500/20 border-2 border-green-500/50 rounded-lg text-green-500 font-mono hover:bg-green-500/30 hover:border-green-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUnlocking ? 'UNLOCKING...' : 'UNLOCK'}
          </motion.button>
        </motion.div>

        {/* Bottom Terminal Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-xs font-mono"
        >
          <span className="text-green-500">root@portfolio</span>
          <span className="text-gray-500">:~$</span>
          <span className="text-gray-400 ml-2">system_secure</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

