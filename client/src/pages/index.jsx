import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Main;
