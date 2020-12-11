import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <div className={styles.Modal}
            style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            {props.children}
        </div>
        <Backdrop show={props.show} onClick={props.onHide}/>

    </Aux>

);

export default modal;