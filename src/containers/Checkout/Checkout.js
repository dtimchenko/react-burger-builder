import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../components/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/order';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    continueHadler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {

        const summary = this.props.ingredients || !this.props.purchased
            ? <CheckoutSummary
                onCancel={this.cancelHandler}
                onContinue={this.continueHadler}
                ingredients={this.props.ingredients} />
            : <Redirect to="/" />;

        return (
            <div>
                {summary}
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);