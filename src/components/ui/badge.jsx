import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils'; // className 병합 유틸리티

const badgeVariants = cva(
  // 기본 스타일
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        success: 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100',
        warning: 'bg-yellow-50 text-yellow-700 border border-yellow-100 hover:bg-yellow-100',
        destructive: 'bg-red-50 text-red-700 border border-red-100 hover:bg-red-100',
        info: 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100',
        purple: 'bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100',
        gradient: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-sm active:scale-95',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false,
    },
  }
);

export const Badge = ({ 
  children, 
  variant, 
  size,
  interactive,
  className,
  icon,
  dot,
  removable,
  onRemove,
  ...props 
}) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, interactive }), className)}
      {...props}
    >
      {/* Dot indicator */}
      {dot && (
        <span className={cn(
          "mr-1.5 h-2 w-2 rounded-full",
          {
            "bg-green-400": variant === 'success',
            "bg-red-400": variant === 'destructive',
            "bg-blue-400": variant === 'info',
            "bg-yellow-400": variant === 'warning',
            "bg-gray-400": variant === 'default' || variant === 'outline',
            "bg-purple-400": variant === 'purple',
          }
        )} />
      )}

      {/* Icon */}
      {icon && (
        <span className="mr-1.5">
          {icon}
        </span>
      )}

      {/* Content */}
      {children}

      {/* Remove button */}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1.5 hover:opacity-75 transition-opacity duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </span>
  );
};