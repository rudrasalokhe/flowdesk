import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Layers,
  Search,
  LayoutGrid,
  UsersRound,
  ListTodo,
  ChartNoAxesCombined,
  ShieldCheck,
  Upload,
  Bell,
  ChevronDown,
  Terminal,
  Code2,
  Server,
  Sun,
  Moon,
  LogOut,
  User,
  Plus
} from 'lucide-react';
import { API_BASE_URL } from '../../api/client';

export const Header = ({ onOpenSearch, onOpenApiInspector, onOpenOpenApiSpec }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Workspace', icon: LayoutGrid },
    { to: '/leads', label: 'Leads', icon: UsersRound },
    { to: '/tasks', label: 'Tasks', icon: ListTodo },
    { to: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
    { to: '/team', label: 'Team', icon: ShieldCheck },
    { to: '/imports', label: 'Imports', icon: Upload }
  ];

  return (
    <header className="product-header">
      {/* Brand Logo & Title */}
      <Link className="product-brand" to="/dashboard">
        <span className="product-logo">
          <Layers size={22} strokeWidth={2.4} />
        </span>
        <div className="flex flex-col">
          <strong>Flowdesk</strong>
          <small>RevOps Intelligence</small>
        </div>
      </Link>

      {/* Global Search Quick Trigger */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="header-search-btn"
        title="Search workspace (Ctrl / ⌘ K)"
        aria-label="Search leads"
      >
        <Search size={15} className="text-slate-400 shrink-0" />
        <span className="search-placeholder">Search leads, companies...</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      {/* Primary Navigation Tabs */}
      <nav className="product-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link-tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Right Controls & User Profile */}
      <div className="product-account">
        {/* FAANG / API Showcase Tools */}
        <div className="hidden lg:flex items-center gap-1.5">
          <button
            className="header-tool-btn text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60"
            title="Live REST API Inspector"
            onClick={onOpenApiInspector}
          >
            <Terminal size={14} />
            <span className="hidden xl:inline text-xs font-medium">API</span>
          </button>

          <button
            className="header-tool-btn text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-900/60"
            title="OpenAPI / Swagger Spec"
            onClick={onOpenOpenApiSpec}
          >
            <Code2 size={14} />
            <span className="hidden xl:inline text-xs font-medium">OpenAPI</span>
          </button>
        </div>

        {/* Backend Status indicator */}
        <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>FastAPI</span>
        </div>

        {/* Quick Add Lead */}
        <Link
          to="/leads/new"
          className="header-action-btn"
          title="Create New Lead"
        >
          <Plus size={15} />
          <span className="hidden sm:inline text-xs font-semibold">New Lead</span>
        </Link>

        {/* Notifications */}
        <NavLink
          className="nav-tool"
          to="/notifications"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={17} />
          <i className="unread-dot" />
        </NavLink>

        {/* Theme Toggle (Dark / Light) */}
        <button
          className="nav-tool theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <Sun size={17} className="text-amber-400 hover:text-amber-300 transition-transform duration-200 hover:rotate-45" />
          ) : (
            <Moon size={17} className="text-slate-600 hover:text-blue-600 transition-transform duration-200 hover:-rotate-12" />
          )}
        </button>

        <span className="nav-divider" />

        {/* User Profile Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="account-control"
            title="User Profile & Settings"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
          >
            <span className="avatar mint small">
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'SM'}
            </span>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                {user?.name || 'Sarah Miller'}
              </span>
              <span className="text-[10px] text-slate-400">Admin</span>
            </div>
            <ChevronDown size={13} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="user-dropdown-menu">
              <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {user?.name || 'Sarah Miller'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {user?.email || 'sarah@flowdesk.co'}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/team"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="dropdown-item"
                >
                  <ShieldCheck size={14} />
                  <span>Team & Workloads</span>
                </Link>
                <Link
                  to="/landing"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="dropdown-item"
                >
                  <User size={14} />
                  <span>Landing Page</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 w-full"
                >
                  <LogOut size={14} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
