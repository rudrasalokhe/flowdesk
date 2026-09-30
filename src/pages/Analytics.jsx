import React from 'react';
import { useApi } from '../hooks/useApi';
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

export const LeadGrowthChart = ({ data, height = 225 }) => (
  <div style={{ height, width: '100%' }} aria-label="Leads over time">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 14, right: 12, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4263eb" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#4263eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#eef0f4" strokeDasharray="3 3" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#87909f', fontSize: 12 }} minTickGap={35} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#87909f', fontSize: 12 }} />
        <Tooltip contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13 }} />
        <Area type="monotone" name="Total leads" dataKey="leads" stroke="#4263eb" strokeWidth={2.5} fill="url(#leadFill)" />
        <Area type="monotone" name="Qualified" dataKey="qualified" stroke="#96a9eb" strokeWidth={2} strokeDasharray="5 4" fill="transparent" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const SourceDonutChart = ({ data, total }) => {
  const COLORS = ['#4263eb', '#8c9ff2', '#b6c3f9', '#dce3fc'];

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
            <Tooltip />
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
            <span className="legend-dot" style={{ background: item.color || '#4263eb' }} />
            <span>{item.name}</span>
            <strong>{item.percent || item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ScoreDistributionChart = ({ data, dataKey = 'value', color = '#657fee' }) => (
  <div style={{ height: 235 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eef0f4" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7b8494' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7b8494' }} />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const Analytics = () => {
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
          <span className="eyebrow">REPORTING</span>
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
          label="Total leads"
          value={overview?.total_leads?.toLocaleString()}
          change={overview?.changes?.[0]}
        />
        <KpiCard
          label="Qualified"
          value={overview?.qualified_leads?.toLocaleString()}
          change={overview?.changes?.[2]}
        />
        <KpiCard
          label="Won leads"
          value={overview?.converted_leads?.toLocaleString()}
          change={overview?.changes?.[4]}
        />
        <KpiCard
          label="Lost leads"
          value={overview?.lost_leads?.toLocaleString()}
          change="-3.1"
        />
        <KpiCard
          label="Conversion rate"
          value={`${overview?.conversion_rate}%`}
          change={overview?.changes?.[5]}
        />
        <KpiCard
          label="Average score"
          value={overview?.average_score?.toString() || '74'}
          children="Backend-calculated"
        />
      </section>

      {/* Analytics Charts Grid */}
      <div className="analytics-grid">
        <Card
          title="Lead acquisition"
          subtitle="Total and qualified leads over time"
          action={
            <div className="chart-legend">
              <span>
                <i /> Total leads
              </span>
              <span>
                <i style={{ background: '#8c9ff2' }} /> Qualified
              </span>
            </div>
          }
        >
          <div className="chart-padding">
            <LeadGrowthChart data={timeData || []} height={265} />
          </div>
        </Card>

        <Card title="Acquisition channels" subtitle="Leads by source">
          <SourceDonutChart data={sourceData || []} total={overview?.total_leads} />
        </Card>

        <Card title="Conversion funnel" subtitle="Current lead distribution by pipeline stage">
          <div className="funnel">
            {(pipelineData || []).map((stage) => (
              <div key={stage.name}>
                <span>{stage.name}</span>
                <div>
                  <i
                    style={{
                      width: `${Math.min(100, (stage.value / (overview?.total_leads || 1)) * 250)}%`,
                      background: stage.color || '#4263eb'
                    }}
                  />
                </div>
                <strong>{stage.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Lead score distribution" subtitle="Opportunity quality across your pipeline">
          <div className="chart-padding">
            <ScoreDistributionChart data={overview?.score_distribution || []} />
          </div>
        </Card>
      </div>

      {/* Sales Team Performance Table */}
      <Card title="Team performance" subtitle="Assigned leads, conversions, and workload capacity.">
        <div className="table-scroll">
          <table>
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
                    <span className="person">
                      <span className={`avatar ${rep.color || 'blue'} small`}>
                        {rep.name.slice(0, 2).toUpperCase()}
                      </span>
                      <strong>{rep.name}</strong>
                    </span>
                  </td>
                  <td>{rep.team}</td>
                  <td>{rep.leads}</td>
                  <td>{rep.won}</td>
                  <td>
                    <span className="positive">
                      <TrendingUp size={14} /> {rep.conversion_rate}%
                    </span>
                  </td>
                  <td>
                    <div className="workload">
                      <div>
                        <i style={{ width: `${rep.workload}%` }} />
                      </div>
                      {rep.workload}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
