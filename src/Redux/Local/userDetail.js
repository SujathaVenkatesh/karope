import { useEffect, useState } from "react";
import { USER_DETAILS } from "./localconstants";

export default function useUser() {
  const getuser = () => {
    const userString = JSON.parse(localStorage.getItem(USER_DETAILS));
    return userString;
  };

  const [user, setUser] = useState(getuser());

  const saveUser = (userDetails) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));
    setUser(userDetails);
    // Notify other hook instances in the same tab
    window.dispatchEvent(new CustomEvent("auth:user", { detail: userDetails }));
  };

  // Sync user state across components on localStorage or custom auth events
  useEffect(() => {
    const onStorage = (e) => {
      try {
        if (e.key === USER_DETAILS) {
          const next = e.newValue ? JSON.parse(e.newValue) : null;
          setUser(next);
        }
      } catch {}
    };
    const onUserEvent = (e) => {
      setUser(e.detail ?? null);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth:user", onUserEvent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:user", onUserEvent);
    };
  }, []);

  return {
    setUser: saveUser,
    user,
  };
}
