import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import * as notificationsApi from '../api/notifications';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Link } from 'react-router-dom';
import { Bell, Check, SquareCheckBig, Upload, UsersRound } from 'lucide-react';

export const Notifications = () => {
  const [filterTab, setFilterTab] = useState('All'); // 'All' | 'Unread'
  const { data: notificationsData, loading, error, retry } = useApi(notificationsApi.getNotifications);

  const notifications = (notificationsData || []).filter(
    (n) => filterTab === 'All' || !n.read
  );

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsApi.markNotificationAsRead(id);
      retry();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Notifications</h1>
          <p>Lead updates, follow-up reminders, and import results.</p>
        </div>
      </div>

      <div className="notification-layout">
        {/* Tabs Row */}
        <div className="tabs-row">
          <div className="tabs">
            {['All', 'Unread'].map((tab) => (
              <button
                key={tab}
                className={filterTab === tab ? 'selected' : ''}
                onClick={() => setFilterTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Panel */}
        <Card>
          {error && <ErrorAlert title="Failed to load notifications" message={error} onRetry={retry} />}

          {loading ? (
            <LoadingSpinner label="Fetching notifications..." className="py-16" />
          ) : notifications.length === 0 ? (
            <div className="empty-state py-12 text-center">
              <Bell className="mx-auto text-muted mb-3 opacity-40" size={36} />
              <p className="text-sm font-medium text-main">No notifications found</p>
              <p className="text-xs text-muted mt-1">You are completely up to date.</p>
            </div>
          ) : (
            <div>
              {notifications.map((item) => {
                const IconComponent =
                  item.type === 'import' ? Upload : item.type === 'task' ? SquareCheckBig : UsersRound;

                return (
                  <div
                    key={item.id}
                    className={`notification-item ${item.read ? '' : 'unread'}`}
                  >
                    <span className={`notification-icon ${item.type || 'lead'}`}>
                      <IconComponent size={21} />
                    </span>

                    <div style={{ flex: 1 }}>
                      <strong>{item.title}</strong>
                      <p>{item.text || item.message}</p>
                      <div className="notification-meta">
                        <span>{item.time || item.created_at}</span>
                        <Link
                          to={
                            item.lead_id
                              ? `/leads/${item.lead_id}`
                              : item.type === 'task'
                              ? '/tasks'
                              : '/imports'
                          }
                        >
                          View {item.type === 'import' ? 'imports' : item.type || 'details'}
                        </Link>
                      </div>
                    </div>

                    {!item.read && (
                      <button
                        className="icon-button"
                        aria-label={`Mark as read: ${item.title}`}
                        onClick={() => handleMarkAsRead(item.id)}
                      >
                        <Check size={17} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <p className="notification-end">You're all caught up on recent updates.</p>
      </div>
    </div>
  );
};
