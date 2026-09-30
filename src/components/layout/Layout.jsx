import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Modal } from '../common/Modal';
import { ApiInspectorModal } from '../common/ApiInspectorModal';
import { OpenApiModal } from '../common/OpenApiModal';
import { Search } from 'lucide-react';

export const Layout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isApiInspectorOpen, setIsApiInspectorOpen] = useState(false);
  const [isOpenApiSpecOpen, setIsOpenApiSpecOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const isWorkbench = location.pathname === '/dashboard';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setIsApiInspectorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/leads?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="app reference-app">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenApiInspector={() => setIsApiInspectorOpen(true)}
        onOpenOpenApiSpec={() => setIsOpenApiSpecOpen(true)}
      />

      <div className={`workspace-main ${isWorkbench ? 'is-workbench' : ''}`}>
        <main>
          <Outlet />
        </main>
      </div>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          title="Search workspace"
          subtitle="Find leads by name, company, or email"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="search-input w-full">
              <Search size={16} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, company or email (e.g. Olivia, Acme)"
              />
            </div>
            <p className="form-hint">Press Enter to search leads across your pipeline.</p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="button"
              >
                Cancel
              </button>
              <button type="submit" className="button primary">
                Search Leads
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Live API Inspector Modal (FAANG Showcase) */}
      <ApiInspectorModal
        isOpen={isApiInspectorOpen}
        onClose={() => setIsApiInspectorOpen(false)}
      />

      {/* OpenAPI / Swagger Spec Modal */}
      <OpenApiModal
        isOpen={isOpenApiSpecOpen}
        onClose={() => setIsOpenApiSpecOpen(false)}
      />
    </div>
  );
};
