import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import * as analyticsApi from '../api/analytics';
import * as leadsApi from '../api/leads';
import { KpiCard } from '../components/analytics/KpiCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Modal } from '../components/common/Modal';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Search,
  Plus,
  Upload,
  ExternalLink,
  Mail,
  Pencil,
  Trash2,
  CheckCircle,
  UserRound,
  Activity,
  SlidersHorizontal,
  Ellipsis,
  Clock,
  Info,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { useTheme } from '../context/ThemeContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Data fetching
  const { data: overview, loading: overviewLoading, error: overviewError, retry: retryOverview } = useApi(analyticsApi.getOverview);
  const { data: leadsOverTime } = useApi(analyticsApi.getLeadsOverTime);
  const { data: leadsBySource } = useApi(analyticsApi.getLeadsBySource);
  const { data: leadsByStatus } = useApi(analyticsApi.getLeadsByStatus);
  const { data: leadsData, retry: retryLeads } = useApi(() => leadsApi.getLeads({ limit: 12 }));

  // Interactive Workbench State
  const [queueTab, setQueueTab] = useState('all'); // 'all' | 'priority'
  const [workbenchTab, setWorkbenchTab] = useState('pipeline'); // 'pipeline' | 'insights'
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' | 'score'
  const [modalAction, setModalAction] = useState(null); // 'assign' | 'status' | 'delete' | 'convert'

  const leads = leadsData?.items || leadsData || [];

  // Set default selected lead
  useEffect(() => {
    if (!selectedLeadId && leads.length > 0) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads, selectedLeadId]);

  // Active selected lead object
  const selectedLead = leads.find((l) => String(l.id) === String(selectedLeadId)) || leads[0];

  // Filtered leads for queue & grid
  let filteredLeads = leads.filter((l) => {
    if (queueTab === 'priority' && l.priority !== 'High') return false;
    if (stageFilter && l.status !== stageFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (sortOrder === 'score') {
    filteredLeads = [...filteredLeads].sort((a, b) => b.score - a.score);
  }

  const COLORS = ['#4263eb', '#8c9ff2', '#b6c3f9', '#dce3fc'];

  if (overviewLoading && !overview) {
    return <LoadingSpinner label="Loading LaunchPad RevOps Workbench..." size="lg" className="py-20" />;
  }

  if (overviewError) {
    return (
      <div className="py-8">
        <ErrorAlert
          title="Unable to connect to FastAPI Analytics endpoints"
          message={overviewError}
          onRetry={retryOverview}
        />
      </div>
    );
  }

  return (
    <div className="workbench">
      {/* 1. LEFT COLUMN: Lead Queue */}
      <aside className="lead-queue">
        <div className="queue-tabs">
          <button
            className={queueTab === 'all' ? 'selected' : ''}
            onClick={() => setQueueTab('all')}
          >
            All leads
          </button>
          <button
            className={queueTab === 'priority' ? 'selected' : ''}
            onClick={() => setQueueTab('priority')}
          >
            High priority
          </button>
        </div>

        <div className="queue-subhead">
          <span>
            <UserRound size={14} />
            Recent <b>{filteredLeads.length}</b>
          </span>
          <label className="queue-sort">
            <select
              aria-label="Sort recent leads"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="score">Top score</option>
            </select>
            <SlidersHorizontal size={13} />
          </label>
        </div>

        <div className="queue-scroll">
          {filteredLeads.map((lead) => (
            <button
              key={lead.id}
              className={`queue-item ${selectedLeadId === lead.id ? 'selected' : ''}`}
              onClick={() => setSelectedLeadId(lead.id)}
            >
              <div className="queue-person">
                <span className={`avatar ${lead.color || 'blue'}`}>
                  {lead.initials || lead.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <strong>{lead.name}</strong>
                  <p>
                    {lead.company} · <span className="blue-text">#{lead.id}</span>
                  </p>
                </div>
                <Ellipsis size={14} />
              </div>

              <p className="queue-message">
                {lead.message || `${lead.source} lead · Assigned to ${lead.assigned_to || 'your team'}`}
              </p>

              <div className="queue-item-bottom">
                <Badge>{lead.status}</Badge>
                <span className="plain-tag">{lead.source}</span>
                <time>{lead.created_at?.slice(5)}</time>
              </div>
            </button>
          ))}
        </div>

        <div className="queue-footer">
          <div>
            <Info size={14} />
            <span>Design preview</span>
            <small>Sample data</small>
          </div>
          <div className="queue-footer-actions">
            <Link to="/leads/new">
              <Plus size={14} />
              New lead
            </Link>
            <Link to="/imports">
              <Upload size={14} />
              Import CSV
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. CENTER COLUMN: Pipeline Workspace & Insights */}
      <section className="pipeline-workspace">
        <div className="pipeline-toolbar">
          <div className="workbench-tabs">
            <button
              className={workbenchTab === 'pipeline' ? 'active' : ''}
              onClick={() => setWorkbenchTab('pipeline')}
            >
              Pipeline
            </button>
            <button
              className={workbenchTab === 'insights' ? 'active' : ''}
              onClick={() => setWorkbenchTab('insights')}
            >
              Insights
            </button>
          </div>
          <Link to="/leads" className="text-link">
            All leads <ExternalLink size={12} />
          </Link>
        </div>

        {workbenchTab === 'pipeline' ? (
          <>
            <div className="pipeline-filter">
              <div>
                <Search size={15} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities"
                  aria-label="Search opportunities"
                />
              </div>
              <select
                aria-label="Pipeline status"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="">All stages</option>
                {['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won', 'Lost'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="opportunities-scroll">
              <div className="opportunity-grid">
                {filteredLeads.map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => setSelectedLeadId(opp.id)}
                    className={`opportunity-card ${selectedLeadId === opp.id ? 'selected' : ''}`}
                  >
                    <div className="opportunity-title">
                      <strong>{opp.company}</strong>
                      <span className="plain-tag">{opp.source}</span>
                      <Ellipsis size={14} />
                    </div>
                    <div className="opportunity-person">{opp.name}</div>
                    <div className="opportunity-score">
                      {opp.score}
                      <span> / 100</span>
                    </div>
                    <div className="opportunity-status">
                      <Badge>{opp.status}</Badge>
                    </div>
                    <div className="opportunity-footer">
                      <span>{opp.assigned_to?.split(' ')[0] || 'Unassigned'}</span>
                      <span>·</span>
                      <span>{opp.created_at?.slice(5)}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pipeline-end">
                <span>{filteredLeads.length} opportunities</span>
                <span>Select a lead to view details</span>
              </div>
            </div>

            <div className="pipeline-bottom">
              <span>Acme workspace</span>
              <Link to="/analytics">View analytics</Link>
            </div>
          </>
        ) : (
          <div className="workbench-insights">
            <div className="insights-heading">
              <h2>Pipeline overview</h2>
              <span>September 2026</span>
            </div>

            <div className="metrics-grid">
              <KpiCard title="Total leads" value={overview?.total_leads?.toLocaleString()} change="12.8" />
              <KpiCard title="New" value={overview?.new_leads?.toLocaleString()} change="8.2" />
              <KpiCard title="Qualified" value={overview?.qualified_leads?.toLocaleString()} change="16.4" />
              <KpiCard title="High priority" value={overview?.high_priority_leads?.toLocaleString()} change="6.1" />
              <KpiCard title="Converted" value={overview?.converted_leads?.toLocaleString()} change="18.2" />
              <KpiCard title="Conversion" value={`${overview?.conversion_rate}%`} change="2.4" />
            </div>

            <Card title="Lead growth" className="mb-4">
              <div className="h-48 w-full p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadsOverTime || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4263eb" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#4263eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                    <XAxis dataKey="date" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
                    <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#1e293b' : '#e2e8f0', borderRadius: '8px', fontSize: '12px', color: isDark ? '#f8fafc' : '#0f172a' }} />
                    <Area type="monotone" dataKey="leads" stroke="#4263eb" strokeWidth={2} fill="url(#leadGrad)" />
                    <Area type="monotone" dataKey="qualified" stroke="#8c9ff2" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Acquisition channels">
              <div className="source-chart">
                <div className="donut">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadsBySource || []}
                        dataKey="value"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {(leadsBySource || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center">
                    <strong>{overview?.total_leads?.toLocaleString()}</strong>
                    <span>Total leads</span>
                  </div>
                </div>

                <div className="source-legend">
                  {(leadsBySource || []).map((item) => (
                    <div key={item.name}>
                      <span className="legend-dot" style={{ background: item.color || '#4263eb' }} />
                      <span>{item.name}</span>
                      <strong>{item.percent || item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>

      {/* 3. RIGHT COLUMN: Lead Inspector */}
      {selectedLead ? (
        <aside className="lead-inspector">
          <div className="inspector-heading">
            <div>
              <h2>{selectedLead.name}</h2>
              <p>
                {selectedLead.company} <span>#{selectedLead.id}</span>
              </p>
            </div>
            <div className="inspector-tools">
              <a
                className="nav-tool"
                href={`mailto:${selectedLead.email}`}
                aria-label="Email lead"
                title="Email lead"
              >
                <Mail size={15} />
              </a>
              <Link
                className="nav-tool"
                to={`/leads/${selectedLead.id}`}
                title="Open lead details"
                aria-label="Open lead details"
              >
                <Pencil size={15} />
              </Link>
              <button
                className="nav-tool"
                aria-label="Delete lead"
                title="Delete lead"
                onClick={() => setModalAction('delete')}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="inspector-date">
            <span>{selectedLead.created_at}</span>
            <span>{selectedLead.source}</span>
          </div>

          {selectedLead.priority === 'High' && (
            <div className="priority-notice">
              <Info size={14} />
              High-priority lead. Ready for follow-up.
            </div>
          )}

          <div className="inspector-scroll">
            <div className="contact-summary">
              <div>
                <span>Email</span>
                <a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a>
              </div>
              <div>
                <span>Phone</span>
                <span>{selectedLead.phone || 'Not provided'}</span>
              </div>
              <div>
                <span>Company</span>
                <span>{selectedLead.company}</span>
              </div>
              <div>
                <span>Industry</span>
                <span>{selectedLead.industry || 'Software & technology'}</span>
              </div>
            </div>

            {selectedLead.message && (
              <div className="inspector-note">
                <strong>Note</strong>
                <p>{selectedLead.message}</p>
              </div>
            )}

            <div className="inspector-section">
              <div className="inspector-section-title">
                <h3>Lead score</h3>
                <strong className="inline-score">
                  {selectedLead.score}
                  <small> / 100</small>
                </strong>
              </div>
              <div className="inspector-score-bar">
                <i style={{ width: `${selectedLead.score}%` }} />
              </div>
              {selectedLead.score_factors && selectedLead.score_factors.length > 0 ? (
                <div className="inspector-factors">
                  {selectedLead.score_factors.map((factor, idx) => (
                    <div key={idx}>
                      <span>{typeof factor === 'string' ? factor : factor.label}</span>
                      <span>{factor.value ? `+${factor.value}` : ''}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="inspector-muted">Scoring factors returned from FastAPI engine.</p>
              )}
            </div>

            <div className="inspector-switch">
              <button onClick={() => setModalAction('assign')}>
                <UserRound size={14} />
                Assign lead
              </button>
              <button onClick={() => setModalAction('status')}>
                <Activity size={14} />
                Update status
              </button>
            </div>

            <div className="contact-summary owner-summary">
              <div>
                <span>Assigned to</span>
                <span>
                  <span className="avatar blue small">
                    {selectedLead.assigned_to ? selectedLead.assigned_to.slice(0, 2).toUpperCase() : 'UN'}
                  </span>
                  {selectedLead.assigned_to || 'Unassigned'}
                </span>
              </div>
              <div>
                <span>Status</span>
                <Badge>{selectedLead.status}</Badge>
              </div>
              <div>
                <span>Priority</span>
                <Badge>{selectedLead.priority}</Badge>
              </div>
            </div>

            <div className="inspector-section recent-activity">
              <div className="inspector-section-title">
                <h3>Recent activity</h3>
                <Link to={`/leads/${selectedLead.id}`}>View all</Link>
              </div>
              <div className="compact-activity">
                <span className="activity-tick" />
                <div>
                  <strong>Lead qualified</strong>
                  <span>Today, 10:42 AM</span>
                </div>
              </div>
              <div className="compact-activity">
                <span className="activity-tick" />
                <div>
                  <strong>Assigned to {selectedLead.assigned_to || 'Aarav Shah'}</strong>
                  <span>Today, 9:18 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="inspector-bottom">
            <button
              className="button primary"
              disabled={selectedLead.status === 'Won'}
              onClick={() => setModalAction('convert')}
            >
              <CheckCircle size={14} />
              Convert lead
            </button>
            <Link to={`/leads/${selectedLead.id}`}>View details</Link>
          </div>
        </aside>
      ) : (
        <aside className="lead-inspector">
          <div className="state">
            <UserRound size={24} />
            <span>Select a lead to view details</span>
          </div>
        </aside>
      )}

      {/* Modal Actions */}
      {modalAction && (
        <Modal
          isOpen={Boolean(modalAction)}
          onClose={() => setModalAction(null)}
          title={
            modalAction === 'assign'
              ? 'Assign lead'
              : modalAction === 'status'
              ? 'Update status'
              : modalAction === 'delete'
              ? 'Delete lead?'
              : 'Convert lead?'
          }
        >
          {modalAction === 'assign' ? (
            <div className="assignment-list">
              <p className="modal-description">Choose a team member for Lead #{selectedLeadId}:</p>
              {['Aarav Shah', 'Maya Chen', 'Jordan Lee', 'Sarah Miller'].map((name) => (
                <button
                  key={name}
                  onClick={async () => {
                    await leadsApi.assignLead(selectedLeadId, 1);
                    retryLeads();
                    setModalAction(null);
                  }}
                >
                  <div className="avatar blue small">{name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <strong>{name}</strong>
                    <span>Available · 61% workload · 18.4% conversion</span>
                  </div>
                  <Badge>Assign</Badge>
                </button>
              ))}
            </div>
          ) : modalAction === 'status' ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newStatus = new FormData(e.currentTarget).get('status');
                await leadsApi.updateLead(selectedLeadId, { status: newStatus });
                retryLeads();
                setModalAction(null);
              }}
            >
              <div className="field mb-4">
                <span>Status</span>
                <select name="status" defaultValue={selectedLead?.status}>
                  {['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won', 'Lost'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="button" onClick={() => setModalAction(null)}>
                  Cancel
                </button>
                <button type="submit" className="button primary">
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="modal-description">
                {modalAction === 'delete'
                  ? `Permanently delete Lead #${selectedLeadId} (${selectedLead?.name})? This cannot be undone.`
                  : `Mark Lead #${selectedLeadId} as converted to a Closed-Won deal?`}
              </p>
              <div className="form-actions">
                <button className="button" onClick={() => setModalAction(null)}>
                  Cancel
                </button>
                <button
                  className={`button primary ${modalAction === 'delete' ? 'danger' : ''}`}
                  onClick={async () => {
                    if (modalAction === 'delete') {
                      await leadsApi.deleteLead(selectedLeadId);
                      setSelectedLeadId(null);
                    } else {
                      await leadsApi.convertLead(selectedLeadId);
                    }
                    retryLeads();
                    setModalAction(null);
                  }}
                >
                  {modalAction === 'delete' ? 'Delete lead' : 'Convert lead'}
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
