// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load tokens on mount
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");
    setToken(access);

    // Optional: try to refresh immediately if access is missing
    if (!access && refresh) {
      refreshAccessToken(refresh);
    }

    // ⏱️ Set interval to refresh access token every 14 minutes
    const interval = setInterval(() => {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (storedRefresh) {
        refreshAccessToken(storedRefresh);
      }
    }, 14 * 60 * 1000); // every 14 minutes

    return () => clearInterval(interval);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.access);
        setToken(data.access);
      } else {
        console.warn("Failed to refresh access token. Logging out.");
        logout();
      }
    } catch (err) {
      console.error("Refresh token error:", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
