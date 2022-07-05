import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import RegisterPage from "./register";

import useUserAuth from "../hooks/useUserAuth";
import Backdrop from "../components/commons/backdrop";
import Room from "./room";
import Chat from "./chat";


const Main = () => {
  const { loading } = useUserAuth();

  if (loading) return <Backdrop open={true} />;

  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/room" element={<Room />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default Main;
