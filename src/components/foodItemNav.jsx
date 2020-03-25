import React, { Component } from "react";
import '../assets/css/navbar.css';

class FoodItemNav extends Component{
    render(){
        return(
            <div className = "app-title">
                <span className = "title">{this.props.text}</span>
            </div>
        )
    }
}

export default FoodItemNav;