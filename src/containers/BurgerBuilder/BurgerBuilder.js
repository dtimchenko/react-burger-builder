import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasing: false
    }

    addIngredientHadler = (type) => this.ingredientChange(type, (total, item) => total + item)

    removeIngredientHandler = (type) => this.ingredientChange(type, (total, item) => total - item)

    ingredientChange = (type, changer) => {
        const oldCount = this.state.ingredients[type];
        const newCount = changer(oldCount, 1);
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;

        const totalPrice = this.state.totalPrice;
        const updatedPrice = changer(totalPrice, INGREDIENT_PRICES[type]);

        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
    }

    purchasable = () => {
        return Object.values(this.state.ingredients).some(item => item > 0);
    }

    purchanseHandler = () => this.setState({ purchasing: true });

    purchaseCancelHandler = () => this.setState({ purchasing: false });

    purchaseContinuehandler = () => { }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} onHide={this.purchaseCancelHandler}>
                    <OrderSummary
                        onCancel={this.purchaseCancelHandler}
                        onContinue={this.purchaseContinuehandler}
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuilderControls
                    price={this.state.totalPrice}
                    onIngredientAdd={this.addIngredientHadler}
                    onIngredientRemove={this.removeIngredientHandler}
                    purchasable={this.purchasable()}
                    onOrder={this.purchanseHandler}
                    disabledInfo={disabledInfo} />
            </Aux>
        );
    }
}

export default BurgerBuilder;