import React from 'react';
import { useAuth } from './context/authContext'
import { UnauthenticatedApp } from 'unauthenticatedApp';
import { AuthenticatedApp } from 'authenticatedApp';
import './App.css';
import { ErrorBoundary } from 'components/errorBoundary';
import { FullPageErrorFallback } from 'components/lib';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
