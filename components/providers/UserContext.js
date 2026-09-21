import { get, public_urls } from "@/src/urls";
import useStorage from "@/useStorage";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const UserStatusContext = createContext({
  userLogedIn: true,
  isChecking: false,
  checkConnection: async () => {},
});

export function UserStatusProvider({ children }) {
  const [userLogedIn, setUserLogedIn] = useState(true);

  const [isChecking, setIsChecking] = useState(false);

  const {getItem} = useStorage()

  const activeControllerRef = useRef(null);

  const url = get.check_login;
  const interval = 10000; // 10 seconds

  const verifyUserStatus = useCallback(async () => {
    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }

    const controller = new AbortController();
    activeControllerRef.current = controller;
    setIsChecking(true);

    try {
      const _token = getItem("token", "session");

      if (!_token) {
        setUserLogedIn(false);
        return;
      }

      const response = await fetch(url + _token);
      const data = await response.json();
      //alert(JSON.stringify(data));
      if (+data.data.logged === 0) {
        setUserLogedIn(false);
      } else {
        setUserLogedIn(true);
        console.log("User is logged in, continuing to check...");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserLogedIn(false);
    } finally {
      if (activeControllerRef.current === controller) {
        setIsChecking(false);
      }
    }
  }, [url]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      verifyUserStatus();
    }, interval);

    return () => clearInterval(intervalId);
  }, [verifyUserStatus]);

  const contextValue = {
    userLogedIn,
    isChecking,
  };

  return (
    <UserStatusContext.Provider value={contextValue}>
      {children}
    </UserStatusContext.Provider>
  );
}

export function useUserStatus() {
  const context = useContext(UserStatusContext);
  // Good practice: Throw an error if someone tries to use the hook outside the provider
  if (!context) {
    throw new Error("useUserStatus must be used within a UserStatusProvider");
  }

  return context;
}
