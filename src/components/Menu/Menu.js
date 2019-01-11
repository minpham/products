import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        to: '/',
        name: 'Trang chủ',
        exact: true
    },
    {
        to: '/product-list',
        name: 'Quản lý sản phẩm',
        exact: false
    }
]

const MenuLink = ({label, to, activeOnlyWhentExact}) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhentExact}
            children={ ({match}) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

class Menu extends Component {
    render() {
        return (
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <a className="navbar-brand" href="\#">Call API</a>
                    <ul className="nav navbar-nav">
                        { this.showMenus(menus) }
                    </ul>
                </div>
            </div>
        )
    }
    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink 
                        key={index}
                        to={menu.to}
                        label={menu.name}
                        activeOnlyWhentExact={menu.exact}
                    />
                )
            })
        }
        return result;
    }
}

export default Menu;