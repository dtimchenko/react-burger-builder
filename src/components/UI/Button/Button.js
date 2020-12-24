import React from 'react';
import styles from './Button.module.css';

const button = (props) => (
    <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={[styles.Button, styles[props.type]].join(' ')}>
        {props.children}
    </button>
);

export default button;