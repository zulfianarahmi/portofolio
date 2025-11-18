import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div className={cn('mb-8', className)}>
      <h2 className={cn('text-2xl font-semibold text-gray-900 dark:text-white mb-2', titleClassName)}>
        {title}
      </h2>
      {description && (
        <p className={cn('text-gray-600 dark:text-gray-400 text-base', descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
};

