import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, Eye, EyeOff, Lock, CircleAlert, Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('sarah@flowdesk.co');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      await login({ email, password });
      setSubmitting(false);
      navigate('/dashboard');
    } catch (err) {
      setSubmitting(false);
      setErrorMsg('Sign-in failed. Please verify credentials or explore the workspace.');
    }
  };

  const handleDemoFill = () => {
    setEmail('sarah@flowdesk.co');
    setPassword('password123');
  };

  return (
    <div className="login">
      {/* Left Branding & Story Side */}
      <section className="login-story">
        <Link className="brand" to="/dashboard">
          <span className="brand-mark">
            <Layers size={20} />
          </span>
          Flowdesk
        </Link>

        <div className="login-story-content">
          <span className="eyebrow">REVENUE OPERATIONS ENGINE</span>
          <h1>
            Your revenue pipeline.<br />One unified workspace.
          </h1>
          <p>
            Real-time lead scoring, workload-balanced routing, and follow-up SLAs powered by your FastAPI backend.
          </p>

          <div className="login-pipeline">
            <div className="login-mini-header">
              <span>PIPELINE HEALTH</span>
              <span>THIS MONTH</span>
            </div>
            <div className="login-mini-metrics">
              <div>
                <span>Qualified leads</span>
                <strong>
                  864 <small>↗ 16.4%</small>
                </strong>
              </div>
              <div>
                <span>Conversion rate</span>
                <strong>
                  22.8<em>%</em>
                </strong>
              </div>
            </div>
            <div className="login-bars">
              {[25, 38, 31, 45, 42, 60, 54, 73, 69, 88, 81, 100].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, opacity: 0.3 + i * 0.06 }} />
              ))}
            </div>
            <div className="login-mini-footer">
              <span>01 SEP</span>
              <span>Live Inbound Stream</span>
              <span>30 SEP</span>
            </div>
          </div>
        </div>

        <div className="login-copyright">
          © 2026 Flowdesk RevOps. <span>Built for focused revenue teams.</span>
        </div>
      </section>

      {/* Right Form Side */}
      <section className="login-form-side relative">
        {/* Theme Switcher in top right corner */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun size={17} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={17} className="text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>
        </div>

        <div className="login-form-inner">
          <div className="login-icon">
            <Layers size={24} />
          </div>

          <h2>Welcome back</h2>
          <p>Sign in to your revenue workspace.</p>

          <form onSubmit={handleSubmit}>
            <label className="field mb-4">
              <span>Work email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@flowdesk.co"
                required
              />
            </label>

            <label className="field mb-4">
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {errorMsg && (
              <p className="form-error mb-4" role="alert">
                <CircleAlert size={16} /> {errorMsg}
              </p>
            )}

            <button className="button primary w-full py-2.5" disabled={submitting} type="submit">
              {submitting ? 'Authenticating…' : 'Sign In'}
            </button>
          </form>

          {/* 1-Click Demo Credentials */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Auto-fill Demo Credentials</span>
            </button>
          </div>

          <div className="login-or">
            <span />
            OR EXPLORE PREVIEW
            <span />
          </div>

          <Link className="button w-full py-2.5 text-center justify-center" to="/dashboard">
            Explore workspace directly
          </Link>

          <p className="login-preview-note">Sample pipeline data loaded. No setup required.</p>

          <div className="login-security">
            <Lock size={13} /> End-to-end encrypted session
          </div>
        </div>
      </section>
    </div>
  );
};
