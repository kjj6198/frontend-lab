import React, { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function LazyComponent(loader) {
  return props => (
    <ErrorBoundary>
      <Suspense fallback="">{React.createElement(lazy(loader), props)}</Suspense>
    </ErrorBoundary>
  );
}
