import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ArabicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const ArabicButton: React.FC<ArabicButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      // Size variants
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
      
      // RTL specific adjustments
      'text-right': isRTL,
      'text-left': !isRTL,
    },
    {
      // Variant styles
      'bg-pulse-500 hover:bg-pulse-600 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus:ring-pulse-500': variant === 'primary',
      'bg-transparent border border-gray-300 hover:border-pulse-500 text-gray-800 hover:text-pulse-500 focus:ring-pulse-500': variant === 'secondary',
      'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-500': variant === 'ghost',
    },
    className
  );

  return (
    <button
      className={baseClasses}
      style={{
        fontFamily: isRTL ? "'Cairo', 'Tajawal', 'Noto Kufi Arabic', sans-serif" : 'inherit',
        fontWeight: isRTL ? 600 : 'inherit',
        letterSpacing: isRTL ? '0' : 'inherit',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default ArabicButton; 