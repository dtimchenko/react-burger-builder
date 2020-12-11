import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const orderItems = Object.entries(props.ingredients)
        .map(([key, value]) => <li key={key}><span style={{ textTransform: "capitalize" }}>{key}</span>: {value}</li>)

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Burger with a next ingredients:</p>
            <ul>
                {orderItems}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <Button onClick={props.onCancel} type="Danger">CANCEL</Button>
            <Button onClick={props.onContinue} type="Success">CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;