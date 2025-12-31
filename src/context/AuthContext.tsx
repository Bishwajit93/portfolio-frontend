"use client";

import { API_BASE_URL } from "@/lib/api/apiBase";
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
  refreshNow: () => Promise<void>;
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
      const res = await fetch(`${API_BASE_URL}/auth/jwt/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

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
    },
    [logout]
  );

  const refreshNow = useCallback(async () => {
    const storedRefresh = localStorage.getItem("refreshToken");
    if (!storedRefresh) return;
    await refreshAccessToken(storedRefresh);
  }, [refreshAccessToken]);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    setToken(access);
    setHydrated(true);

    // If we have refresh, keep access fresh proactively
    if (refresh) {
      // Refresh soon after load (helps if access is expired)
      refreshAccessToken(refresh);

      // Then refresh repeatedly
      const interval = setInterval(() => {
        const r = localStorage.getItem("refreshToken");
        if (r) refreshAccessToken(r);
      }, 14 * 60 * 1000);

      return () => clearInterval(interval);
    }

    return;
  }, [refreshAccessToken]);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(accessToken);
  };

  return (
    <AuthContext.Provider value={{ token, hydrated, login, logout, refreshNow }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
