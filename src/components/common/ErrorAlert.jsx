import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorAlert = ({
  title = 'Unable to load data',
  message = 'An error occurred while connecting to the FastAPI backend service.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`p-4 bg-rose-950/40 border border-rose-800/80 rounded-lg text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300">{title}</h4>
          <p className="text-xs text-rose-200/80 mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-900/60 hover:bg-rose-900 border border-rose-700/60 text-xs font-medium text-rose-100 rounded transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};
