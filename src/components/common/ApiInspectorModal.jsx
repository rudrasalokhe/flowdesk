import React, { useState, useEffect } from 'react';
import { apiLogger } from '../../utils/apiLogger';
import { Terminal, CheckCircle2, AlertTriangle, X, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../../api/client';

export const ApiInspectorModal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState(apiLogger.getLogs());
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const unsubscribe = apiLogger.subscribe((newLogs) => {
      setLogs(newLogs);
      if (!selectedLog && newLogs.length > 0) {
        setSelectedLog(newLogs[0]);
      }
    });
    return unsubscribe;
  }, [selectedLog]);

  useEffect(() => {
    if (logs.length > 0 && !selectedLog) {
      setSelectedLog(logs[0]);
    }
  }, [logs, selectedLog]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              <Terminal size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                Live REST API Inspector & Telemetry
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">
                  FAANG Staff Spec
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Target Backend: <code className="text-blue-400">{API_BASE_URL}</code> · Active Token: <code className="text-emerald-400">Bearer jwt_token...</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => apiLogger.clear()}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={12} /> Clear Logs
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main 2-Column Inspector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 flex-1 min-h-0 divide-x divide-slate-800 font-mono text-xs">
          {/* Left Column: Network Logs List */}
          <div className="md:col-span-2 overflow-y-auto divide-y divide-slate-800/80 bg-slate-950">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-slate-500 italic">
                No REST API requests logged yet. Perform an action in the app to see live network traces.
              </div>
            ) : (
              logs.map((log) => {
                const isSelected = selectedLog?.id === log.id;
                const isSuccess = log.status >= 200 && log.status < 300;

                return (
                  <button
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`w-full p-3 text-left transition-colors flex items-start justify-between gap-2 ${
                      isSelected ? 'bg-blue-950/60 text-blue-200 border-l-2 border-blue-500' : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                            log.method === 'GET'
                              ? 'bg-blue-900 text-blue-300'
                              : log.method === 'POST'
                              ? 'bg-emerald-900 text-emerald-300'
                              : log.method === 'PATCH'
                              ? 'bg-amber-900 text-amber-300'
                              : 'bg-rose-900 text-rose-300'
                          }`}
                        >
                          {log.method}
                        </span>
                        <span className="text-slate-200 font-semibold truncate max-w-[150px]">
                          {log.url}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>{log.timestamp}</span>
                        <span>·</span>
                        <span>{log.duration}ms</span>
                        {log.isMock && (
                          <span className="text-amber-400 bg-amber-950/60 px-1 py-0.2 rounded border border-amber-900 text-[9px]">
                            MOCK SANDBOX
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isSuccess ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Request & Response Payload Inspector */}
          <div className="md:col-span-3 p-5 overflow-y-auto bg-slate-900 space-y-4">
            {selectedLog ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                      Endpoint Trace
                    </span>
                    <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span className="text-blue-400">{selectedLog.method}</span>
                      <span>{selectedLog.url}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-xs font-bold border ${
                        selectedLog.status >= 200 && selectedLog.status < 300
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border-rose-800'
                      }`}
                    >
                      HTTP {selectedLog.status}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Latency: {selectedLog.duration}ms
                    </span>
                  </div>
                </div>

                {/* Request Headers */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-blue-400" />
                    <span>Request Headers</span>
                  </h4>
                  <pre className="p-3 bg-slate-950 rounded border border-slate-800/80 text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{JSON.stringify(
  {
    Authorization: selectedLog.headers?.Authorization || 'Bearer jwt_access_token...',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  null,
  2
)}
                  </pre>
                </div>

                {/* Request Payload */}
                {selectedLog.body && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Request Payload (JSON)
                    </h4>
                    <pre className="p-3 bg-slate-950 rounded border border-slate-800/80 text-[11px] text-blue-300 overflow-x-auto leading-relaxed">
{JSON.stringify(selectedLog.body, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Response Payload */}
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>FastAPI Server Response</span>
                  </h4>
                  <pre className="p-3 bg-slate-950 rounded border border-slate-800/80 text-[11px] text-emerald-300 overflow-x-auto leading-relaxed max-h-64">
{JSON.stringify(selectedLog.response, null, 2)}
                  </pre>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-slate-500 italic">
                Select a network log from the left pane to inspect HTTP headers and payloads.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Decoupled REST Client · FastAPI PostgreSQL Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
