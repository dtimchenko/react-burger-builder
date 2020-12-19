import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {bacon: 0, cheese: 0, meat: 0, salad: 0}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = param[1];
        }

        debugger;
        this.setState({ ingredients: ingredients })
    }

    continueHadler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    onCancel={this.cancelHandler}
                    onContinue={this.continueHadler}
                    ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;