import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import axios from "axios";
import { URL_ADDRESS } from "../env";

const URL_STRING = URL_ADDRESS;
const Registration = props => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    if (name === "") {
      setError("Complete Name");
    } else if (username === "") {
      setError("Username");
    } else if (password === "") {
      setError("Password");
    } else {
      const data = {
        name,
        username,
        password
      };
      setLoading(true);
      await axios
        .post(URL_STRING + "users/", data)
        .then(res => {
          props.history.push("/");
          setLoading(false);
        })
        .catch(err => {
          alert("Registration failed! Please try again!");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      props.history.push("/product");
    } // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Complete Name"
                    className="login-input"
                    type="text"
                    value={name}
                    name="name"
                    onChange={event => setName(event.target.value)}
                  />
                </td>
              </tr>
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
                    onChange={event => setPassword(event.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {error !== "" && (
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 14,
                color: "red"
              }}
            >
              {error} cannot be empty!
            </div>
          )}
          {loading ? (
            <button className="processing" type="submit">
              <span style={{ color: "#333" }}>PROCESSING . . .</span>
            </button>
          ) : (
            <button className="login" type="submit">
              <span style={{ color: "#FFF" }}>SIGN UP</span>
            </button>
          )}
        </form>
        <div
          className="signup-link"
          style={{ fontSize: 12 }}
          onClick={() => props.history.push("/")}
        >
          Already have an account?{" "}
          <span style={{ color: "rgb(28, 150, 65)", fontSize: 12 }}>
            SIGN IN
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
