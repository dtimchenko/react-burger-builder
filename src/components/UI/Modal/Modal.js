import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Aux>
                <div className={styles.Modal}
                    style={{
                        opacity: this.props.show ? '1' : '0',
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
                    }}>
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} onClick={this.props.onHide} />
            </Aux>
        );
    }
}

export default Modal;