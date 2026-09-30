import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users2,
  CheckSquare,
  UploadCloud,
  BarChart3,
  UserCheck,
  Bell,
  Zap,
  PlusCircle,
  Globe
} from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/leads', label: 'Leads', icon: Users2 },
    { to: '/tasks', label: 'Follow-up Tasks', icon: CheckSquare },
    { to: '/imports', label: 'CSV Imports', icon: UploadCloud },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/team', label: 'Sales Team', icon: UserCheck },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/landing', label: 'Landing Page', icon: Globe }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-3.5rem)]">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block leading-none">
                LaunchPad
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                RevOps Platform
              </span>
            </div>
          </NavLink>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <NavLink
            to="/leads/new"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Lead</span>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="px-2 py-2 space-y-0.5">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Core Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-950/80 text-blue-300 border border-blue-800/80 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center justify-between mb-1">
          <span>Client Architecture:</span>
          <span className="text-emerald-400 font-semibold">REST Client</span>
        </div>
        <div className="text-[10px] text-slate-400">
          FastAPI & PostgreSQL Backend Spec
        </div>
      </div>
    </aside>
  );
};
