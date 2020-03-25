import React, { Component } from "react";
import "../assets/css/loginWarn.css";
import TrainMenu from "./trainMenu";
import Header from "./header";
import CardHistory from "./cardHistory";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  relogin = () => {
    this.props.history.push("/product");
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/loginwarn");
    }
  }
  render() {
    return (
      <div>
        <Header />
        <TrainMenu  showModal={this.showModal} />
        <CardHistory />
      </div>
    );
  }
}

export default History;
