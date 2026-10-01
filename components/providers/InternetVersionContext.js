import React, { createContext, useContext } from 'react';
import { useInternetAndVersion } from '../hooks/useInternetAndVersion';


const InternetVersionContext = createContext({
  isOnline: false,
  isOutdated: false,
  serverVersion: null
});

export const InternetVersionProvider = ({ children }) => {
  const { isOnline, isOutdated, serverVersion } = useInternetAndVersion();

  return (
    <InternetVersionContext.Provider value={{ isOnline, isOutdated, serverVersion }}>
      {children}
    </InternetVersionContext.Provider>
  );
};

export function useInternetVersion() {
  const ctx = useContext(InternetVersionContext);
  if (!ctx) {
    throw new Error('useInternetVersion debe usarse dentro de InternetVersionProvider');
  }
  return ctx;
}
