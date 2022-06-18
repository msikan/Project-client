import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signIn } from "../api/auth";
import { setAuthToken, setAuthEmail } from "../utils/auth";
import Backdrop from "../components/commons/backdrop";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setAuth } from "../store/appSlice";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading,setLoading] = useState(false);

  const [errorMessage,setErroMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser({ email: 'test'}));
  },[])




  const SubmitBtn = async() => {
    setErroMessage("");
    const body = { password, email };
    setLoading(true);
    const result = await signIn(body);
    console.log({result})
    if (result && result.data && result.data.success) {
      setAuthToken(result.data?.token);
      setAuthEmail(email);
      dispatch(setUser({ email }));
      dispatch(setAuth({ token: result.data?.token, isConnected: true }));
      navigate('/');
    } else {
      setErroMessage("password or email not correct")
    }
    setLoading(false);
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div sx={{ }}>
      <Paper elevation={15}>
        <div className="form_container">
          <div className="titleLogin"> Login </div>
          <TextField
            className="input inputLogin"
            label="Username"
            type="text"
            autoComplete="current-password"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="input input_2 inputLogin"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button onClick={SubmitBtn} variant="contained" color="primary">
            Login
          </Button>
          <br />
          <Button onClick={handleRegister} variant="link" color="primary">
            register
          </Button>
          <br />
          <div style={{ color: 'red' }}>
            {errorMessage}
          </div>
        </div>
      </Paper>
      <Backdrop open={loading} />
    </div>
  );
}
