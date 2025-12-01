'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items?: NavItem[];
  className?: string;
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items = [], className, theme = 'dark', onThemeToggle }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveSection(items[i].href);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 border-b-1 no-print', className)} style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold hover:text-accent transition-colors">
            zr
          </Link>

          {items.length > 0 && (
            <div className="hidden md:flex items-center gap-6">
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
                  className={cn(
                    'text-sm transition-colors',
                    activeSection === item.href ? 'text-accent' : 'text-muted hover:text-fg'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className="text-sm hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}

            <Link
              href="/playground"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              playground
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {items.length > 0 && (
        <div className="md:hidden border-t-1 bg-surface">
          <div className="container py-3 overflow-x-auto">
            <div className="flex gap-4">
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
                  className={cn(
                    'text-sm whitespace-nowrap transition-colors',
                    activeSection === item.href ? 'text-accent' : 'text-muted'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
