import mem from "mem";

import { axiosPublic } from "./axiosPublic";
import { authStore } from "../context/Auth";

const refreshTokenFn = async () => {
  try {
    const response = await axiosPublic.post("/user/refresh", {
      refreshToken: authStore.currentSession?.refreshToken,
    });

    const { session } = response.data;

    if (!session?.accessToken) {
      authStore.clearStore();
    }

    authStore.setSession(session);

    return session;
  } catch (error) {
    authStore.clearStore();
  }
};

const fiveSecondsInMs = 5000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge: fiveSecondsInMs,
});
