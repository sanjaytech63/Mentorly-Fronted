import React, { useState } from 'react';
import { BiMessageDetail } from 'react-icons/bi';
import { BsInfo, BsCheckCircle } from 'react-icons/bs';

export interface TextAreaProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    error?: string;
    label?: string;
    required?: boolean;
    className?: string;
    name?: string;
    id?: string;
    helperText?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outlined';
    size?: 'sm' | 'md' | 'lg';
    rows?: number;
    maxLength?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    showCharacterCount?: boolean;
    success?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    value = '',
    onChange,
    disabled = false,
    error,
    label,
    required = false,
    className = '',
    name,
    id,
    helperText,
    icon,
    variant = 'default',
    size = 'md',
    rows = 4,
    maxLength,
    resize = 'vertical',
    showCharacterCount = false,
    success,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const getIcon = () => {
        if (icon) return icon;

        return <BiMessageDetail className="text-gray-400" />;
    };

    const variants = {
        default: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
        filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500',
        outlined: 'border-2 border-gray-200 focus:border-indigo-500 focus:ring-0',
    };

    const sizes = {
        sm: 'py-2 px-3 text-sm',
        md: 'py-2.5 px-3',
        lg: 'py-3 px-4 text-lg',
    };

    const resizeClasses = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength && e.target.value.length > maxLength) {
            return;
        }
        onChange?.(e.target.value, e);
    };

    const characterCount = value.length;
    const isNearLimit = maxLength && characterCount > maxLength * 0.8;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className="relative rounded-md">
                {(icon) && (
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        {getIcon()}
                    </div>
                )}

                <textarea
                    id={textareaId}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    rows={rows}
                    maxLength={maxLength}
                    className={`
            block w-full rounded-md
            ${sizes[size]}
            ${icon ? 'pl-10' : 'pl-3'}
            ${resizeClasses[resize]}
            placeholder-gray-400 focus:outline-none border transition-colors duration-300
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : variants[variant]}
            ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-white'}
          `}
                />

                {showCharacterCount && maxLength && (
                    <div className="absolute bottom-2 right-2">
                        <span className={`text-xs ${characterCount > maxLength
                            ? 'text-red-500 font-semibold'
                            : isNearLimit
                                ? 'text-amber-500'
                                : 'text-gray-400'
                            }`}>
                            {characterCount}/{maxLength}
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-1 flex items-center">
                    <BsInfo className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {success && !error && (
                <div className="mt-1 flex items-center">
                    <BsCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-sm text-green-600">{success}</p>
                </div>
            )}

            {helperText && !error && !success && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

export default TextArea;