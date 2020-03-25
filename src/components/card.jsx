import React, { Component } from 'react';
import '../assets/css/card.css'

class Card extends Component{
    tes = () => {
        this.props.delete(this.props.products.id);
    }
    render(){
        return(
            <div>
                <div className = "card-container">
                    <img className = "card-image" src = {(this.props.products.image)} alt = "tes"/>
                    <div className = "card-badan">
                        <p className = "product-title">{this.props.products.name}</p>
                        <p className = "product-price">Rp {this.props.products.price}</p>
                        <div className = "edit"><img src = {require('../assets/images/pencil.svg')} alt="edit"/></div>
                        <div className = "delete" onClick = {this.tes}><img src = {require('../assets/images/ic_delete_48px.svg')} alt="delete" /></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;