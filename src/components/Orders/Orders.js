import React, { Component } from "react";
import Order from "./Order/Order";
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const ordersList = [];
            for (let [id, order] of Object.entries(response.data)) {
                ordersList.push({ id, ...order });
            }
            this.setState({ orders: ordersList });
        }).finally(() => {
            this.setState({ loading: false })
        });
    }

    render() {
        return (<div>
            {this.state.orders.map(order => (
                <Order
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))}
        </div>
        )
    }
}

export default withErrorHandler(Orders, axios);