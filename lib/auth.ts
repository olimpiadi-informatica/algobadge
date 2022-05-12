import cookie from "cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type LoggedUser = {
  username: string;
  impersonated?: boolean;
};

function getParsedCookie(): LoggedUser | null {
  const cookies = cookie.parse(window.document.cookie);
  if (!cookies.token) {
    return null;
  }
  const token = cookies.token;
  const [_key, userData, _signature] = token.split(".");
  try {
    const base64 = userData.replace(/-/g, "+").replace(/_/g, "/");
    const decodedBase64 = atob(base64);
    return JSON.parse(decodedBase64);
  } catch {
    return null;
  }
}

function getImpersonatedUser(username: string): LoggedUser {
  return {
    username,
    impersonated: true,
  };
}

export function useLoggedUser(): LoggedUser | null | undefined {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null | undefined>(
    undefined
  );
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.impersonate) {
      const impersonatedUser = getImpersonatedUser(
        router.query.impersonate as string
      );
      console.log("Impersonating", impersonatedUser);
      setLoggedUser(impersonatedUser);
    } else {
      const parsedCookie = getParsedCookie();
      console.log("User is", parsedCookie);
      setLoggedUser(parsedCookie);
    }
  }, [router.query.impersonate, router.isReady]);
  return loggedUser;
}
