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

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
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


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        orders: orders 
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAILED,
        error: error 
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json').then(response => {
            const ordersList = [];
            for (let [id, order] of Object.entries(response.data)) {
                ordersList.push({ id, ...order });
            }
            dispatch(fetchOrdersSuccess(ordersList));
        }).catch((error) => {
            dispatch(fetchOrdersFailed(error));
        });
    }
};
