import React from 'react';
import { ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

export const LeadScoreBadge = ({ score = 0, priority = 'MEDIUM', factors = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            Backend Lead Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{score}</span>
            <span className="text-slate-400 text-sm font-mono">/ 100</span>
          </div>
        </div>

        <div className="text-right">
          <Badge type="priority" value={priority} className="text-xs py-1 px-3" />
          <span className="text-[10px] text-slate-400 block mt-1">Calculated by FastAPI</span>
        </div>
      </div>

      {/* Progress meter */}
      <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-800 mb-4">
        <div
          className={`h-full transition-all duration-500 ${
            score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
          }`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>

      {/* Factors List from Backend */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <span>Backend Scoring Breakdown</span>
        </div>
        {factors && factors.length > 0 ? (
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {factors.map((factor, index) => (
              <li key={index} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/60 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400 italic">No score factor details supplied by backend.</p>
        )}
      </div>
    </div>
  );
};
