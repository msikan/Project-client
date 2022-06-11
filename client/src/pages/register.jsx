import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signIn, signUp } from "../api/auth";
import { setAuthToken, setAuthEmail } from "../utils/auth";
import Backdrop from "../components/commons/backdrop";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading,setLoading] = useState(false);

  const [errorMessage,setErroMessage] = useState("");

  const navigate = useNavigate();

  const SubmitBtn = async() => {
    setErroMessage("");
    const body = { password, email };
    setLoading(true);
    const result = await signUp(body);
    console.log({result})
    if (result && result.data && result.data.success) {
      setAuthToken(result.data?.token);
      setAuthEmail(email);
      navigate('/');
    } else {
      setErroMessage("password or email not correct")
    }
    setLoading(false);
  };

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div sx={{ }}>
      <Paper elevation={15}>
        <div className="form_container">
          <div className="titleLogin"> Register </div>
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
            Register
          </Button>
          <br />
          <Button onClick={handleLogin} variant="link" color="primary">
            login
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
