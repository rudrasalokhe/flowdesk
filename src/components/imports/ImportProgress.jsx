import React, { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import * as importsApi from '../../api/imports';
import { formatNumber } from '../../utils/formatters';
import { Loader2, CheckCircle2, AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ImportProgress = ({ jobId }) => {
  const { data: job, loading, error, retry } = useApi(
    () => importsApi.getImportStatus(jobId),
    [jobId]
  );

  // Poll status every 3 seconds if processing
  useEffect(() => {
    let timer;
    if (job && (job.status === 'PROCESSING' || job.status === 'VALIDATING' || job.status === 'UPLOADING')) {
      timer = setInterval(() => {
        retry();
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [job?.status, retry]);

  if (loading && !job) {
    return (
      <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-lg">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto mb-2" />
        <p className="text-xs font-mono text-slate-400">Polling import status from backend...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-lg text-rose-200">
        <p className="text-xs font-semibold mb-1">Failed to fetch import job state</p>
        <p className="text-xs text-rose-300">{error}</p>
        <button
          onClick={retry}
          className="mt-2 px-3 py-1 bg-rose-900 text-xs font-medium rounded hover:bg-rose-800 transition-colors"
        >
          Retry Status Poll
        </button>
      </div>
    );
  }

  if (!job) return null;

  const total = job.total_rows || 50000;
  const processed = job.processed_rows || 0;
  const percentage = job.progress_percentage || Math.round((processed / total) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              {job.file_name}
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                {job.id}
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              File Size: {job.file_size} • Uploaded {new Date(job.uploaded_at).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge value={job.status} />
          <button
            onClick={retry}
            className="p-1.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar & Numerical Counter */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-300 font-medium">Asynchronous Processing Progress</span>
          <span className="text-blue-400 font-bold">
            {formatNumber(processed)} / {formatNumber(total)} processed ({percentage}%)
          </span>
        </div>

        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Rows</span>
          <span className="text-lg font-bold font-mono text-slate-100">{formatNumber(total)}</span>
        </div>

        <div className="p-3 bg-emerald-950/20 rounded border border-emerald-900/60">
          <span className="text-[10px] font-mono text-emerald-400 uppercase block">Imported</span>
          <span className="text-lg font-bold font-mono text-emerald-300">
            {formatNumber(job.imported_rows || 0)}
          </span>
        </div>

        <div className="p-3 bg-amber-950/20 rounded border border-amber-900/60">
          <span className="text-[10px] font-mono text-amber-400 uppercase block">Duplicates</span>
          <span className="text-lg font-bold font-mono text-amber-300">
            {formatNumber(job.duplicate_rows || 0)}
          </span>
        </div>

        <div className="p-3 bg-rose-950/20 rounded border border-rose-900/60">
          <span className="text-[10px] font-mono text-rose-400 uppercase block">Invalid / Errors</span>
          <span className="text-lg font-bold font-mono text-rose-300">
            {formatNumber(job.invalid_rows || 0)}
          </span>
        </div>
      </div>

      {/* Error Breakdown Log */}
      {job.errors && job.errors.length > 0 && (
        <div className="border-t border-slate-800 pt-4">
          <h4 className="text-xs font-semibold text-rose-300 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>FastAPI Validation Errors ({job.errors.length})</span>
          </h4>
          <div className="bg-slate-950 rounded border border-slate-800 max-h-48 overflow-y-auto divide-y divide-slate-800 text-xs font-mono">
            {job.errors.map((err, i) => (
              <div key={i} className="p-2.5 flex items-center justify-between gap-2 text-slate-300">
                <span className="text-rose-400 font-semibold shrink-0">Row #{err.row}</span>
                <span className="text-slate-400 shrink-0">[{err.field}]</span>
                <span className="truncate text-slate-300 text-right">{err.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
