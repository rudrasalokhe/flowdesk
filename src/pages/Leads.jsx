import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import * as leadsApi from '../api/leads';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';
import { Link } from 'react-router-dom';
import {
  Plus,
  Upload,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  List,
  Columns3,
  ChevronDown
} from 'lucide-react';

export const Leads = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'board'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const pageSize = 8;

  const { data: leadsResponse, loading, error, retry } = useApi(
    () =>
      leadsApi.getLeads({
        page: currentPage,
        limit: pageSize,
        search: searchQuery,
        status: statusFilter,
        priority: priorityFilter,
        source: sourceFilter,
        assigned_to: salespersonFilter,
        sort_by: sortBy,
        sort_order: sortOrder
      }),
    [currentPage, searchQuery, statusFilter, sourceFilter, priorityFilter, salespersonFilter, sortBy, sortOrder]
  );

  const leads = leadsResponse?.items || leadsResponse || [];
  const totalCount = leadsResponse?.total || leads.length;

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSourceFilter('');
    setPriorityFilter('');
    setSalespersonFilter('');
    setCurrentPage(1);
  };

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('desc');
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Leads</h1>
          <p>Search, review, and manage your lead pipeline.</p>
        </div>
        <div className="heading-actions">
          <Link className="button" to="/imports">
            <Upload size={16} />
            Import leads
          </Link>
          <Link className="button primary" to="/leads/new">
            <Plus size={16} />
            Create lead
          </Link>
        </div>
      </div>

      {/* Tabs Row & View Toggle */}
      <div className="tabs-row">
        <div className="tabs">
          {[
            ['All leads', ''],
            ['Qualified', 'Qualified'],
            ['Won', 'Won']
          ].map(([label, val]) => (
            <button
              key={label}
              className={statusFilter === val ? 'selected' : ''}
              onClick={() => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
            >
              {label}
              {val === '' && <span>{totalCount}</span>}
            </button>
          ))}
        </div>

        <div className="segmented">
          <button
            className={viewMode === 'table' ? 'selected' : ''}
            onClick={() => setViewMode('table')}
            aria-label="Table view"
          >
            <List size={17} />
          </button>
          <button
            className={viewMode === 'board' ? 'selected' : ''}
            onClick={() => setViewMode('board')}
            aria-label="Pipeline board view"
          >
            <Columns3 size={17} />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <section className="panel">
        <div className="filter-bar">
          <div className="search-input">
            <Search size={16} />
            <input
              placeholder="Search leads by name, company, email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="select-wrap">
            <select
              aria-label="Status filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All statuses</option>
              {['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won', 'Lost'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown size={13} />
          </div>

          <div className="select-wrap">
            <select
              aria-label="Source filter"
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All sources</option>
              {['Website', 'LinkedIn', 'Referral', 'CSV import'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown size={13} />
          </div>

          <div className="select-wrap">
            <select
              aria-label="Priority filter"
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All priorities</option>
              {['High', 'Medium', 'Low'].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown size={13} />
          </div>

          {(searchQuery || statusFilter || sourceFilter || priorityFilter || salespersonFilter) && (
            <button className="text-link" onClick={handleResetFilters}>
              Clear
            </button>
          )}
        </div>

        {/* Error / Loading State */}
        {error && <ErrorAlert title="Failed to fetch leads" message={error} onRetry={retry} />}

        <tt resource={leadsResponse} empty={leads.length === 0}>
          {loading ? (
            <LoadingSpinner label="Fetching lead records..." className="py-16" />
          ) : viewMode === 'table' ? (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      <button className="table-sort" onClick={() => toggleSort('name')}>
                        Name <ArrowUpDown size={13} />
                      </button>
                    </th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Source</th>
                    <th>
                      <button className="table-sort" onClick={() => toggleSort('score')}>
                        Score <ArrowUpDown size={13} />
                      </button>
                    </th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned to</th>
                    <th>Created</th>
                    <th>
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="muted">#{lead.id}</td>
                      <td>
                        <Link to={`/leads/${lead.id}`} className="person">
                          <span className={`avatar ${lead.color || 'blue'} small`}>
                            {lead.initials || lead.name.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <strong>{lead.name}</strong>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <span className="company-name">{lead.company}</span>
                      </td>
                      <td className="muted">{lead.email}</td>
                      <td>
                        <span className="source-name">{lead.source}</span>
                      </td>
                      <td>
                        <span className={lead.score >= 80 ? 'score-high font-semibold' : ''}>
                          {lead.score}
                        </span>
                      </td>
                      <td>
                        <Badge>{lead.priority}</Badge>
                      </td>
                      <td>
                        <Badge>{lead.status}</Badge>
                      </td>
                      <td>
                        <span className="assignee">
                          <span className="avatar neutral small">
                            {lead.assigned_to ? lead.assigned_to.slice(0, 2).toUpperCase() : '?'}
                          </span>
                          {lead.assigned_to || 'Unassigned'}
                        </span>
                      </td>
                      <td className="muted">{lead.created_at}</td>
                      <td>
                        <Link className="row-open" to={`/leads/${lead.id}`} aria-label={`Open ${lead.name}`}>
                          <ChevronRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="board">
              {['New', 'Contacted', 'Qualified', 'Demo', 'Negotiation', 'Won', 'Lost'].map((st) => (
                <div key={st} className="board-column">
                  <div className="board-heading">
                    <Badge>{st}</Badge>
                  </div>
                  {leads
                    .filter((l) => l.status === st)
                    .map((l) => (
                      <Link key={l.id} to={`/leads/${l.id}`} className="lead-card">
                        <strong>{l.company}</strong>
                        <p>{l.name}</p>
                        <div>
                          <span className={l.score >= 80 ? 'score-high' : ''}>{l.score} / 100</span>
                          <span className={`avatar ${l.color || 'blue'} small`}>
                            {l.initials || l.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          )}
        </tt>

        {/* Footer Pagination */}
        <div className="table-footer">
          <span>
            {totalCount > 0 ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, totalCount)} of ${totalCount}` : '0'} leads
          </span>
          {viewMode === 'table' && (
            <div className="pagination">
              <button
                className="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft size={15} /> Previous
              </button>
              <span>{currentPage}</span>
              <button
                className="button"
                disabled={currentPage * pageSize >= totalCount}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
