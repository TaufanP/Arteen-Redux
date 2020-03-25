import React, {Component} from 'react';

class Sorts extends Component{
    render(){
        return(
            <div>
                <label>Sort by: </label>
                <select name = "sort" onChange = {this.props.handleChange}>
                    <option value = "none">None</option>
                    <option value = "name">Name</option>
                </select>
                <button type = "submit" onClick = {()=>this.props.getProductSort(this.props.sort)}>submit</button>
            </div>
        )
    }
}

export default Sorts;