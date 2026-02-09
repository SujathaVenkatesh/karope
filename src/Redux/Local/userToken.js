import { useEffect, useState } from "react";
import { TOKEN } from "./localconstants";

export default function useToken() {
  const getToken = () => {
    const tokenString = JSON.parse(localStorage.getItem(TOKEN));

    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(TOKEN, JSON.stringify(userToken));
    setToken(userToken);
    // Notify other hook instances in the same tab
    window.dispatchEvent(new CustomEvent("auth:token", { detail: userToken }));
  };

  // Keep all hook instances in sync when localStorage changes or when
  // a custom auth event is dispatched within the same tab/app.
  useEffect(() => {
    const onStorage = (e) => {
      try {
        if (e.key === TOKEN) {
          const next = e.newValue ? JSON.parse(e.newValue) : null;
          setToken(next);
        }
      } catch {}
    };
    const onTokenEvent = (e) => {
      setToken(e.detail ?? null);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth:token", onTokenEvent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:token", onTokenEvent);
    };
  }, []);

  return {
    setToken: saveToken,
    token,
  };
}
