import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth } from "./context/Auth";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import LoungePage from "./pages/Lounge";
import UnauthorizedPage from "./pages/Unauthorized";
import AuthTimer from "./components/AuthTimer";

const App = () => {
  return (
    <AuthProvider>
      <AuthTimer />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/lounge" element={<LoungePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
