'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items?: NavItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ items = [], className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* Flower Icon */}
            <div className="flex items-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-purple-600 dark:text-purple-400"
              >
                {/* Petals */}
                <path
                  d="M12 2C12 2 8 4 8 8C8 8 4 8 4 12C4 8 8 12 8 12C8 12 8 16 12 16C8 16 12 20 12 20C12 20 16 16 16 12C16 12 20 12 20 8C20 12 16 8 16 8C16 8 16 4 12 2Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                {/* Center */}
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            {items.length > 0 && (
              <div className="hidden md:flex space-x-6">
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (theme === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />)}
          </button>
        </div>
      </div>
    </nav>
  );
};

