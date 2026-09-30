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
    <div className={`bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-sm relative overflow-hidden ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
            {title}
          </span>
          <div className="text-2xl font-extrabold font-mono text-white tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div className="w-9 h-9 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`flex items-center gap-1 font-mono font-medium ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{change}</span>
          </div>
        )}
        {subtitle && <span className="text-slate-400 text-[11px] font-mono truncate">{subtitle}</span>}
      </div>
    </div>
  );
};
