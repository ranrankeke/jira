import React, { ReactNode } from 'react';
import { AuthProvider } from './authContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  console.log('children', children)
  return (
    <>
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  )
}