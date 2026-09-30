import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import * as importsApi from '../../api/imports';

export const CsvUploader = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Invalid file type. Please upload a standard CSV file (.csv)');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Invalid file type. Please upload a standard CSV file (.csv)');
      }
    }
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);
    try {
      const result = await importsApi.uploadCsv(selectedFile);
      setUploading(false);
      if (onUploadSuccess) onUploadSuccess(result);
    } catch (err) {
      setUploading(false);
      setError(err.userMessage || 'CSV upload failed. Check file format.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      {error && (
        <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800 rounded text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-950/20'
            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mx-auto mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>

        <h3 className="text-sm font-semibold text-slate-200 mb-1">
          Drag & Drop bulk leads CSV file here
        </h3>
        <p className="text-xs text-slate-400 mb-2">
          Supports up to 50,000 lead records per file (UTF-8 encoded .csv)
        </p>
        <span className="inline-block text-[11px] font-mono text-blue-400 underline">
          Or click to browse local files
        </span>
      </div>

      {/* Selected File Details */}
      {selectedFile && (
        <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">{selectedFile.name}</p>
              <p className="text-[10px] font-mono text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to send to FastAPI
              </p>
            </div>
          </div>

          <button
            onClick={handleStartUpload}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Start Async Import</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
