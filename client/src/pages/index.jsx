import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import RegisterPage from "./register";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Main;
