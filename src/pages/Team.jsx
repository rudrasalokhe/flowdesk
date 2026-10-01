import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import * as usersApi from '../api/users';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { UsersRound, Search, Pencil, ShieldCheck } from 'lucide-react';

export const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: usersData, loading, error, retry } = useApi(usersApi.getUsers);

  const users = (usersData || []).filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await usersApi.updateUser(selectedUser.id, data);
      setSubmitting(false);
      setSelectedUser(null);
      retry();
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to update user profile.');
    }
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Team</h1>
          <p>Sales team, workloads, and role-based assignment routing.</p>
        </div>
      </div>

      {/* Banner */}
      <div className="team-banner">
        <span className="team-banner-icon">
          <UsersRound size={27} />
        </span>
        <div>
          <h2>Your revenue team</h2>
          <p>Acme workspace · Sales and operations</p>
        </div>
        <div className="avatar-stack">
          {(usersData || []).map((u) => (
            <span key={u.id} className={`avatar ${u.color || 'blue'}`}>
              {u.initials || u.name.slice(0, 2).toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Team Table Panel */}
      <Card
        title="Team members"
        subtitle="Workloads, availability, and performance in one place."
        action={
          <div className="search-input">
            <Search size={16} />
            <input
              placeholder="Find a teammate…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        }
      >
        {error && <ErrorAlert title="Failed to load team members" message={error} onRetry={retry} />}

        {loading ? (
          <LoadingSpinner label="Fetching team records..." className="py-16" />
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Team</th>
                  <th>Workload</th>
                  <th>Conversion rate</th>
                  <th>Status</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {users.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <span className="person">
                        <span className={`avatar ${member.color || 'blue'} small`}>
                          {member.initials || member.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <strong>{member.name}</strong>
                          <span>{member.email}</span>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span className="role-badge">{member.role}</span>
                    </td>
                    <td>{member.team}</td>
                    <td>
                      <div className="workload">
                        <div>
                          <i style={{ width: `${member.workload}%` }} />
                        </div>
                        {member.workload}%
                      </div>
                    </td>
                    <td>{member.conversion_rate}%</td>
                    <td>
                      <Badge>{member.status}</Badge>
                    </td>
                    <td>
                      <button
                        className="icon-button"
                        aria-label={`Edit ${member.name}`}
                        onClick={() => setSelectedUser(member)}
                      >
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="table-footer">
          <span>{users.length} team members</span>
        </div>
      </Card>

      <div className="team-note">
        <ShieldCheck size={16} />
        <span>Assignments and permissions are managed by your workspace administrator.</span>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <Modal
          isOpen={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
          title={`Edit ${selectedUser.name}`}
        >
          <form onSubmit={handleSaveUser}>
            <div className="form-grid mb-4">
              <label className="field">
                <span>Name</span>
                <input name="name" defaultValue={selectedUser.name} required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" defaultValue={selectedUser.email} required />
              </label>
              <label className="field">
                <span>Role</span>
                <select name="role" defaultValue={selectedUser.role}>
                  {['ADMIN', 'MANAGER', 'SALES'].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Team</span>
                <input name="team" defaultValue={selectedUser.team} />
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="button" onClick={() => setSelectedUser(null)}>
                Cancel
              </button>
              <button type="submit" className="button primary" disabled={submitting}>
                Save changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
