import React, { useState } from 'react';
import { Modal } from './Modal';
import { Layers, Server, Code2, CheckCircle2, ChevronRight, Copy } from 'lucide-react';
import { API_BASE_URL } from '../../api/client';

export const OpenApiModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('leads_get');

  const endpoints = [
    {
      id: 'auth_login',
      method: 'POST',
      path: '/auth/login',
      summary: 'Authenticate RevOps User & Return JWT Token',
      req: '{\n  "email": "sarah.chen@launchpad.io",\n  "password": "password123"\n}',
      res: '{\n  "access_token": "eyJhbGciOiJIUzI1Ni...",\n  "token_type": "bearer",\n  "user": {\n    "id": 4,\n    "name": "Sarah Miller",\n    "role": "ADMIN"\n  }\n}'
    },
    {
      id: 'leads_get',
      method: 'GET',
      path: '/leads?page=1&limit=20&status=qualified&priority=high',
      summary: 'Query & Paginate Leads Directory',
      req: 'Query Parameters:\n  page: 1\n  limit: 20\n  status: "qualified"\n  priority: "high"',
      res: '{\n  "items": [\n    {\n      "id": 1024,\n      "name": "Olivia Rhye",\n      "company": "Acme Inc.",\n      "score": 94,\n      "priority": "High",\n      "status": "Qualified",\n      "assigned_to": "Aarav Shah"\n    }\n  ],\n  "total": 2846,\n  "page": 1,\n  "limit": 20\n}'
    },
    {
      id: 'leads_post',
      method: 'POST',
      path: '/leads',
      summary: 'Submit New Inbound Prospect Lead',
      req: '{\n  "name": "Kathryn Murphy",\n  "email": "k.murphy@strataworks.com",\n  "company": "StrataWorks Tech",\n  "company_size": "500-1000",\n  "industry": "Financial Services",\n  "source": "Demo Request"\n}',
      res: '{\n  "id": 1025,\n  "name": "Kathryn Murphy",\n  "score": 91,\n  "priority": "High",\n  "status": "New",\n  "score_factors": [\n    "+20 Enterprise company",\n    "+15 Verified corporate email"\n  ]\n}'
    },
    {
      id: 'leads_assign',
      method: 'POST',
      path: '/leads/{id}/assign',
      summary: 'Assign Lead to Sales Representative',
      req: '{\n  "user_id": 1\n}',
      res: '{\n  "id": 1024,\n  "assigned_to": "Aarav Shah",\n  "assigned_to_id": 1,\n  "updated_at": "2026-09-30T10:42:00Z"\n}'
    },
    {
      id: 'imports_post',
      method: 'POST',
      path: '/imports/leads',
      summary: 'Asynchronous Bulk CSV File Ingestion',
      req: 'Content-Type: multipart/form-data\n  file: leads.csv (Binary Payload)',
      res: '{\n  "id": "job_101",\n  "file_name": "leads.csv",\n  "status": "PROCESSING",\n  "total_rows": 50000,\n  "progress_percentage": 25.0\n}'
    },
    {
      id: 'analytics_overview',
      method: 'GET',
      path: '/analytics/overview',
      summary: 'Executive Pipeline Metrics & Score Distribution',
      req: 'Headers:\n  Authorization: Bearer <JWT_TOKEN>',
      res: '{\n  "total_leads": 2846,\n  "qualified_leads": 864,\n  "conversion_rate": 13.6,\n  "average_score": 74\n}'
    }
  ];

  const activeSpec = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[1];

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(endpoints, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="FastAPI OpenAPI 3.0 Contract Specification"
      subtitle={`Base REST Server URL: ${API_BASE_URL}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between p-3 bg-slate-950 rounded border border-slate-800 text-slate-300">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-emerald-400" />
            <span>FastAPI Server Specification</span>
          </div>
          <button
            onClick={handleCopySpec}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied Full Spec' : 'Copy Spec JSON'}</span>
          </button>
        </div>

        {/* 2-Column OpenAPI Viewer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left Endpoint List */}
          <div className="md:col-span-2 space-y-1.5 bg-slate-950 p-2 rounded border border-slate-800 max-h-80 overflow-y-auto">
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id)}
                className={`w-full p-2.5 rounded text-left transition-colors flex items-center justify-between gap-2 ${
                  selectedEndpoint === ep.id
                    ? 'bg-blue-950 text-blue-200 border border-blue-800 font-semibold'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div className="truncate">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                      ep.method === 'GET'
                        ? 'bg-blue-900 text-blue-300'
                        : ep.method === 'POST'
                        ? 'bg-emerald-900 text-emerald-300'
                        : 'bg-amber-900 text-amber-300'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-[11px]">{ep.path.split('?')[0]}</span>
                </div>
                <ChevronRight size={14} className="text-slate-500 shrink-0" />
              </button>
            ))}
          </div>

          {/* Right Endpoint Details */}
          <div className="md:col-span-3 bg-slate-950 p-4 rounded border border-slate-800 space-y-3 max-h-80 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-blue-950 text-blue-300 font-bold rounded text-xs border border-blue-800">
                  {activeSpec.method}
                </span>
                <span className="text-slate-100 font-bold text-xs">{activeSpec.path}</span>
              </div>
              <p className="text-slate-400 text-xs font-sans leading-relaxed">{activeSpec.summary}</p>
            </div>

            <div>
              <h4 className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Expected Request Schema</h4>
              <pre className="p-2.5 bg-slate-900 rounded border border-slate-800 text-blue-300 text-[11px] overflow-x-auto leading-relaxed">
{activeSpec.req}
              </pre>
            </div>

            <div>
              <h4 className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Expected Response Schema (200 OK)</h4>
              <pre className="p-2.5 bg-slate-900 rounded border border-slate-800 text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
{activeSpec.res}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
