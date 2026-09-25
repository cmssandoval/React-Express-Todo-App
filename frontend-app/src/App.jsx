import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { UserContext } from "./providers/UserProvider";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const App = () => {
  const { token } = useContext(UserContext);

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={ token ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={ token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={ token ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Routes>
    </div>
  );
};

export default App;