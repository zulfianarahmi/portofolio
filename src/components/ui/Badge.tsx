import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium';
    
    const variants = {
      primary: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      secondary: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
      warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300',
      error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

