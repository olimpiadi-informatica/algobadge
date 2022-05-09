import cookie from "cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type LoggedUser = {
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  id: number;
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
    picture: "",
    firstName: username,
    lastName: "",
    email: "",
    id: 0,
  };
}

export function useLoggedUser(): LoggedUser | null | undefined {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null | undefined>(
    undefined
  );
  useEffect(() => {
    if (router.query.impersonate) {
      console.log("Impersonating", router.query.impersonate);
      setLoggedUser(getImpersonatedUser(router.query.impersonate as string));
    } else {
      setLoggedUser(getParsedCookie());
    }
  }, [router.query.impersonate]);
  return loggedUser;
}
