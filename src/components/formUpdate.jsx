import React, { Component } from 'react';
import '../assets/css/formUpdate.css';

class FormUpdate extends Component{
    render(){ 
        let modal = "form-update-";
        modal += this.props.productsAll.showUpdate === true ? "show" : "hide";
        return(
            <div className = {modal}>
                <h3 className = "form-title">Update Item</h3>
                {/* <form> */}
                    <table>
                        <tbody>
                        <tr>
                            <td>Name: </td>
                            <td className = "input-field"><input className = "input-product" type = "text" name = "name" onChange = {this.props.handleChange} defaultValue ={this.props.productsAll.edit[0].name}/></td>
                        </tr>
                        <tr>
                            <td>Description: </td>
                            <td className = "input-field"><textarea className = "input-product" type = "text" name = "description" onChange = {this.props.handleChange} defaultValue = {this.props.productsAll.edit[0].description}/></td>
                        </tr>
                        <tr>
                            <td>Price: </td>
                            <td className = "input-field"><input className = "input-product" type = "text" name = "price" onChange = {this.props.handleChange} defaultValue = {this.props.productsAll.edit[0].price}/></td>
                        </tr>
                        <tr>
                            <td>Stock: </td>
                            <td className = "input-field"><input className = "input-product" type = "text" name = "stock" onChange = {this.props.handleChange} defaultValue = {this.props.productsAll.edit[0].stock}/></td>
                        </tr>
                        <tr>
                            <td>Image: </td>
                            <td><input className = "input-image" type = "file" name = "image" onChange = {this.props.handleChangeImage}/></td>
                        </tr>
                        <tr>
                            <td>Category: </td>
                            <td className = "input-field">
                                <select name = "id_category" onChange = {this.props.handleChange}>
                                    <option value = "3">Mainan</option>
                                    <option value = "1">Makanan</option>
                                    <option value = "2">Minuman</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>            
                    <div className = "add-button-product">
                        <button type  = "submit" className ="primary-button" onClick = {() => this.props.handleUpdate(this.props.productsAll.edit[0].id)}>UPDATE</button>
                    </div>
                    <div className = "close-button-product-update">
                        <button className ="secondary-button-update" onClick = {this.props.hideModalUpdate}>CANCEL</button>
                        {/* <button className ="secondary-button" onClick = {this.props.hideModal}>CANCEL</button> */}
                    </div>
                {/* </form> */}
                
                {/* <button type  = "submit" className ="primary-button" onClick = {() => this.props.handleUpdate(this.props.productsAll.edit[0].id)}>UPDATE</button> */}
            </div>
        );
    }
}

export default FormUpdate;