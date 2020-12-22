import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../components/Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = parseInt(param[1]);
            }
        }

        this.setState({ ingredients: ingredients, price: price })
    }

    continueHadler = () => {
        this.props.history.replace('/checkout/contact-data');
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
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;