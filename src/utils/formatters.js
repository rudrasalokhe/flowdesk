/**
 * Utility functions for formatting values, dates, percentages, and badge styles.
 */

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercent = (val) => {
  if (val === undefined || val === null) return '0%';
  return `${Number(val).toFixed(1)}%`;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch (e) {
    return dateString;
  }
};

export const formatDateShort = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  } catch (e) {
    return dateString;
  }
};

export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}y ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}mo ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m ago`;

  return 'just now';
};

export const getStatusBadgeStyle = (status) => {
  switch ((status || '').toUpperCase()) {
    case 'NEW':
      return 'bg-blue-950 text-blue-300 border-blue-800';
    case 'CONTACTED':
      return 'bg-indigo-950 text-indigo-300 border-indigo-800';
    case 'QUALIFIED':
      return 'bg-purple-950 text-purple-300 border-purple-800';
    case 'DEMO':
      return 'bg-pink-950 text-pink-300 border-pink-800';
    case 'NEGOTIATION':
      return 'bg-amber-950 text-amber-300 border-amber-800';
    case 'WON':
      return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    case 'LOST':
      return 'bg-rose-950 text-rose-300 border-rose-800';
    case 'COMPLETED':
      return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    case 'PENDING':
      return 'bg-amber-950 text-amber-300 border-amber-800';
    case 'OVERDUE':
      return 'bg-rose-950 text-rose-300 border-rose-800';
    case 'ACTIVE':
      return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    case 'BUSY':
      return 'bg-amber-950 text-amber-300 border-amber-800';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch ((priority || '').toUpperCase()) {
    case 'HIGH':
    case 'URGENT':
      return 'bg-rose-950/80 text-rose-300 border-rose-800 font-semibold';
    case 'MEDIUM':
      return 'bg-amber-950/80 text-amber-300 border-amber-800';
    case 'LOW':
      return 'bg-slate-800 text-slate-300 border-slate-700';
    default:
      return 'bg-slate-800 text-slate-400 border-slate-700';
  }
};

export const getRoleBadgeStyle = (role) => {
  switch ((role || '').toUpperCase()) {
    case 'ADMIN':
      return 'bg-red-950 text-red-300 border-red-800';
    case 'MANAGER':
      return 'bg-purple-950 text-purple-300 border-purple-800';
    case 'SALES':
      return 'bg-blue-950 text-blue-300 border-blue-800';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
};
