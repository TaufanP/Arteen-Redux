import React, { useState, useEffect } from "react";
import "../assets/css/loginWarn.css";
import TrainMenu from "./trainMenu";
import Header from "./header";
import CardHistory from "./cardHistory";

const History = props => {// eslint-disable-next-line
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      props.history.push("/loginwarn");
    }// eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <TrainMenu showModal={showModal} />
      <CardHistory />
    </div>
  );
};

export default History;
