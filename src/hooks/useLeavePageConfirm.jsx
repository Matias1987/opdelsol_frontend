import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export const useLeavePageConfirm = (isConfirm) => {
  const router = useRouter();
  const confirmedRef = useRef(false);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      //alert("before unload");
      event.preventDefault();
      event.returnValue = "";
      return ""; // For modern browsers
    };

    const handleRouteChangeStart = (url) => {
      if (!confirmedRef.current) {
        if (
          (window.confirm(
            "Are you sure you want to leave? Your changes may not be saved.",
          ))
        ) {
          confirmedRef.current = true;
          router.push(url);
        } else {
          router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error."; // Stop navigation
        }
      } else {
        // reset flag once navigation is allowed
        confirmedRef.current = false;
      }
    };

    //alert("window add event listener");
    window.addEventListener("beforeunload", handleBeforeUnload);

    // For client-side route changes (Next.js Link component)
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);
};
