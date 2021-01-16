import { initIngredients } from '../actions/burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

const intialState = {
    orders: [],
    loading: false
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: return {
            ...state,
            loading: true
        };

        case actionTypes.PURCHASE_BURGER_SUCCESS: return {
            ...state,
            loading: false,
            orders: state.orders.concat(action.orderData)
        };

        case actionTypes.PURCHASE_BURGER_FAILED: return {
            ...state,
            loading: false
        };

        default: return state;
    }
}

export default reducer; 