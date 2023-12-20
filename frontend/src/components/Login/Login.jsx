import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/user";
import "./Login.css";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert(); // import it line 6
  const { loading, message, error } = useSelector((state) => state.login);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // hear dispatch login fun and provide email and password from upper line 9,10 . this whole login form will be dispatch mean through the  frontend\src\actions\user.js /23 
  };
// ! now que is how to pull error and massage from the state . because both err and massage are  exist in state --> login  so go to line 14 
  useEffect(() => {
    if (error) {
      alert.error(error); // if err then show err manage by alert package 
      dispatch({ type: "CLEAR_ERRORS" }); // then next step dispatch CLEAR_ERRORS in reducer.js line 71
    }
    if (message) { // same step occur hear
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [alert, error, message, dispatch]);

  return (
    <div className="login">
      <div className="loginContainer">
        <form className="loginForm" onSubmit={submitHandler}>
          <Typography variant="h4">
            <p>A</p>
            <p>D</p>
            <p>M</p>
            <p>I</p>
            <p style={{ marginRight: "1vmax" }}>N</p>

            <p>P</p>
            <p>A</p>
            <p>N</p>
            <p>E</p>
            <p>L</p>
          </Typography>

          <div>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
