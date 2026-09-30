import React from 'react';

export const Card = ({ title, subtitle, action, children, className = '', headerClassName = '' }) => {
  return (
    <section className={`panel ${className}`}>
      {(title || action) && (
        <div className={`panel-header ${headerClassName}`}>
          <div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
