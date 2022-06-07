import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function Card() {
  let [Username, setUsername] = useState("");
  let [Password, setPassword] = useState("");
  let [DataStore, setDataStore] = useState([]);

  const SubmitBtn = () => {
    const DataToStore = { Username, Password };
    if (Username && Password) {
      setDataStore((preVal) => {
        return [...preVal, DataToStore];
      });
      setUsername("");
      setPassword("");
    } else {
      alert("fill the values");
    }
  };

  return (
    <div sx={{ }}>
      <Paper elevation={15}>
        <div className="form_container">
          <div className="titleLogin"> Login </div>
          <TextField
            className="input inputLogin"
            id="standard-password-input"
            label="Username"
            type="text"
            autoComplete="current-password"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="input input_2 inputLogin"
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button onClick={SubmitBtn} variant="contained" color="primary">
            Login
          </Button>
        </div>
        <div className="ListContainer">
          {DataStore.map((ArrData) => {
            const { Username, Password } = ArrData;
            return (
              <>
                <div className="ListStyle">
                  <p> {Username} </p>
                  <p> {Password} </p>
                </div>
              </>
            );
          })}
        </div>
      </Paper>
    </div>
  );
}
