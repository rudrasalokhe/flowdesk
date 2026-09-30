import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  ShieldCheck,
  BarChart3,
  Users2,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  CheckSquare,
  Server,
  Terminal,
  Activity,
  Award,
  Layers,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import { API_BASE_URL } from '../api/client';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* 1. Navigation Header */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white block leading-none">
                LaunchPad
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                RevOps Engine
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#architecture" className="hover:text-blue-400 transition-colors">FastAPI Spec</a>
            <a href="#telemetry" className="hover:text-blue-400 transition-colors">Telemetry</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-mono mb-6 shadow-sm">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Backend-First REST Architecture for FastAPI & PostgreSQL</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Automate Lead Qualification & Revenue Routing for Fast-Growing Startups.
          </h1>

          {/* Subhead */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            LaunchPad provides an information-dense, high-speed B2B internal dashboard for lead scoring, SLA follow-up routing, salesperson workload balancing, and bulk async CSV ingestion.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Open Live Platform Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#architecture"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Explore OpenAPI Contract Spec</span>
            </a>
          </div>

          {/* Dashboard Visual Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl p-3 md:p-5 text-left">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-slate-400 ml-2">launchpad-client.internal/dashboard</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>FastAPI Connected ({API_BASE_URL})</span>
              </div>
            </div>

            {/* Dashboard Mini-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Total Inbound Leads</span>
                <span className="text-lg font-bold font-mono text-slate-100">1,482</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Qualified Rate</span>
                <span className="text-lg font-bold font-mono text-emerald-400">43.5%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Conversion Win Rate</span>
                <span className="text-lg font-bold font-mono text-blue-400">20.1%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Avg Score</span>
                <span className="text-lg font-bold font-mono text-purple-400">72.4 / 100</span>
              </div>
            </div>

            {/* Mock Table Snippet */}
            <div className="bg-slate-950 rounded border border-slate-800 overflow-hidden text-xs">
              <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 font-mono text-[11px] text-slate-400 flex justify-between">
                <span>RECENT HIGH-SCORE LEADS</span>
                <span>FASTAPI /LEADS TELEMETRY</span>
              </div>
              <div className="divide-y divide-slate-800/60 p-1">
                <div className="p-2 flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">Kathryn Murphy</span>
                    <span className="text-slate-500">• StrataWorks Tech</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">Score: 91</span>
                    <span className="px-2 py-0.5 bg-rose-950 text-rose-300 rounded text-[10px] border border-rose-800">HIGH PRIORITY</span>
                  </div>
                </div>
                <div className="p-2 flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">Michael Chang</span>
                    <span className="text-slate-500">• Apex Global Cloud</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">Score: 84</span>
                    <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded text-[10px] border border-purple-800">DEMO SCHEDULED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              Purpose-Built for Startup Sales & RevOps
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything your revenue team needs to capture, qualify, and convert.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Smart Lead Scoring Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backend-calculated lead scores (0-100) displaying positive score factors like enterprise company headcount, business domain verification, and high intent signals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400 mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Workload-Balanced Rep Routing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assign inbound leads to available salespeople based on current team workload capacity, conversion rates, and specialization team groups.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 mb-4">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Asynchronous Bulk CSV Import</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drag-and-drop large CSV files (up to 50,000 records). Features real-time status polling, progress bar breakdown, and field-level error logs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 mb-4">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">SLA Task Follow-up Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track follow-up tasks linked to specific leads. Filter by pending, completed, or overdue status with quick completion toggles.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Activity Audit Timeline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete event audit logs for every lead lifecycle event—from creation and auto-scoring to assignment, discovery calls, and final deal conversion.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">Executive Analytics & Funnel</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive Recharts visualization for pipeline funnels, lead score distribution, marketing channel performance, and salesperson revenue output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FastAPI Architecture Section */}
      <section id="architecture" className="py-20 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-2">
                Backend-First Architecture Spec
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Designed to integrate seamlessly with your FastAPI backend.
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                This client application is completely decoupled from business logic. Every API request passes through a centralized Axios client with OAuth2 Bearer token handling and standardized error status code processing.
              </p>

              <div className="mt-6 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Centralized Axios Client (`src/api/client.js`)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configurable API URL via `VITE_API_URL` (.env)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict HTTP Error Interceptors (400, 401, 403, 404, 409, 422, 429, 500)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Isolated Fallback Mock Layer (`src/mock/mockData.js`) for UI development</span>
                </div>
              </div>
            </div>

            {/* Code Block Terminal Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>fastapi_openapi_spec.json</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">REST API CONTRACT</span>
              </div>
              <pre className="p-4 text-slate-300 overflow-x-auto leading-relaxed">
{`// FastAPI Endpoints Expected by LaunchPad Client
POST   /auth/login            -> { access_token, token_type }
GET    /leads?page=1&limit=20 -> { items: [], total: 1482 }
GET    /leads/{id}            -> { score: 91, score_factors: [...] }
POST   /leads/{id}/assign     -> { user_id: 1 }
POST   /leads/{id}/convert    -> { status: "WON" }
GET    /leads/{id}/activity   -> [{ title, timestamp, actor }]
GET    /tasks?status=PENDING  -> [{ id, title, due_date }]
POST   /imports/leads         -> { id: "job_101", status: "PROCESSING" }
GET    /imports/{id}          -> { progress_percentage: 95.6 }
GET    /analytics/overview    -> { total_leads, conversion_rate }`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              Transparent Pricing Plans
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flexible tiers for early-stage and scaling RevOps teams.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Bootstrap Starter</span>
                <div className="text-3xl font-extrabold font-mono text-white mb-2">$49 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span></div>
                <p className="text-xs text-slate-400 mb-6">Ideal for early-stage startups setting up their first sales routing workflow.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Up to 1,000 Inbound Leads / mo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Basic Multi-Factor Scoring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 3 Sales Representative seats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Manual CSV Uploads</li>
                </ul>
              </div>
              <Link
                to="/dashboard"
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center rounded text-xs font-semibold block transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Growth Plan (Popular) */}
            <div className="bg-slate-900 border-2 border-blue-500 rounded-xl p-6 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 right-6 px-2.5 py-0.5 bg-blue-600 text-white font-mono text-[10px] font-bold uppercase rounded-full">
                MOST POPULAR
              </span>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase block mb-1">Growth Scale</span>
                <div className="text-3xl font-extrabold font-mono text-white mb-2">$199 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span></div>
                <p className="text-xs text-slate-400 mb-6">For high-velocity revenue teams requiring automated SLA task routing.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Up to 50,000 Leads / mo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Advanced Smart Lead Scoring</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 15 Rep Seats + Workload Balancing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Async Bulk CSV Ingestion & Polling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Full Recharts Analytics Suite</li>
                </ul>
              </div>
              <Link
                to="/dashboard"
                className="mt-8 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-center rounded text-xs font-semibold block transition-colors shadow-md"
              >
                Launch Platform
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">Enterprise Dedicated</span>
                <div className="text-3xl font-extrabold font-mono text-white mb-2">$499 <span className="text-xs text-slate-400 font-sans font-normal">/ month</span></div>
                <p className="text-xs text-slate-400 mb-6">Unlimited throughput, custom SLA rules, and dedicated FastAPI cluster connection.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Unlimited Inbound Lead Capacity</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Unlimited Sales Seats & Teams</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Real-time WebSocket Telemetry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Audit Log Event Stream Exports</li>
                </ul>
              </div>
              <Link
                to="/dashboard"
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center rounded text-xs font-semibold block transition-colors"
              >
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800/80 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-slate-200">LaunchPad RevOps Platform</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/dashboard" className="hover:text-slate-200 transition-colors">Dashboard</Link>
            <Link to="/leads" className="hover:text-slate-200 transition-colors">Leads Directory</Link>
            <Link to="/login" className="hover:text-slate-200 transition-colors">Sign In</Link>
          </div>

          <div>
            <span>© 2026 LaunchPad. Backend-First Portfolio Architecture.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
