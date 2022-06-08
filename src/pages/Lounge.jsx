import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { axiosPublic } from "../shared/axiosPublic";

const Lounge = () => {
  const { currentUser, currentSession, clearStore } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await axiosPublic.post("/user/logout", {
        refreshToken: currentSession.refreshToken,
      });

      if (response.status === 200) {
        clearStore();
        navigate("/");
      }
    },
    [clearStore, navigate]
  );

  return (
    <div>
      <h1>Lounge page</h1>
      <p>
        Hello <strong>{currentUser?.username}</strong>!
      </p>
      <p>Looks like you have access to this private route!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Lounge;
