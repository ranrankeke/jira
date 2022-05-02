import React from 'react';
import { useAuth } from './context/authContext'
import { UnauthenticatedApp } from 'unauthenticatedApp';
import { AuthenticatedApp } from 'authenticatedApp';
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
     { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
