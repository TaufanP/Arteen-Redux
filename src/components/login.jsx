import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import { URL_ADDRESS } from "../env.js";
import axios from "axios";

const URL_STRING = URL_ADDRESS;
const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    if (username === "") setErrMsg("Username cannot be empty!");
    else if (password === "") setErrMsg("Password cannot be empty!");
    else {
      const data = {
        username,
        password
      };
      setLoading(true);
      await axios
        .post(URL_STRING + "users/login/", data)
        .then(res => {
          if (res.data.message) {
            setErrMsg("Incorrect username or password!");
            setLoading(false);
          } else if (res.data.token) {
            setLoading(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("cashier", username);
            setErrMsg("");
            props.history.push("/product");
          }
        })
        .catch(err => {
          setErrMsg("Incorrect username or password!");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      props.history.push("/product");
    }
  });

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Username"
                    className="login-input"
                    type="text"
                    value={username}
                    name="username"
                    onChange={event => setUsername(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    placeholder="Password"
                    className="login-input"
                    type="password"
                    value={password}
                    name="password"
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {errMsg && (
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 14,
                color: "red"
              }}
            >
              {errMsg}
            </div>
          )}

          {loading ? (
            <button className="processing" type="submit">
              <span style={{ color: "#333" }}>PROCESSING . . .</span>
            </button>
          ) : (
            <button className="login" type="submit">
              <span style={{ color: "#FFF" }}>SIGN IN</span>
            </button>
          )}
        </form>
        <div
          className="signup-link"
          style={{ fontSize: 14 }}
          onClick={() => this.props.history.push("/regist")}
        >
          Do not have an account?{" "}
          <span style={{ color: "rgb(28, 150, 65)", fontSize: 14 }}>
            SIGN UP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
