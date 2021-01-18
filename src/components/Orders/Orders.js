import React, { Component } from "react";
import Order from "./Order/Order";
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/order';
import Spinner from '../UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = this.props.loading
            ? <Spinner />
            : this.props.orders.map(order => (
                <Order
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ));
        return (<div>{orders}</div>);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));