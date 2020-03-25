import React, { Component } from "react";
import '../assets/css/navbar.css';

class SearchBarNav extends Component{
    render(){
        return(
            <div className = "search-bar">
                <input type = "text" onChange = {this.props.handleSearch} placeholder = "Search something"/>
            </div>
        )
    }
}

export default SearchBarNav;