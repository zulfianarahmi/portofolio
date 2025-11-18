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

