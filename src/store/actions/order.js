import * as actions from './actionTypes';
import axios from '../../hoc/axios-orders';

const purchaseBurgerSuccess = (orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        orderData: orderData
    }
};

const purchaseBurgerFailed = (error) => {
    return {
        type: actions.PURCHASE_BURGER_FAILED,
        error: error
    }
};

const purchaseBurgerStart = () => {
    return {
        type: actions.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json', order)
            .then(response => {
                const orderData = {
                    ...order,
                    id: response.data.name
                }
                dispatch(purchaseBurgerSuccess(orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
};

