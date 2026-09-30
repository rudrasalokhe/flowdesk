import React from 'react';

export const Badge = ({ children, value, type = 'status', className = '' }) => {
  const text = children || value || 'New';
  const valLower = (text + '').toLowerCase().replace(/\s+/g, '-');

  return (
    <span className={`badge ${valLower} ${className}`}>
      <span />
      {text}
    </span>
  );
};
