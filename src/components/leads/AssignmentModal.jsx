import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApi } from '../../hooks/useApi';
import * as usersApi from '../../api/users';
import * as leadsApi from '../../api/leads';
import { UserCheck, Loader2, AlertCircle } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';

export const AssignmentModal = ({ isOpen, onClose, leadId, currentAssignedId, onAssigned }) => {
  const { data: users, loading } = useApi(usersApi.getUsers, [isOpen], isOpen);
  const [submittingId, setSubmittingId] = useState(null);
  const [assignError, setAssignError] = useState(null);

  const handleAssign = async (userId) => {
    setSubmittingId(userId);
    setAssignError(null);
    try {
      await leadsApi.assignLead(leadId, userId);
      setSubmittingId(null);
      if (onAssigned) onAssigned(userId);
      onClose();
    } catch (err) {
      setSubmittingId(null);
      setAssignError(err.userMessage || err.message || 'Failed to assign salesperson.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Sales Representative"
      subtitle={`Select a team member to route Lead #${leadId}`}
      maxWidth="max-w-lg"
    >
      {assignError && (
        <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{assignError}</span>
        </div>
      )}

      {loading ? (
        <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
          Loading sales team capacity...
        </div>
      ) : (
        <div className="space-y-2.5">
          {(users || []).map((rep) => {
            const isCurrentlyAssigned = String(rep.id) === String(currentAssignedId);
            const isSubmittingThis = submittingId === rep.id;

            return (
              <div
                key={rep.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isCurrentlyAssigned
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800/80'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-700 dark:text-slate-200 font-bold text-xs border border-blue-200 dark:border-slate-700">
                    {rep.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{rep.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                        {rep.team}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      <span>Workload: <strong className={rep.workload > 80 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}>{rep.workload}%</strong></span>
                      <span>•</span>
                      <span>Conv: <strong className="text-emerald-600 dark:text-emerald-400">{formatPercent(rep.conversion_rate)}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAssign(rep.id)}
                  disabled={isCurrentlyAssigned || submittingId !== null}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                    isCurrentlyAssigned
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                  }`}
                >
                  {isSubmittingThis ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5" />
                  )}
                  <span>{isCurrentlyAssigned ? 'Assigned' : 'Assign'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
};
