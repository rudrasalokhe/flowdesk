import React from 'react';
import { useApi } from '../../hooks/useApi';
import * as notificationsApi from '../../api/notifications';
import { timeAgo } from '../../utils/formatters';
import { Bell, Check, CheckCheck, X, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationPanel = ({ onClose, onUpdate }) => {
  const { data: notifications, loading, retry } = useApi(notificationsApi.getNotifications, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationsApi.markNotificationAsRead(id);
      retry();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      retry();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
      {/* Panel Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold text-slate-100">System Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto divide-y divide-slate-800/80">
        {loading ? (
          <div className="p-6 text-center text-xs text-slate-400 font-mono">
            Loading notifications...
          </div>
        ) : !notifications || notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 italic">
            No notifications found.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 hover:bg-slate-800/40 transition-colors relative flex items-start gap-3 ${
                !n.read ? 'bg-blue-950/20' : ''
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  !n.read ? 'bg-blue-500 ring-2 ring-blue-500/20' : 'bg-slate-700'
                }`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{n.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {timeAgo(n.created_at)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-1.5">{n.message}</p>

                <div className="flex items-center justify-between gap-2">
                  {n.link ? (
                    <Link
                      to={n.link}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-blue-400 hover:underline"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>View details</span>
                    </Link>
                  ) : <span />}

                  {!n.read && (
                    <button
                      onClick={(e) => handleMarkAsRead(n.id, e)}
                      className="text-[10px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark read</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
