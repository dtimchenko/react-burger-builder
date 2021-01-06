import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../hoc/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {

    state = {
        // totalPrice: 4,
        purchasing: false,
        loading: false
    }

    loadIngredients = () => {
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            });
    }

    purchasable = () => {
        return Object.values(this.props.ingredients).some(item => item > 0);
    }

    purchanseHandler = () => this.setState({ purchasing: true });

    purchaseCancelHandler = () => this.setState({ purchasing: false });

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = this.state.loading || !this.props.ingredients
            ? <Spinner />
            : <OrderSummary
                onCancel={this.purchaseCancelHandler}
                onContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice}
                ingredients={this.props.ingredients} />;

        let burger = this.props.ingredients
            ? <Burger ingredients={this.props.ingredients} />
            : <Spinner />;

        let builderControls = this.props.ingredients
            ? <BuilderControls
                price={this.props.totalPrice}
                onIngredientAdd={this.props.onIngredientAdd}
                onIngredientRemove={this.props.onIngredientRemove}
                purchasable={this.purchasable()}
                onOrder={this.purchanseHandler}
                disabledInfo={disabledInfo} />
            : null;

        return (
            <Aux>
                <Modal show={this.state.purchasing} onHide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                {builderControls}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return { 
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(actions.removeIngredient(ingredientName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));