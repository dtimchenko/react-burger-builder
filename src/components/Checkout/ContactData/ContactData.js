import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import styles from './ContactData.module.css';
import axios from "../../../hoc/axios-orders";


class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };

    defaultOrder = {
        ingredients: this.state.ingredients,
        price: this.state.price,
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

    postOrder = (order) => {
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });

        this.props.history.push('/');
    }

    onClickHandler = () => {
        this.postOrder(this.defaultOrder);
    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your name'/>
                    <input type='text' name='email' placeholder='Your email'/>
                    <input type='text' name='street' placeholder='Your street'/>
                    <input type='text' name='postalCode' placeholder='Your code'/>
                    <Button type='Success' onClick={this.onClickHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;