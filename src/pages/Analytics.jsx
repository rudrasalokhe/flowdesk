import React from 'react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../context/ThemeContext';
import * as analyticsApi from '../api/analytics';
import { KpiCard } from '../components/analytics/KpiCard';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { Calendar, TrendingUp } from 'lucide-react';
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

export const LeadGrowthChart = ({ data, height = 225, isDark }) => {
  const gridStroke = isDark ? '#1e293b' : '#e2e8f0';
  const tickFill = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div style={{ height, width: '100%' }} aria-label="Leads over time">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 14, right: 12, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="qualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={gridStroke} strokeDasharray="3 3" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: tickFill, fontSize: 12 }} minTickGap={35} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: tickFill, fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: 8, fontSize: 12, color: tooltipText, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Area type="monotone" name="Total leads" dataKey="leads" stroke="#3b82f6" strokeWidth={2.5} fill="url(#leadFill)" />
          <Area type="monotone" name="Qualified" dataKey="qualified" stroke="#10b981" strokeWidth={2} strokeDasharray="5 4" fill="url(#qualFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SourceDonutChart = ({ data, total, isDark }) => {
  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="source-chart">
      <div className="donut">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={3}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {(data || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: 8, fontSize: 12, color: tooltipText, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <strong>{total?.toLocaleString() ?? '—'}</strong>
          <span>Total leads</span>
        </div>
      </div>

      <div className="source-legend">
        {(data || []).map((item) => (
          <div key={item.name}>
            <span className="legend-dot" style={{ background: item.color || '#3b82f6' }} />
            <span>{item.name}</span>
            <strong>{item.percent || item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScoreDistributionChart = ({ data, dataKey = 'value', color = '#8b5cf6', isDark }) => {
  const gridStroke = isDark ? '#1e293b' : '#e2e8f0';
  const tickFill = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipText = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div style={{ height: 235 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={gridStroke} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickFill }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: tickFill }} />
          <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: 8, fontSize: 12, color: tooltipText, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Analytics = () => {
  const { isDark } = useTheme();
  const { data: overview, loading: overviewLoading, error: overviewError, retry } = useApi(analyticsApi.getOverview);
  const { data: timeData } = useApi(analyticsApi.getLeadsOverTime);
  const { data: sourceData } = useApi(analyticsApi.getLeadsBySource);
  const { data: pipelineData } = useApi(analyticsApi.getPipelineData);
  const { data: salesData } = useApi(analyticsApi.getSalespersonPerformance);

  if (overviewLoading && !overview) {
    return <LoadingSpinner label="Fetching Analytics Intelligence..." size="lg" className="py-20" />;
  }

  if (overviewError) {
    return (
      <div className="py-8">
        <ErrorAlert title="Failed to load analytics endpoints" message={overviewError} onRetry={retry} />
      </div>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <span className="eyebrow">REPORTING & INTELLIGENCE</span>
          <h1>Analytics</h1>
          <p>Lead acquisition, conversion funnel, and sales team performance.</p>
        </div>
        <div className="heading-actions">
          <span className="date-display">
            <Calendar size={16} /> September 2026
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section className="metrics-grid mb-6">
        <KpiCard
          title="Total leads"
          value={overview?.total_leads?.toLocaleString()}
          change={overview?.changes?.[0] || '12.4'}
        />
        <KpiCard
          title="Qualified"
          value={overview?.qualified_leads?.toLocaleString()}
          change={overview?.changes?.[2] || '16.8'}
        />
        <KpiCard
          title="Won leads"
          value={overview?.converted_leads?.toLocaleString()}
          change={overview?.changes?.[4] || '14.2'}
        />
        <KpiCard
          title="Lost leads"
          value={overview?.lost_leads?.toLocaleString()}
          change="3.1"
          trend="down"
        />
        <KpiCard
          title="Conversion rate"
          value={`${overview?.conversion_rate || 22.8}%`}
          change={overview?.changes?.[5] || '2.4'}
        />
        <KpiCard
          title="Average score"
          value={overview?.average_score?.toString() || '74'}
          subtitle="FastAPI Scoring Engine"
        />
      </section>

      {/* Analytics Charts Grid */}
      <div className="analytics-grid">
        <Card
          title="Lead acquisition"
          subtitle="Total and qualified leads over time"
          action={
            <div className="chart-legend flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#3b82f6' }} /> Total leads
              </span>
              <span className="flex items-center gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#10b981' }} /> Qualified
              </span>
            </div>
          }
        >
          <div className="p-4">
            <LeadGrowthChart data={timeData || []} height={265} isDark={isDark} />
          </div>
        </Card>

        <Card title="Acquisition channels" subtitle="Leads by source">
          <SourceDonutChart data={sourceData || []} total={overview?.total_leads} isDark={isDark} />
        </Card>

        <Card title="Conversion funnel" subtitle="Current lead distribution by pipeline stage">
          <div className="p-5 space-y-3.5">
            {(pipelineData || []).map((stage) => (
              <div key={stage.name} className="flex items-center justify-between gap-4 text-xs">
                <span className="w-24 font-medium text-slate-700 dark:text-slate-300 truncate">{stage.name}</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (stage.value / (overview?.total_leads || 1)) * 250)}%`,
                      background: stage.color || '#3b82f6'
                    }}
                  />
                </div>
                <strong className="w-12 text-right font-mono text-slate-900 dark:text-white">{stage.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Lead score distribution" subtitle="Opportunity quality across your pipeline">
          <div className="p-4">
            <ScoreDistributionChart data={overview?.score_distribution || []} isDark={isDark} />
          </div>
        </Card>
      </div>

      {/* Sales Team Performance Table */}
      <div className="mt-6">
        <Card title="Team performance" subtitle="Assigned leads, conversions, and workload capacity.">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Salesperson</th>
                  <th>Team</th>
                  <th>Assigned leads</th>
                  <th>Won leads</th>
                  <th>Conversion rate</th>
                  <th>Workload</th>
                </tr>
              </thead>
              <tbody>
                {(salesData || []).map((rep) => (
                  <tr key={rep.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <span className={`avatar ${rep.color || 'blue'} small`}>
                          {rep.name.slice(0, 2).toUpperCase()}
                        </span>
                        <strong className="text-slate-900 dark:text-white font-medium">{rep.name}</strong>
                      </div>
                    </td>
                    <td className="text-slate-500 dark:text-slate-400">{rep.team}</td>
                    <td className="font-mono text-slate-700 dark:text-slate-300">{rep.leads}</td>
                    <td className="font-mono text-slate-700 dark:text-slate-300">{rep.won}</td>
                    <td>
                      <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        <TrendingUp size={14} /> {rep.conversion_rate}%
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${rep.workload > 80 ? 'bg-rose-500' : rep.workload > 60 ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${rep.workload}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{rep.workload}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
