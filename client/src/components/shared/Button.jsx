import React from 'react';
import { motion } from 'framer-motion';
import  LoadingSpinner  from './LoadingSpinner';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-lg',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size="sm" text="" />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
      
      {/* Hover effect overlay */}
      {!disabled && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.button>
  );
};

export default Button;