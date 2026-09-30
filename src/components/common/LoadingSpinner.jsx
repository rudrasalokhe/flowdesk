import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ label = 'Loading data...', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-slate-400 gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size] || 'w-6 h-6'} animate-spin text-blue-500`} />
      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{label}</span>
    </div>
  );
};
