'use client'

import { motion } from 'framer-motion'
import { FiAlertTriangle, FiHome, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(255,0,64,0.03)_50%)] bg-[length:100%_4px] animate-[scanlines_8s_linear_infinite]"></div>
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,0,64,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,64,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 px-8 max-w-4xl">
        {/* Alert Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative p-6 bg-gray-900/80 backdrop-blur-sm border-2 border-red-500/50 rounded-full">
              <FiAlertTriangle className="text-8xl text-red-500" />
            </div>
          </div>
        </motion.div>

        {/* ACCESS DENIED Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-7xl md:text-9xl font-black text-red-500 font-mono tracking-wider">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              4
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              0
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >
              4
            </motion.span>
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-red-500 font-mono tracking-wider"
          >
            ACCESS DENIED
          </motion.h2>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-red-500/50 rounded-lg p-6 font-mono text-left">
            <div className="space-y-2 text-red-400 text-sm">
              <p>
                <span className="text-red-500">ERROR:</span> Page not found
              </p>
              <p>
                <span className="text-red-500">STATUS:</span> 404 - Resource unavailable
              </p>
              <p>
                <span className="text-red-500">REASON:</span> The requested URL does not exist
              </p>
              <p>
                <span className="text-red-500">TIMESTAMP:</span> {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          <p className="text-gray-400 text-lg font-mono">
            The page you are looking for has been moved, deleted, or never existed.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-500 font-mono hover:bg-red-500/30 hover:border-red-500 transition-all flex items-center gap-2"
            >
              <FiHome className="text-xl" />
              RETURN TO HOME
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-800/50 border-2 border-gray-700/50 rounded-lg text-gray-400 font-mono hover:bg-gray-800 hover:border-gray-600 hover:text-gray-300 transition-all flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            GO BACK
          </motion.button>
        </motion.div>

        {/* Terminal Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-gray-600 text-sm font-mono"
        >
          <span className="text-red-500">root@portfolio</span>
          <span className="text-gray-500">:~$</span>
          <span className="text-gray-400 ml-2">page_not_found.sh</span>
        </motion.div>
      </div>
    </div>
  )
}

