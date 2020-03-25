import React, { Component } from "react";
import "../assets/css/login.css";
import { URL_ADDRESS } from "../env.js";
import axios from "axios";

const URL_STRING = URL_ADDRESS;
class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "",
        password: ""
      },
      loading: false,
      error: false,
      errMsg: ""
    };
  }

  handleChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({
      user
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let data = this.state.user;
    if (data) {
      this.setState({ loading: true });
      await axios.post(URL_STRING + "users/login/", data).then(res => {
        if (res.data.msg === "Token is invalid") {
          this.setState({
            errMsg: res.data.msg,
            loading: false
          });
          this.setState({ error: true });
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("cashier", this.state.username);
          this.setState({ error: false });
          this.setState({ loading: false });
          this.props.history.push("/product");
        }
      });
    } else {
      this.setState({ errMsg: "Cant be null" });
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/product");
    }
  }

  render() {
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
