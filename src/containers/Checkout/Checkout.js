import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

    state = {
        ingredients: null
    }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}/>
            </div>
        );
    }
}

export default Checkout;