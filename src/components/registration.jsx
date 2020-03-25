import React, { Component } from "react";
import "../assets/css/login.css";
import axios from "axios";
import { URL_ADDRESS } from "../env";

const URL_STRING = URL_ADDRESS;
class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      password: "",
      loading: false,
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async event => {
    const { name, username, password } = this.state;
    event.preventDefault();
    if (name === "") {
      this.setState({ error: "Complete Name" });
    } else if (username === "") {
      this.setState({ error: "Username" });
    } else if (password === "") {
      this.setState({ error: "Password" });
    } else {
      const data = {
        name,
        username,
        password
      };
      this.setState({ loading: true });
      await axios
        .post(URL_STRING + "users/", data)
        .then(res => {
          this.props.history.push("/");
          this.setState({ loading: false });
        })
        .catch(err => {
          alert("Registration failed! Please try again!");
          this.setState({ loading: false });
        });
    }
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
                      placeholder="Complete Name"
                      className="login-input"
                      type="text"
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
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
            onClick={() => this.props.history.push("/")}
          >
            Already have an account?{" "}
            <span style={{ color: "rgb(28, 150, 65)", fontSize: 12 }}>
              SIGN IN
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
