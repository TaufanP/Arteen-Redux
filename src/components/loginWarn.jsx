import React, { useEffect } from "react";
import "../assets/css/loginWarn.css";

const LoginWarn = props => {
  const relogin = () => {
    props.history.push("/");
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      props.history.push("/product");
    }// eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="login-warn">You need to login first!</div>
      <div className="login-button" onClick={relogin}>
        LOG IN
      </div>
    </div>
  );
};

export default LoginWarn;
