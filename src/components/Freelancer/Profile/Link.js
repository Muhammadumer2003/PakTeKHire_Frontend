import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function Link({ href, children, className = '' }) {
  return (
    <RouterLink to={href} className={className}>
      {children}
    </RouterLink>
  );
}
