import { useState } from "react";

export function useInternet(pingUrl) {
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const verifyInternet = useCallback(async () => {
    const res = await fetch(`${pingUrl}?t=${Date.now()}`, { method: 'HEAD', cache: 'no-store' });
    setIsOnline(res.ok);
    return res; // 👈 devuelve la respuesta para que otro hook la use
  }, [pingUrl]);

  return { isOnline, isChecking, verifyInternet };
}
