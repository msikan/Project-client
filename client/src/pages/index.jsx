import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import RegisterPage from "./register";

import useUserAuth from '../hooks/useUserAuth';
import Backdrop from "../components/commons/backdrop";

const Main = () => {

  const { loading } = useUserAuth();

  if (loading) return <Backdrop open={true} />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Main;
