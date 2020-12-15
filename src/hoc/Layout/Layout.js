import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    menuClickHandled = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar onMenuClick={this.menuClickHandled} />
                <SideDrawer
                    show={this.state.showSideDrawer}
                    onHide={this.sideDrawerCloseHandler} />
                <main className={styles.Content}>{this.props.children}</main>
            </Aux >
        );
    }
}

export default Layout;