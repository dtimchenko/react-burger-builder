import React from 'react';
import styles from "./Order.module.css";

const order = (props) => {

    const ingridientsString = props.ingredients
        ? Object.entries(props.ingredients)
            .map(([key, val]) => key + ': ' + val)
            .join(', ')
        : 'N/A';

    const price = props.price
        ? Number.parseFloat(props.price).toFixed(2)
        : 0;

    return (
        <div className={styles.Order}>
            <p>ID: {props.id}</p>
            <p>Ingedients: {ingridientsString}</p>
            <p>Total Price : <strong>{price}</strong></p>
        </div>
    );
}

export default order;