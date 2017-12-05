import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginService from "../../pages/Login/LoginService";

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        LoginService.logout();
    }

    renderBreadcrumbs() {
        if (this.props.url) {
            return (
                <div>
                            <span>
                                 <Link to='/'>
                                    Home
                                </Link>
                                <span className="breadcrumbSlash">
                                    /
                                </span>
                            </span>
                    {this.props.url.map((item, index) =>
                        (index === this.props.url.length - 1) ?
                            <span key={item.text + index}>
                                {item.text}
                            </span>
                            :
                            <span key={item.text + index}>
                                 <Link to={'/' + item.url}>
                                     {item.text}
                                </Link>
                                <span className="breadcrumbSlash">
                                    /
                                </span>
                            </span>
                    )}
                </div>
            )
        }

    }

    render() {
        return (
            <nav id="HeaderContainer">
                <div id="breadcrumbContainer">
                    {this.renderBreadcrumbs()}
                </div>
                <div id="userdataContainer">
                    <div>
                        <span>
                            {
                                localStorage.getItem("current_user")
                            }
                        </span>
                        <Link to={'/'}>
                            <span style={{cursor: 'pointer'}} onClick={this.logOut}>
                                <i className="fa fa-sign-out" title="Wyloguj się"></i>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="clear"></div>
            </nav>
        );
    }
}

export default Header;