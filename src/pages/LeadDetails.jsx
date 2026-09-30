import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import * as leadsApi from '../api/leads';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import {
  ChevronLeft,
  Pencil,
  CircleCheck,
  Mail,
  Phone,
  Building2,
  Globe,
  Calendar,
  Clock,
  Activity,
  Check,
  Trash2,
  UserRound
} from 'lucide-react';

export const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: lead, loading, error, retry, setData: setLeadData } = useApi(
    () => leadsApi.getLead(id),
    [id]
  );

  const { data: activities, retry: refreshActivities } = useApi(
    () => leadsApi.getLeadActivity(id),
    [id]
  );

  const { data: teamMembers } = useApi(leadsApi.getLeads, []);

  if (loading && !lead) {
    return <LoadingSpinner label={`Loading Lead #${id}...`} size="lg" className="py-20" />;
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorAlert title={`Unable to load Lead #${id}`} message={error} onRetry={retry} />
      </div>
    );
  }

  if (!lead) return null;

  const handleUpdateLead = async (updateData, msg) => {
    setSubmitting(true);
    try {
      const updated = await leadsApi.updateLead(id, updateData);
      setLeadData(updated);
      setSubmitting(false);
      setActiveModal(null);
      refreshActivities();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to update lead.');
    }
  };

  const handleConvert = async () => {
    setSubmitting(true);
    try {
      const converted = await leadsApi.convertLead(id);
      setLeadData(converted);
      setSubmitting(false);
      setActiveModal(null);
      refreshActivities();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to convert lead.');
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await leadsApi.deleteLead(id);
      setSubmitting(false);
      navigate('/leads');
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to delete lead.');
    }
  };

  const stages = ['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won'];

  return (
    <div>
      {/* Back Link */}
      <Link to="/leads" className="back-link">
        <ChevronLeft size={16} /> All leads <span>/</span> #{id}
      </Link>

      {/* Header */}
      <div className="lead-heading">
        <span className={`avatar ${lead.color || 'blue'}`}>
          {lead.initials || lead.name.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <h1>{lead.name}</h1>
          <p>
            {lead.company} <span>·</span> {lead.email}
          </p>
        </div>
        <div className="heading-actions">
          <button className="button" onClick={() => setActiveModal('edit')}>
            <Pencil size={15} /> Edit lead
          </button>
          <button
            className="button primary"
            disabled={lead.status === 'Won'}
            onClick={() => setActiveModal('convert')}
          >
            <CircleCheck size={16} /> Convert lead
          </button>
        </div>
      </div>

      {/* Pipeline Status Progress Row */}
      <div className="detail-status-row">
        {stages.map((st, idx) => (
          <button
            key={st}
            className={lead.status === st ? 'current' : ''}
            onClick={() => handleUpdateLead({ status: st })}
          >
            <span>{idx + 1}</span> {st}
          </button>
        ))}
      </div>

      {/* 2-Column Detail Layout */}
      <div className="detail-layout">
        <div>
          {/* Contact & Company Details */}
          <Card
            title="Contact & company"
            action={
              <button className="button small-button" onClick={() => setActiveModal('edit')}>
                <Pencil size={13} /> Edit
              </button>
            }
          >
            <div className="detail-grid">
              <div className="detail-field">
                <span>
                  <Mail size={14} /> Email
                </span>
                <strong>{lead.email}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Phone size={14} /> Phone
                </span>
                <strong>{lead.phone || 'Not provided'}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Building2 size={14} /> Company
                </span>
                <strong>{lead.company}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Building2 size={14} /> Company size
                </span>
                <strong>{lead.company_size || 'Not provided'}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Globe size={14} /> Industry
                </span>
                <strong>{lead.industry || 'Software & technology'}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Globe size={14} /> Source
                </span>
                <strong>{lead.source}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Calendar size={14} /> Created
                </span>
                <strong>{lead.created_at}</strong>
              </div>
              <div className="detail-field">
                <span>
                  <Clock size={14} /> Updated
                </span>
                <strong>{lead.updated_at || lead.created_at}</strong>
              </div>
            </div>

            {lead.message && (
              <div className="lead-message">
                <span>Message</span>
                <p>“{lead.message}”</p>
              </div>
            )}
          </Card>

          {/* Activity Timeline */}
          <Card
            title="Activity timeline"
            subtitle="The complete story of this opportunity."
            className="activity-panel"
          >
            <div className="timeline">
              {(activities || []).map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <span className={`timeline-icon ${idx === 0 ? 'blue' : ''}`}>
                    <Activity size={15} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text || item.details}</p>
                    <span>{item.time || item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar Inspector Controls */}
        <aside>
          {/* Smart Lead Score */}
          <Card title="Lead score" action={<span className="eyebrow">QUALITY SIGNAL</span>}>
            <div className="lead-score-number">
              {lead.score}
              <span>/ 100</span>
            </div>
            <div className="score-large">
              <div className="score">
                <div style={{ width: `${lead.score}%` }}>
                  <i />
                </div>
              </div>
            </div>
            <div className="score-description">
              <Badge>{lead.priority} priority</Badge>
              <span>Backend-provided score</span>
            </div>
            <div className="score-factors">
              {(lead.score_factors || []).map((f, idx) => (
                <div key={idx}>
                  <Check size={14} />
                  <span>{typeof f === 'string' ? f : f.label}</span>
                  {f.value && <strong>+{f.value}</strong>}
                </div>
              ))}
            </div>
          </Card>

          {/* Ownership Card */}
          <Card title="Ownership" className="ownership-panel">
            <div className="owner">
              <span className="avatar blue small">
                {lead.assigned_to ? lead.assigned_to.slice(0, 2).toUpperCase() : '?'}
              </span>
              <div>
                <strong>{lead.assigned_to || 'Unassigned'}</strong>
                <span>Sales representative</span>
              </div>
            </div>
            <button className="button" onClick={() => setActiveModal('assign')}>
              Change assignee
            </button>
            <div className="property-row">
              <span>Status</span>
              <button onClick={() => setActiveModal('status')}>
                <Badge>{lead.status}</Badge>
              </button>
            </div>
            <div className="property-row">
              <span>Priority</span>
              <button onClick={() => setActiveModal('priority')}>
                <Badge>{lead.priority}</Badge>
              </button>
            </div>
          </Card>

          {/* Delete Action */}
          <button className="delete-link" onClick={() => setActiveModal('delete')}>
            <Trash2 size={14} /> Delete lead
          </button>
        </aside>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={Boolean(activeModal)}
          onClose={() => setActiveModal(null)}
          title={
            activeModal === 'edit'
              ? 'Edit lead'
              : activeModal === 'assign'
              ? 'Assign opportunity'
              : activeModal === 'status'
              ? 'Change status'
              : activeModal === 'priority'
              ? 'Change priority'
              : activeModal === 'delete'
              ? 'Delete lead?'
              : 'Convert lead?'
          }
        >
          {activeModal === 'assign' ? (
            <div className="assignment-list">
              <p className="modal-description">Select a team member for Lead #{id}:</p>
              {['Aarav Shah', 'Maya Chen', 'Jordan Lee', 'Sarah Miller'].map((name) => (
                <button
                  key={name}
                  disabled={submitting}
                  onClick={() => handleUpdateLead({ assigned_to: name }, 'Assignee updated.')}
                >
                  <span className="avatar blue small">{name.slice(0, 2).toUpperCase()}</span>
                  <div>
                    <strong>{name}</strong>
                    <span>Available · 61% workload · 18.4% conversion</span>
                  </div>
                  <Badge>Assign</Badge>
                </button>
              ))}
            </div>
          ) : ['status', 'priority', 'edit'].includes(activeModal) ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                handleUpdateLead(data, 'Lead updated.');
              }}
            >
              {activeModal === 'edit' ? (
                <div className="form-grid">
                  <label className="field">
                    <span>Name</span>
                    <input name="name" defaultValue={lead.name} required />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input name="email" type="email" defaultValue={lead.email} required />
                  </label>
                  <label className="field">
                    <span>Company</span>
                    <input name="company" defaultValue={lead.company} />
                  </label>
                  <label className="field">
                    <span>Phone</span>
                    <input name="phone" defaultValue={lead.phone} />
                  </label>
                </div>
              ) : (
                <label className="field mb-4">
                  <span>{activeModal === 'status' ? 'Status' : 'Priority'}</span>
                  <select name={activeModal} defaultValue={lead[activeModal]}>
                    {(activeModal === 'status'
                      ? ['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won', 'Lost']
                      : ['High', 'Medium', 'Low']
                    ).map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div className="form-actions">
                <button type="button" className="button" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="button primary" disabled={submitting}>
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="modal-description">
                {activeModal === 'delete'
                  ? 'Permanently delete this lead? This action cannot be undone.'
                  : 'Mark this opportunity as converted? Your backend will validate and record this change.'}
              </p>
              <div className="form-actions">
                <button className="button" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button
                  className={`button primary ${activeModal === 'delete' ? 'danger' : ''}`}
                  disabled={submitting}
                  onClick={activeModal === 'delete' ? handleDelete : handleConvert}
                >
                  {activeModal === 'delete' ? 'Delete lead' : 'Convert lead'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
