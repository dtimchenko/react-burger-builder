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
                value: '',
                validation: {
                    valid: false,
                    required: true,
                    minLength: 3,
                    maxLength: 10
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', display: 'Fastest' },
                        { value: 'cheapest', display: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        isFormValid: false
    };

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

    orderHandler = () => {
        const formData = {};
        Object.entries(this.state.orderForm).forEach(([key, value]) => formData[key] = value.value);

        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customerData: formData
        }

        this.postOrder(orderData);
    }

    inputChangeHandler = (event, inputId) => {
        let updatedForm = { ...this.state.orderForm };
        let updatedInput = { ...updatedForm[inputId] };
        let validation = { ...updatedInput.validation };

        updatedInput.value = event.target.value;

        validation.valid = this.isValid(updatedInput.value, validation);
        updatedInput.validation = validation;

        updatedForm[inputId] = updatedInput;

        const formValidationResult = !Object.values(updatedForm).map(config => config.validation ? config.validation.valid : true).some(it => !it);

        this.setState({ orderForm: updatedForm });
        this.setState({isFormValid: formValidationResult});
    }

    isValid = (value, rules) => {
        let validationResult = true;

        if (rules.required) {
            validationResult = value.trim() !== '' && validationResult;
        }

        if (rules.minLength) {
            validationResult = value.trim().length >= rules.minLength && validationResult;
        }

        if (rules.maxLength) {
            validationResult = value.trim().length <= rules.maxLength && validationResult;
        }

        return validationResult;
    }

    render() {
        const formElements = Object.entries(this.state.orderForm)
            .map(([key, config]) => (
                <Input key={key}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    onChange={(event) => { this.inputChangeHandler(event, key) }}
                    invalid={config.validation && !config.validation.valid} />
            ));

        return (
            <div className={styles.ContactData}>
                <h4>Enter Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElements}
                    <Button type='Success' onClick={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;