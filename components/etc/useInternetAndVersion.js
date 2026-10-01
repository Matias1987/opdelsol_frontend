import { remote_base_url } from "@/src/config";
import { useInternet } from "./useInternet";
import { useVersion } from "./useVersion";

export function useInternetAndVersion() {
  const PING_URL = remote_base_url + "ping/";
  const { isOnline, verifyInternet } = useInternet(PING_URL);
  const { isOutdated, serverVersion, checkVersionFromResponse } = useVersion();

  useEffect(() => {
    const runCheck = async () => {
      try {
        const res = await verifyInternet();
        checkVersionFromResponse(res);
      } catch (err) {
        console.error(err);
      }
    };

    runCheck();
    const interval = setInterval(runCheck, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [verifyInternet, checkVersionFromResponse]);

  return { isOnline, isOutdated, serverVersion };
}
