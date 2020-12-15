import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const orderItems = Object.entries(this.props.ingredients)
            .map(([key, value]) => <li key={key}><span style={{ textTransform: "capitalize" }}>{key}</span>: {value}</li>)

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Burger with a next ingredients:</p>
                <ul>
                    {orderItems}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <Button onClick={this.props.onCancel} type="Danger">CANCEL</Button>
                <Button onClick={this.props.onContinue} type="Success">CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;