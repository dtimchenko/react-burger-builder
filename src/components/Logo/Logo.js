import React from 'react';
import bugerImg from '../../assets/burger-logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={bugerImg} alt="Burger builder"/>
    </div>
);

export default logo;