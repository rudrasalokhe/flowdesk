import React, { useState, useRef, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import * as importsApi from '../api/imports';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import {
  CloudUpload,
  FileSpreadsheet,
  X,
  Info,
  CircleAlert,
  Download,
  RefreshCw
} from 'lucide-react';

export const ImportLeads = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeJob, setActiveJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setErrorMessage('Please select a valid CSV file (.csv)');
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');
      setActiveJob(null);
    }
  };

  const handleStartImport = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setErrorMessage('');
    try {
      const job = await importsApi.uploadCsv(selectedFile);
      setUploading(false);
      setActiveJob(job);
    } catch (err) {
      setUploading(false);
      setErrorMessage(err.userMessage || 'CSV upload failed.');
    }
  };

  // Poll status if active job exists
  useEffect(() => {
    let timer;
    if (activeJob?.id && (activeJob.status === 'PROCESSING' || activeJob.status === 'UPLOADING' || activeJob.status === 'VALIDATING')) {
      timer = setInterval(async () => {
        try {
          const status = await importsApi.getImportStatus(activeJob.id);
          setActiveJob(status);
        } catch (err) {
          // ignore transient poll error
        }
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [activeJob?.id, activeJob?.status]);

  return (
    <div>
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1>Import leads</h1>
          <p>Upload a CSV file and review the results.</p>
        </div>
      </div>

      <div className="import-layout">
        <div>
          <Card title="Import leads" subtitle="Upload a CSV file to add leads to your workspace.">
            <div className="import-body">
              <input
                ref={fileInputRef}
                className="sr-only"
                id="csv-file"
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <button
                type="button"
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFile(e.dataTransfer.files?.[0]);
                }}
              >
                <span className="upload-icon">
                  <CloudUpload size={28} />
                </span>
                <strong>
                  <span>Click to upload</span> or drag and drop
                </strong>
                <p>CSV files only (up to 50,000 records per file)</p>
              </button>

              {selectedFile && (
                <div className="selected-file">
                  <FileSpreadsheet size={25} />
                  <div>
                    <strong>{selectedFile.name}</strong>
                    <span>{(selectedFile.size / 1024).toFixed(1)} KB · Ready to upload</span>
                  </div>
                  <button
                    className="icon-button"
                    aria-label="Remove file"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="import-tip">
                <Info size={16} />
                <p>Your original file stays unchanged. Duplicate and invalid records will be reported after processing by FastAPI.</p>
              </div>

              {errorMessage && (
                <div className="form-error" role="alert">
                  <CircleAlert size={16} />
                  {errorMessage}
                </div>
              )}

              <div className="form-actions">
                <button
                  className="button primary"
                  disabled={!selectedFile || uploading || (activeJob && activeJob.status === 'PROCESSING')}
                  onClick={handleStartImport}
                >
                  {uploading ? `Uploading…` : 'Upload & import'}
                </button>
              </div>
            </div>
          </Card>

          {/* Import Job Progress Telemetry */}
          {activeJob && (
            <Card title="Import progress" subtitle={selectedFile?.name || activeJob.file_name} className="mt-6">
              <div className="import-body">
                <div className="processing-heading">
                  <strong>{activeJob.status}</strong>
                  <span>{activeJob.progress_percentage || 100}%</span>
                </div>

                <progress value={activeJob.progress_percentage || 100} max="100" />

                <div className="import-stats">
                  <div>
                    <span>Total rows</span>
                    <strong>{activeJob.total_rows?.toLocaleString() ?? '—'}</strong>
                  </div>
                  <div>
                    <span>Imported</span>
                    <strong>{activeJob.imported_rows?.toLocaleString() ?? '—'}</strong>
                  </div>
                  <div>
                    <span>Duplicates</span>
                    <strong>{activeJob.duplicate_rows?.toLocaleString() ?? '—'}</strong>
                  </div>
                  <div>
                    <span>Invalid</span>
                    <strong>{activeJob.invalid_rows?.toLocaleString() ?? '—'}</strong>
                  </div>
                </div>

                {activeJob.errors?.map((err, idx) => (
                  <p key={idx} className="form-error">
                    {typeof err === 'string' ? err : `Row #${err.row}: ${err.message}`}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Side CSV Format Guide */}
        <aside>
          <div className="import-guide">
            <span className="eyebrow">CSV FORMAT</span>
            <h2>Prepare your file.</h2>
            <p>Use one row per lead with a header row at the top.</p>

            <div className="csv-preview">
              <div>
                <span>name</span>
                <span>email</span>
                <span>company</span>
              </div>
              <div>
                <span>Olivia Rhye</span>
                <span>olivia@…</span>
                <span>Acme Inc.</span>
              </div>
              <div>
                <span>Phoenix…</span>
                <span>phoenix@…</span>
                <span>Layers</span>
              </div>
            </div>

            <h4>Required columns</h4>
            <p>
              <code>name</code> <code>email</code> <code>company</code>
            </p>

            <h4>Optional columns</h4>
            <p>phone, company_size, industry, source, message</p>

            <a
              className="button"
              download="launchpad-import-template.csv"
              href="data:text/csv;charset=utf-8,name%2Cemail%2Ccompany%2Cphone%2Ccompany_size%2Cindustry%2Csource%2Cmessage%0A"
            >
              <Download size={15} /> Download CSV template
            </a>
          </div>

          <div className="import-steps">
            {['Upload your file', 'Validate your records', 'Process and check duplicates', 'Review your results'].map((step, idx) => (
              <div key={step}>
                <span>{idx + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
