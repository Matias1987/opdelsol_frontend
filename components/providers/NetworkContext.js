import { remote_base_url } from '@/src/config';
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const NetworkContext = createContext({ isOnline: true, isChecking: false, checkConnection: async () => {} });

// Using a stable public endpoint
const PING_URL = remote_base_url + 'ping/'; // You can replace this with a more reliable endpoint if needed

export function NetworkProvider({ children, pingInterval = 10000 }) {
  // 1. CRITICAL FIX: Always default to true on initial render to match Server output
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  
  const activeControllerRef = useRef(null);

  const verifyInternet = useCallback(async () => {
    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }

    const controller = new AbortController();
    activeControllerRef.current = controller;
    setIsChecking(true);

    try {
      await fetch(`${PING_URL}?t=${Date.now()}`, {
        method: 'HEAD',
        signal: controller.signal,
      });
      setIsOnline(true);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setIsOnline(false);
      }
    } finally {
      if (activeControllerRef.current === controller) {
        setIsChecking(false);
      }
    }
  }, []);

  useEffect(() => {
    // 2. CRITICAL FIX: This code only runs in the browser, instantly fixing the state
    setIsOnline(navigator.onLine);

    const handleOnline = () => verifyInternet();
    const handleOffline = () => setIsOnline(false);

    // Initial actual ping check on client mount
    verifyInternet();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const intervalId = setInterval(() => {
      verifyInternet();
    }, pingInterval);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(intervalId);
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }
    };
  }, [verifyInternet, pingInterval]);

  const contextValue = {
    isOnline,
    isChecking,
    checkConnection: verifyInternet
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetworkStatus() {
  return useContext(NetworkContext);
}
