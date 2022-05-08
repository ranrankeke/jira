import React from 'react';
import { useAuth } from './context/authContext'
import { UnauthenticatedApp } from 'unauthenticatedApp';
import { AuthenticatedApp } from 'authenticatedApp';
import './App.css';
import { ErrorBoundary } from 'components/errorBoundary';
import { FullPageErrorFallback } from 'screens/project-list/list';
import { Counter } from './utils/test'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <Counter />
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
