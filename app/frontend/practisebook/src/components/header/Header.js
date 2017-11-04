import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.renderBreadcrumbs = this.renderBreadcrumbs.bind(this);
    }

    // TODO: breadcrumbs renderuje złe linki, przykładowo chce skierować pod localhost:3000/użytkownicy - należy usunąć polskie znaki

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
                            <span>
                                {item}
                            </span>
                            :
                            <span>
                                 <Link to={'/' + item}>
                                     {item}
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
                            testowy@user.com
                        </span>
                        <span>
                            <i className="fa fa-sign-out" title="Wyloguj się"></i>
                        </span>
                    </div>
                </div>
                <div className="clear"></div>
            </nav>
        );
    }
}

export default Header;