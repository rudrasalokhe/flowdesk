import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export const LeadFilters = ({ filters, onChange, onReset }) => {
  const statusOptions = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'DEMO', 'NEGOTIATION', 'WON', 'LOST'];
  const priorityOptions = ['ALL', 'HIGH', 'MEDIUM', 'LOW'];
  const sourceOptions = ['ALL', 'Demo Request', 'Outbound Email', 'LinkedIn Ad', 'Webinar', 'Partner Referral', 'Organic Search'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => onChange('search', e.target.value)}
          placeholder="Search by lead name, company, email..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Select Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <select
          value={filters.status || 'ALL'}
          onChange={(e) => onChange('status', e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">Status: All</option>
          {statusOptions.filter(s => s !== 'ALL').map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority || 'ALL'}
          onChange={(e) => onChange('priority', e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">Priority: All</option>
          {priorityOptions.filter(p => p !== 'ALL').map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={filters.source || 'ALL'}
          onChange={(e) => onChange('source', e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        >
          <option value="ALL">Source: All</option>
          {sourceOptions.filter(src => src !== 'ALL').map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1 text-xs"
          title="Reset Filters"
        >
          <X className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
