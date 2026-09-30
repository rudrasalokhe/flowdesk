import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import * as tasksApi from '../api/tasks';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Check,
  Pencil,
  Trash2,
  CheckSquare,
  ChevronRight,
  Clock,
  UserRound
} from 'lucide-react';

export const Tasks = () => {
  const [statusTab, setStatusTab] = useState('All tasks'); // 'All tasks' | 'Pending' | 'Overdue' | 'Completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: tasksData, loading, error, retry } = useApi(
    () => tasksApi.getTasks({ status: statusTab === 'All tasks' ? undefined : statusTab.toLowerCase() }),
    [statusTab]
  );

  let tasks = tasksData || [];

  if (statusTab !== 'All tasks') {
    tasks = tasks.filter((t) => t.status?.toLowerCase() === statusTab.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    tasks = tasks.filter(
      (t) => t.title?.toLowerCase().includes(q) || t.lead?.toLowerCase().includes(q)
    );
  }

  const handleToggleComplete = async (task) => {
    setSubmitting(true);
    try {
      await tasksApi.updateTask(task.id, { status: 'Completed' });
      setSubmitting(false);
      retry();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to update task.');
    }
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      if (activeModal.mode === 'new') {
        await tasksApi.createTask(formData);
      } else if (activeModal.mode === 'edit') {
        await tasksApi.updateTask(activeModal.id, formData);
      }
      setSubmitting(false);
      setActiveModal(null);
      retry();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to save task.');
    }
  };

  const handleDeleteTask = async () => {
    setSubmitting(true);
    try {
      await tasksApi.deleteTask(activeModal.id);
      setSubmitting(false);
      setActiveModal(null);
      retry();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to delete task.');
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Tasks</h1>
          <p>Follow-ups and upcoming work for your sales team.</p>
        </div>
        <div className="heading-actions">
          <button className="button primary" onClick={() => setActiveModal({ mode: 'new' })}>
            <Plus size={16} /> Create task
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="tabs-row">
        <div className="tabs">
          {['All tasks', 'Pending', 'Overdue', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={statusTab === tab ? 'selected' : ''}
              onClick={() => setStatusTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="muted">Follow-up workspace</span>
      </div>

      {/* Main Panel */}
      <section className="panel">
        <div className="filter-bar">
          <div className="search-input">
            <Search size={16} />
            <input
              placeholder="Search tasks or leads…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error && <ErrorAlert title="Failed to fetch tasks" message={error} onRetry={retry} />}

        <tt resource={tasksData} empty={tasks.length === 0}>
          {loading ? (
            <LoadingSpinner label="Fetching tasks..." className="py-16" />
          ) : (
            <div className="table-scroll">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Lead</th>
                    <th>Assigned to</th>
                    <th>Due date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <div className="task-title">
                          <button
                            aria-label={`Complete ${task.title}`}
                            className={`complete-button ${task.status === 'Completed' ? 'checked' : ''}`}
                            disabled={submitting || task.status === 'Completed'}
                            onClick={() => handleToggleComplete(task)}
                          >
                            {task.status === 'Completed' && <Check size={13} />}
                          </button>
                          <strong>{task.title}</strong>
                        </div>
                      </td>
                      <td>
                        <Link to={`/leads/${task.lead_id}`} className="table-person">
                          {task.lead}
                          <span>{task.company}</span>
                        </Link>
                      </td>
                      <td>
                        <span className="assignee">
                          <span className="avatar blue small">
                            {task.assigned_to ? task.assigned_to.slice(0, 2).toUpperCase() : '?'}
                          </span>
                          {task.assigned_to}
                        </span>
                      </td>
                      <td className={task.status === 'Overdue' ? 'overdue-text font-semibold' : ''}>
                        {task.due}
                      </td>
                      <td>
                        <Badge>{task.priority}</Badge>
                      </td>
                      <td>
                        <Badge>{task.status}</Badge>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-button"
                            aria-label={`Edit ${task.title}`}
                            onClick={() => setActiveModal({ mode: 'edit', ...task })}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="icon-button"
                            aria-label={`Delete ${task.title}`}
                            onClick={() => setActiveModal({ mode: 'delete', ...task })}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </tt>

        <div className="table-footer">
          <span>{tasks.length} tasks</span>
        </div>
      </section>

      {/* Task Modal */}
      {activeModal && (
        <Modal
          isOpen={Boolean(activeModal)}
          onClose={() => setActiveModal(null)}
          title={
            activeModal.mode === 'new'
              ? 'Create a follow-up'
              : activeModal.mode === 'delete'
              ? 'Delete task?'
              : 'Edit follow-up'
          }
        >
          {activeModal.mode === 'delete' ? (
            <div>
              <p className="modal-description">Permanently delete this task? This action cannot be undone.</p>
              <div className="form-actions">
                <button className="button" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button className="button primary danger" disabled={submitting} onClick={handleDeleteTask}>
                  Delete task
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveTask}>
              <label className="field mb-4">
                <span>Task title *</span>
                <input name="title" defaultValue={activeModal.title} placeholder="e.g. Follow up on pricing" required />
              </label>

              <div className="form-grid mb-4">
                <label className="field">
                  <span>Lead ID *</span>
                  <input name="lead_id" type="number" defaultValue={activeModal.lead_id || 1024} required />
                </label>
                <label className="field">
                  <span>Due date *</span>
                  <input name="due" type="date" defaultValue={activeModal.due || '2026-09-30'} required />
                </label>
                <label className="field">
                  <span>Priority</span>
                  <select name="priority" defaultValue={activeModal.priority || 'Medium'}>
                    {['High', 'Medium', 'Low'].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Assignee</span>
                  <input name="assigned_to" defaultValue={activeModal.assigned_to || 'Aarav Shah'} />
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="button" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="button primary" disabled={submitting}>
                  Save task
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
