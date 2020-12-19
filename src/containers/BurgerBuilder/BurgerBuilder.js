import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../hoc/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    defaultOrder = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: 'Test User',
            address: {
                street: 'Teststreet 1',
                zipCode: 45678,
                country: 'USA'
            },
            email: 'test@test.com'
        }
    }

    loadIngredients = () => {
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            });
    }

    componentDidMount = () => {
        this.loadIngredients();
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

    postOrder = (order) => {
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // this.postOrder(this.defaultOrder);

        debugger;
        const queryparams = [];
        for(let [key, value] of Object.entries(this.state.ingredients)){
            queryparams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }

        const queryString = queryparams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    render() {

        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = this.state.loading || !this.state.ingredients
            ? <Spinner />
            : <OrderSummary
                onCancel={this.purchaseCancelHandler}
                onContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} />;

        let burger = this.state.ingredients
            ? <Burger ingredients={this.state.ingredients} />
            : <Spinner />;

        let builderControls = this.state.ingredients
            ? <BuilderControls
                price={this.state.totalPrice}
                onIngredientAdd={this.addIngredientHadler}
                onIngredientRemove={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);