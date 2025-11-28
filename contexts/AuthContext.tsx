"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  refresh: () => void;
  logout: () => void;
  email: string;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  refresh: () => { },
  logout: () => { },
  email: "",
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const refresh = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("[Auth] Status API response:", data);
        setIsLoggedIn(data.logged_in);
        setEmail(data.email);
      })
      .catch((err) => {
        console.error("[Auth] Status check failed:", err);
        setIsLoggedIn(false);
      });
  };

  const logout = () => {
    console.log("[Auth] Logging out...");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "GET",
      credentials: "include",
    }).finally(() => {
      setIsLoggedIn(false);
      window.location.href = "/";
    });
  };

  // 처음 로딩될 때 1번만 실행
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, refresh, logout, email }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
