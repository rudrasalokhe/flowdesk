import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as leadsApi from '../api/leads';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, UserRound, Building2, MessageSquare, Info, Plus } from 'lucide-react';

export const CreateLead = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const created = await leadsApi.createLead(formData);
      setSubmitting(false);
      if (created && created.id) {
        navigate(`/leads/${created.id}`);
      } else {
        navigate('/leads');
      }
    } catch (err) {
      setSubmitting(false);
      alert(err.userMessage || 'Failed to submit lead payload.');
    }
  };

  return (
    <div>
      <Link className="back-link" to="/leads">
        <ChevronLeft size={16} /> Back to leads
      </Link>

      <div className="page-heading">
        <div>
          <h1>New lead</h1>
          <p>Add contact and company information.</p>
        </div>
      </div>

      <div className="form-layout">
        <form className="panel lead-form" onSubmit={handleSubmit}>
          {/* Contact Section */}
          <div className="form-section-title">
            <UserRound size={18} />
            <div>
              <h2>Contact information</h2>
              <p>Contact details</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Full name *</span>
              <input name="name" placeholder="e.g. Olivia Rhye" required />
            </label>

            <label className="field">
              <span>Work email *</span>
              <input name="email" type="email" placeholder="olivia@company.com" required />
            </label>

            <label className="field">
              <span>Phone number</span>
              <input name="phone" type="tel" placeholder="+1 (415) 555-0124" />
            </label>

            <label className="field">
              <span>Lead source *</span>
              <select name="source" required defaultValue="">
                <option value="" disabled>Select a source</option>
                {['Website', 'LinkedIn', 'Referral', 'CSV import'].map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Company Section */}
          <div className="form-section-title">
            <Building2 size={18} />
            <div>
              <h2>Company details</h2>
              <p>Company information</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              <span>Company name *</span>
              <input name="company" placeholder="Acme Inc." required />
            </label>

            <label className="field">
              <span>Company size</span>
              <select name="company_size" defaultValue="">
                <option value="">Select company size</option>
                {['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'].map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Industry</span>
              <select name="industry" defaultValue="">
                <option value="">Select an industry</option>
                {['Software & technology', 'Financial services', 'Healthcare', 'Education', 'Retail', 'Other'].map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Message Section */}
          <div className="form-section-title">
            <MessageSquare size={18} />
            <div>
              <h2>Additional context</h2>
              <p>Requirements or notes</p>
            </div>
          </div>

          <label className="field mb-6">
            <span>Message</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Add requirements, interests, or context for your team…"
            />
          </label>

          <div className="form-actions">
            <Link className="button" to="/leads">
              Cancel
            </Link>
            <button className="button primary" type="submit" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create lead'}
            </button>
          </div>
        </form>

        {/* Side Info */}
        <aside className="form-aside">
          <div className="aside-icon">
            <Info size={21} />
          </div>
          <h3>Lead information</h3>
          <p>A work email and company details help your team understand the opportunity before the first call.</p>
          <hr />
          <h4>What happens next?</h4>
          <div className="number-step">
            <span>1</span>
            <p>Your lead is validated and checked for duplicates by FastAPI.</p>
          </div>
          <div className="number-step">
            <span>2</span>
            <p>A lead score and priority help you decide what to focus on.</p>
          </div>
          <div className="number-step">
            <span>3</span>
            <p>Assign a teammate and plan the next conversation.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};
