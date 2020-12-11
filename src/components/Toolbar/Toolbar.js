import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const toolbar = () => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <NavigationItems></NavigationItems>
    </header>
);

export default toolbar;