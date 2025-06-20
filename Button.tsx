import React from 'react';
//import { DivideIcon as LucideIcon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500/50 mobile-button active:scale-95';
  
  const variantClasses = {
    primary: 'coral-gradient text-white hover:shadow-lg hover:shadow-coral-500/25 active:scale-95',
    secondary: 'glass-button text-white hover:bg-white/20',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
  };

  const sizeClasses = {
    small: 'px-4 py-3 text-sm min-h-[44px]',
    medium: 'px-5 py-3 text-base min-h-[48px]',
    large: 'px-6 py-4 text-lg min-h-[52px]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon size={20} className={children ? 'mr-2' : ''} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon size={20} className={children ? 'ml-2' : ''} />
      )}
    </button>
  );
}