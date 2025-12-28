// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface AuthContextType {
  token: string | null;
  hydrated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  }, []);

  const refreshAccessToken = useCallback(
    async (refreshToken: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );

        if (!res.ok) {
          logout();
          return;
        }

        const data = await res.json();
        if (data?.access) {
          localStorage.setItem("accessToken", data.access);
          setToken(data.access);
        } else {
          logout();
        }
      } catch {
        logout();
      }
    },
    [logout]
  );

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    setToken(access);
    setHydrated(true);

    if (!access && refresh) {
      refreshAccessToken(refresh);
    }

    const interval = setInterval(() => {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (storedRefresh) {
        refreshAccessToken(storedRefresh);
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshAccessToken]);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(accessToken);
  };

  return (
    <AuthContext.Provider value={{ token, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
