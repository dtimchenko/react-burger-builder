import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import styles from './ContactData.module.css';
import axios from "../../../hoc/axios-orders";
import Input from "../../UI/Input/Input";


class ContactData extends Component {

    state = { 
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'}
                    ]
                },
                value: ''
            }
        }
    };

    defaultOrder = {
        ingredients: this.state.ingredients,
        price: this.state.price,

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

        const formElements = Object.entries(this.state.orderForm)
        .map(([key, config]) => (
            <Input key={key} 
            elementType={config.elementType} 
            elementConfig={config.elementConfig}
            value={config.value}/>
        ));

        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                <form>
                    {formElements}
                    <Button type='Success' onClick={this.onClickHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;