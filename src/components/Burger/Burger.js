import React from 'react';
import styles from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient'

const Burger = (props) => {

    const createIngredient = (ikey, index) => <Ingredient key={ikey + index} type={ikey} />

    let ingredientsArray = Object.keys(props.ingredients)
        .flatMap(
            ikey => [...Array(props.ingredients[ikey])]
                .map((_, index) => createIngredient(ikey, index))
        );

    if(ingredientsArray.length === 0){
        ingredientsArray = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <Ingredient type='bread-top'></Ingredient>
            {ingredientsArray}
            <Ingredient type='bread-bottom'></Ingredient>
        </div>
    );
}

export default Burger;