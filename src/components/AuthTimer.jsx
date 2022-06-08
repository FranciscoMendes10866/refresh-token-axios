import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import { useAuth, authStore } from "../context/Auth";
import { memoizedRefreshToken } from "../shared/refreshToken";

const AuthTimer = observer(() => {
  const { isLoggedIn, resetTimer, tickTimer } = useAuth();

  useEffect(() => {
    autorun(async () => {
      if (authStore.currentTimer === 0) {
        await memoizedRefreshToken();
        resetTimer();
      }
    });
  }, []);

  useEffect(() => {
    let intervalId;

    if (isLoggedIn) {
      intervalId = setInterval(() => tickTimer(), 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoggedIn]);

  return null;
});

export default AuthTimer;
