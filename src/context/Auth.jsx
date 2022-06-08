import { createContext, useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { AuthStore } from "../store/AuthStore";
import { axiosPrivate } from "../shared/axiosPrivate";

export const authStore = new AuthStore();

const AuthContext = createContext(authStore);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const hydrate = async () => {
    const sessionItem = localStorage.getItem("session");
    const userItem = localStorage.getItem("user");

    if (!sessionItem || !userItem) {
      authStore.clearStore();
      return;
    }

    const session = JSON.parse(sessionItem);

    if (!session?.accessToken) {
      authStore.clearStore();
      return;
    }

    authStore.setSession(session);

    const result = await axiosPrivate.get("/user");

    if (result.data?.username) {
      authStore.setUser(result.data);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{ pathname: "/unauthorized", state: { from: location } }}
        replace
      />
    );
  }

  return <Outlet />;
};
