import React, {Component} from 'react';

class Product extends Component{
    state = {
        counter: 0
    }

    onIncrement = () => {
        let counter = this.state.counter
        counter += 1;
        this.setState({counter})
    }

    onDecrement = () => {
        let counter = this.state.counter
        if(counter > 0){
            counter -= 1;
            this.setState({counter})
        }else{
            counter -= 0;
            this.setState({counter})
        }
    }
    render(){
        return(
            <div>
                <p>{this.props.cart.name}</p>   
                <p>{this.props.cart.price*this.state.counter}</p>        
                <p>{this.state.counter}</p>
                <button onClick = {this.onIncrement}>tes</button><button onClick = {this.onDecrement}>-</button>
            </div>
        )
    }
}

export default Product;