import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  ChevronDown
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const Header = ({ onOpenSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          <Layers size={25} strokeWidth={2.4} />
        </span>
        <span>
          <strong>LaunchPad</strong>
          <small>Revenue workspace</small>
        </span>
      </Link>

      {/* Product Navigation */}
      <nav className="product-nav" aria-label="Main navigation">
        <button
          className="nav-tool"
          aria-label="Search leads"
          title="Search leads · Ctrl / ⌘ K"
          onClick={onOpenSearch}
        >
          <Search size={18} />
          <span className="nav-tooltip">Search leads</span>
        </button>

        <span className="nav-divider" />

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-tool ${isActive ? 'active' : ''}`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon size={18} />
              <span className="nav-tooltip">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Account & Controls */}
      <div className="product-account">
        <span className="sample-label">Sample workspace</span>

        <NavLink
          className="nav-tool"
          to="/notifications"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={17} />
          <i className="unread-dot" />
        </NavLink>

        <Link className="role-control" to="/team">
          <ShieldCheck size={14} />
          <span>Admin</span>
          <span>4</span>
        </Link>

        <button
          className="account-control"
          title="Sign out / view account"
          onClick={handleLogout}
        >
          <span className="avatar mint small">SM</span>
          <span>{user?.name ? user.name.split(' ')[0] : 'Sarah'} M.</span>
          <ChevronDown size={13} />
        </button>
      </div>
    </header>
  );
};
