import React from 'react';
import styles from "./Order.module.css";

const order = (props) => {
    return(
        <div className={styles.Order}>
            <p>Order ingedients: </p>
            <p>Total Price : <strong>{props.price}</strong></p>
        </div>
    );
}

export default order;