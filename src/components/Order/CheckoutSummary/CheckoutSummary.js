import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./Checkout.module.css"

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Order Summary:</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button type='Danger'>CANCEL</Button>
            <Button type='Success'>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;