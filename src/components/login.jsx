import React, { Component } from "react";
import "../assets/css/login.css";
import { URL_ADDRESS } from "../env.js";

const URL_STRING = URL_ADDRESS;
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    await fetch(URL_STRING + "users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          this.setState({ error: true });
          this.setState({ loading: false });
        } else {
          this.setState({ error: false });
          this.setState({ loading: false });
          localStorage.setItem("token", data.token);
          localStorage.setItem("cashier", this.state.username);
          this.props.history.push("/product");
        }
      })
      .catch(err => {
        this.setState({ error: true });
        this.setState({ loading: false });
      });
  };

  render() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/product");
    }
    const { loading, error } = this.state;
    return (
      <div>
        <div className="login-container">
          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      placeholder="Username"
                      className="login-input"
                      type="text"
                      value={this.state.username}
                      name="username"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      placeholder="Password"
                      className="login-input"
                      type="password"
                      value={this.state.password}
                      name="password"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {error && (
              <div
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                  fontSize: 14,
                  color: "red"
                }}
              >
                Incorrect username or password!
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
  }
}

export default Login;
