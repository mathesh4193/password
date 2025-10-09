import React from 'react';

export default function Notification({ type='info', message }) {
  const cls = type === 'error' ? 'alert-danger' : (type === 'success' ? 'alert-success' : 'alert-info');
  return (
    <div className={`alert ${cls}`} role="alert">
      {message}
    </div>
  );
}
