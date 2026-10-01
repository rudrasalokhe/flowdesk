import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  change,
  trend = 'up',
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            {title}
          </span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`flex items-center gap-1 font-mono font-medium ${
              trend === 'up'
                ? 'text-emerald-600 dark:text-emerald-400'
                : trend === 'down'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{change}%</span>
          </div>
        )}
        {subtitle && <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono truncate">{subtitle}</span>}
      </div>
    </div>
  );
};
