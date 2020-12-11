import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
        { 'label': 'Salad', 'type': 'salad' },
        { 'label': 'Cheese', 'type': 'cheese' },
        { 'label': 'Meat', 'type': 'meat' },
        { 'label': 'Bacon', 'type': 'bacon' }
]

const BuildControls = (props) => (
        <div className={styles.BuildControls}>
                <p>Burger Price: <strong>{props.price.toFixed(2)}</strong></p>
                {controls.map(item =>
                        <BuildControl
                                onIngredientAdd={() => props.onIngredientAdd(item.type)}
                                onIngredientRemove={() => props.onIngredientRemove(item.type)}
                                disabled={props.disabledInfo[item.type]}
                                key={item.type}
                                label={item.label} />)}
                <button className={styles.OrderButton}
                        onClick={props.onOrder}
                        disabled={!props.purchasable}>ORDER NOW</button>
        </div>
);

export default BuildControls;