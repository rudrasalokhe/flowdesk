import React from 'react';
import { formatDate, timeAgo } from '../../utils/formatters';
import { Clock, CheckCircle, UserCheck, ShieldCheck, Tag } from 'lucide-react';

export const LeadTimeline = ({ activities = [] }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-6 text-center text-xs text-slate-400 italic bg-slate-950/40 rounded border border-slate-800">
        No audit activity logged for this lead yet.
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {activities.map((item, idx) => (
        <div key={item.id || idx} className="relative group">
          {/* Dot Icon */}
          <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:border-blue-500 transition-colors">
            <CheckCircle className="w-3 h-3 fill-blue-950" />
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-xs font-semibold text-slate-100">{item.title}</h4>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {timeAgo(item.timestamp)}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-2">{item.details}</p>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-2 mt-2">
              <span>Actor: <strong className="text-slate-300">{item.actor}</strong></span>
              <span>{formatDate(item.timestamp)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
