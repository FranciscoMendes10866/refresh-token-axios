import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";
import { axiosPublic } from "../shared/axiosPublic";
import { axiosPrivate } from "../shared/axiosPrivate";

const Login = () => {
  const [email, setEmail] = useState("fmendes@golang.org");
  const [password, setPassword] = useState("pass");

  const { setUser, setSession } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    async (e) => {
      e.preventDefault();

      const response = await axiosPublic.post("/user/signin", {
        email,
        password,
      });

      if (response.data?.session) {
        const { session } = response.data;

        setSession(session);
        if (session) {
          const result = await axiosPrivate.get("/user");

          if (result.data?.username) {
            setUser(result.data);
            navigate("/lounge");
          }
        }
      }
    },
    [setUser, setSession, navigate, email, password]
  );

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <form onSubmit={login}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type email..."
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password..."
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
