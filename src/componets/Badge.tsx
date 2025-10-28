import React from 'react';

export type BadgeVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
    className?: string;
    onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    rounded = false,
    className = '',
    onClick,
}) => {
    const baseClasses = 'inline-flex items-center font-medium';

    const variantClasses: Record<BadgeVariant, string> = {
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
        light: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        dark: 'bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-800',
    };

    const sizeClasses: Record<BadgeSize, string> = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
    };

    const roundedClass = rounded ? 'rounded-full' : 'rounded-md';

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClass,
        onClick && 'cursor-pointer hover:opacity-80',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes} onClick={onClick}>
            {children}
        </span>
    );
};

export default Badge;