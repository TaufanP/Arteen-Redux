import React, { Component } from "react";
import "../assets/css/cardHistory.css";
import axios from "axios";
import { URL_ADDRESS } from "../env";

const URL_STRING = URL_ADDRESS;

class CardHistory extends Component {
  constructor() {
    super();
    this.state = {
      checkouts: [],
      income: 0,
      todaysIncome: 0,
      todaysDate: ""
    };
  }
  getCheckout = async () => {
    const date = new Date();
    const fullYear = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const todaysDate = `${fullYear}-${month}-${day}`;
    this.setState({ todaysDate });
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    };
    await axios
      .get(URL_STRING + "checkout/", config)
      .then(res => {
        const checkouts = res.data.result;
        this.setState({ checkouts });
      })
      .catch(err => alert("Fail to get the data"));
    let income = 0;
    let todaysIncome = 0;
    this.state.checkouts.map(value => {
      income = income + value.total
      if(value.last_payment.slice(0,10)===this.state.todaysDate){
        todaysIncome = todaysIncome + value.total
      }
    });
    this.setState({ income });
    this.setState({ todaysIncome });
  };
  componentDidMount() {
    this.getCheckout();
  }
  render() {
    return (
      <div className="card-history-container">
        <div className="item-container-history">
          <div className="card-history">
            <div className="card-detail">
              <div className="sub-history">Income</div>
              <div className="number-history">Rp. {this.state.income}</div>
            </div>
          </div>
          <div className="card-history" style={{ backgroundColor: "#4cbed8" }}>
            <div className="card-detail">
              <div className="sub-history">Orders</div>
              <div className="number-history">
                {this.state.checkouts.length}
              </div>
            </div>
          </div>
          <div className="card-history" style={{ backgroundColor: "#b64cd8" }}>
            <div className="card-detail">
              <div className="sub-history">Today's Income</div>
              <div className="number-history">Rp. {this.state.todaysIncome}</div>
            </div>
          </div>
        </div>
        <h2>Recent Orders</h2>
        <div className="table-container">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  Invoice
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  Total Price
                </td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  Last Payment
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.checkouts &&
                this.state.checkouts.map(value => {
                  return (
                    <tr style={{ padding: 8 }} key={value.id}>
                      <td style={{ textAlign: "center", padding: 8 }}>
                        {value.invoice}
                      </td>
                      <td style={{ textAlign: "center", padding: 8 }}>
                        Rp. {value.total}
                      </td>
                      <td style={{ textAlign: "center", padding: 8 }}>
                        {value.last_payment
                          .replace(/[TZ.]/gi, " ")
                          .slice(0, 19)}{" "}
                        UTC
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CardHistory;
