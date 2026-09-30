import React from 'react';
import { Badge } from '../common/Badge';
import { formatPercent } from '../../utils/formatters';
import { Mail, Shield, Activity, Award } from 'lucide-react';

export const UserCard = ({ user, onEdit }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-slate-100 font-bold text-sm border border-slate-700">
            {user.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
              {user.name}
            </h4>
            <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3 text-slate-500" />
              {user.email}
            </p>
          </div>
        </div>
        <Badge type="role" value={user.role} />
      </div>

      <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-950 rounded border border-slate-800/80 text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase">Team</span>
          <span className="text-slate-300 font-medium truncate block">{user.team}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase">Conversion Rate</span>
          <span className="text-emerald-400 font-bold block">{formatPercent(user.conversion_rate)}</span>
        </div>
      </div>

      {/* Workload Bar */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
          <span className="text-slate-400">Current Workload</span>
          <span className={user.workload > 80 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
            {user.workload}%
          </span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
          <div
            className={`h-full ${
              user.workload > 80 ? 'bg-rose-500' : user.workload > 60 ? 'bg-amber-500' : 'bg-blue-500'
            }`}
            style={{ width: `${user.workload}%` }}
          />
        </div>
      </div>

      {onEdit && (
        <button
          onClick={() => onEdit(user)}
          className="w-full mt-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition-colors"
        >
          Edit Permissions & Team
        </button>
      )}
    </div>
  );
};
