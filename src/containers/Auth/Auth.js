import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true,
                    isEmail: true,
                    minLength: 6
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    valid: false,
                    required: true,
                    minLength: 6
                }
            },
        }
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

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validation: {
                    ...this.state.controls[controlName].validation,
                    valid: this.isValid(event.target.value, this.state.controls[controlName].validation)
                }
            }
        }

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value
        );
    }

    render() {
        const formElements = Object.entries(this.state.controls)
            .map(([key, config]) => (
                <Input key={key}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    onChange={(event) => { this.inputChangeHandler(event, key) }}
                    invalid={config.validation && !config.validation.valid} />
            ));

        return (
            <div className={styles.Auth}>
                <form onSubmit={this.submitHandler}>
                    {formElements}
                    <Button type='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => { dispatch(actions.auth(email, password)) }
    };
};

export default connect(null, mapDispatchToProps)(Auth);