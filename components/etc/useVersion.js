import { useCallback, useState } from "react";
import globals from "../../src/globals";

export function useVersion() {
  const [isOutdated, setIsOutdated] = useState(false);
  const [serverVersion, setServerVersion] = useState(null);

  const checkVersionFromResponse = useCallback((res) => {
    const headerVersion = res.headers.get("X-App-Version");
    const clientVersion = process.env.NEXT_PUBLIC_APP_VERSION;

    if (headerVersion) {
      setServerVersion(headerVersion);
      //localStorage.setItem("serverVersion", headerVersion);
      globals.setSettings("serverVersion", headerVersion);
    }

    if (headerVersion && clientVersion && headerVersion !== clientVersion) {
      setIsOutdated(true);
      //localStorage.setItem("isOutdated", "true");
      globals.setSettings("isOutdated", true);
    } else {
      setIsOutdated(false);
      //localStorage.setItem("isOutdated", "false");
      globals.setSettings("isOutdated", false);
    }
  }, []);

  return { isOutdated, serverVersion, checkVersionFromResponse };
}
