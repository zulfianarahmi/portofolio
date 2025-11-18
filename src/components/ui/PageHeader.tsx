import React from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <header className={cn('mb-12', className)}>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </header>
  );
};

