import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Layers, Eye, EyeOff, Lock, CircleAlert } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('sarah@launchpad.co');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
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
      setErrorMsg('Sign-in is unavailable in design preview. Click "Explore the workspace" below to view the interface.');
    }
  };

  return (
    <div className="login">
      {/* Left Branding & Story Side */}
      <section className="login-story">
        <Link className="brand" to="/dashboard">
          <span className="brand-mark">
            <Layers size={22} />
          </span>
          LaunchPad.
        </Link>

        <div className="login-story-content">
          <span className="eyebrow">REVENUE OPERATIONS</span>
          <h1>
            Your leads.<br />One workspace.
          </h1>
          <p>
            Manage your contacts, assignments, and<br />follow-ups in one place.
          </p>

          <div className="login-pipeline">
            <div className="login-mini-header">
              <span>YOUR PIPELINE</span>
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
                  13.6<em>%</em>
                </strong>
              </div>
            </div>
            <div className="login-bars">
              {[25, 38, 31, 45, 42, 60, 54, 73, 69, 88, 81, 100].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, opacity: 0.25 + i * 0.06 }} />
              ))}
            </div>
            <div className="login-mini-footer">
              <span>01 SEP</span>
              <span>Sample pipeline</span>
              <span>30 SEP</span>
            </div>
          </div>
        </div>

        <div className="login-copyright">
          © 2026 LaunchPad <span>Built for focused teams.</span>
        </div>
      </section>

      {/* Right Form Side */}
      <section className="login-form-side">
        <div className="login-form-inner">
          <div className="login-icon">
            <Layers size={26} />
          </div>

          <h2>Welcome back.</h2>
          <p>Let's pick up where you left off.</p>

          <form onSubmit={handleSubmit}>
            <label className="field mb-4">
              <span>Work email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
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
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {errorMsg && (
              <p className="form-error mb-4" role="alert">
                <CircleAlert size={16} /> {errorMsg}
              </p>
            )}

            <button className="button primary" disabled={submitting} type="submit">
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="login-or">
            <span />
            OR EXPLORE THE DESIGN
            <span />
          </div>

          <Link className="button mt-3" to="/dashboard">
            Explore the workspace
          </Link>

          <p className="login-preview-note">Sample data. No account needed.</p>

          <div className="login-security">
            <Lock size={13} /> Your workspace. Your opportunities.
          </div>
        </div>
      </section>
    </div>
  );
};
