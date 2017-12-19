import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import GlobalInformations from '../../GlobalInformations';
import {Nav, Navbar, NavItem} from "react-bootstrap";
import LoginService from "../../pages/Login/LoginService";
import If from "../../utilities/If";

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                {
                    (window.location.pathname === '/' || window.location.pathname === '/login') ?
                        <div id="SidebarLogin">
                            <div id="app_name">
                                {
                                    GlobalInformations.APP_NAME
                                }
                            </div>
                            <p id="app_version">
                                <i className="fa fa-lg fa-code" title="app version"></i>
                                {
                                    "v " +
                                    GlobalInformations.APP_VERSION
                                }
                            </p>
                            <p id="app_author">
                                <i className="fa fa-lg fa-user-o" title="app author"></i>
                                {
                                    GlobalInformations.APP_AUTHOR
                                }
                            </p>
                        </div>
                        :
                        <div>
                            {
                                (window.innerWidth > 991) ?
                                    <div id="SidebarPages">
                                        <div id="SidebarLogo">
                                            <Link to="/">
                                                {
                                                    GlobalInformations.APP_NAME
                                                }
                                            </Link>
                                        </div>
                                        <div id="SidebarLinks">
                                            <ul>
                                                <If isTrue={LoginService.isAdmin()}>
                                                    <li>
                                                        <Link to="/uzytkownicy">
                                                            <span>
                                                                <i className="fa fa-group"></i>
                                                            </span>
                                                            <span>
                                                                Użytkownicy
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isAdmin() || LoginService.isLecturer()}>
                                                    <li>
                                                        <Link to="/firmy">
                                                            <span>
                                                                <i className="fa fa-briefcase"></i>
                                                            </span>
                                                            <span>
                                                                Firmy
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isAdmin() || LoginService.isLecturer() || LoginService.isStudent()}>
                                                    <li>
                                                        <Link to="/praktyki">
                                                            <span>
                                                                <i className="fa fa-graduation-cap"></i>
                                                            </span>
                                                            <span>
                                                                Praktyki
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isLeader() || LoginService.isLecturer()}>
                                                    <li>
                                                        <Link to="/studenci">
                                                            <span>
                                                                <i className="fa fa-group"></i>
                                                            </span>
                                                            <span>
                                                                Studenci
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isStudent()}>
                                                    <li>
                                                        <Link to="/kalendarz">
                                                            <span>
                                                                <i className="fa fa-calendar"></i>
                                                            </span>
                                                            <span>
                                                                Kalendarz
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isStudent()}>
                                                    <li>
                                                        <Link to="/wpisy">
                                                            <span>
                                                                <i className="fa fa-sticky-note-o"></i>
                                                            </span>
                                                            <span>
                                                                Wpisy
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isLecturer()}>
                                                    <li>
                                                        <Link to="/oceny">
                                                        <span>
                                                            <i className="fa fa-star-half-o"></i>
                                                        </span>
                                                            <span>
                                                            Oceny
                                                        </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isLeader()}>
                                                    <li>
                                                        <Link to="/raporty">
                                                            <span>
                                                                <i className="fa fa-file-text-o"></i>
                                                            </span>
                                                            <span>
                                                                Raporty
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isLeader()}>
                                                    <li>
                                                        <Link to="/uwagi">
                                                            <span>
                                                                <i className="fa fa-comments-o"></i>
                                                            </span>
                                                            <span>
                                                                Uwagi
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isAdmin()}>
                                                    <li>
                                                        <Link to="/ustawienia">
                                                            <span>
                                                                <i className="fa fa-wrench"></i>
                                                            </span>
                                                            <span>
                                                                Ustawienia
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>
                                                <If isTrue={LoginService.isUserLogged()}>
                                                    <li>
                                                        <Link to="/konto">
                                                            <span>
                                                                <i className="fa fa-cogs"></i>
                                                            </span>
                                                            <span>
                                                                Konto
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </If>

                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Navbar inverse collapseOnSelect fluid>
                                            <Navbar.Header>
                                                <Navbar.Brand>
                                                    <a>Elektroniczny dziennik praktyk</a>
                                                </Navbar.Brand>
                                                <Navbar.Toggle/>
                                            </Navbar.Header>
                                            <Navbar.Collapse>
                                                <Nav>
                                                    <If isTrue={LoginService.isAdmin()}>
                                                        <NavItem>
                                                            <Link to="/uzytkownicy">
                                                            <span>
                                                                <i className="fa fa-group"></i>
                                                            </span>
                                                                <span>
                                                                Użytkownicy
                                                            </span>
                                                            </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isAdmin() || LoginService.isLecturer()}>
                                                        <NavItem>
                                                            <Link to="/firmy">
                                                            <span>
                                                                <i className="fa fa-briefcase"></i>
                                                            </span>
                                                                <span>
                                                                Firmy
                                                            </span>
                                                            </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isAdmin() || LoginService.isLecturer() || LoginService.isStudent()}>
                                                        <NavItem>
                                                            <Link to="/praktyki">
                                            <span>
                                                <i className="fa fa-graduation-cap"></i>
                                            </span>
                                                                <span>
                                                Praktyki
                                            </span>
                                                            </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isStudent()}>

                                                        <NavItem> <Link to="/kalendarz">
                                            <span>
                                                <i className="fa fa-calendar"></i>
                                            </span>
                                                            <span>
                                                Kalendarz
                                            </span>
                                                        </Link>
                                                        </NavItem></If>
                                                    <If isTrue={LoginService.isStudent()}>

                                                        <NavItem><Link to="/wpisy">
                                            <span>
                                                <i className="fa fa-sticky-note-o"></i>
                                            </span>
                                                            <span>
                                                Wpisy
                                            </span>
                                                        </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isLeader() || LoginService.isLecturer()}>

                                                        <NavItem><Link to="/studenci">
                                            <span>
                                                <i className="fa fa-group"></i>
                                            </span>
                                                            <span>
                                                Studenci
                                            </span>
                                                        </Link>
                                                        </NavItem></If>
                                                    <If isTrue={LoginService.isLecturer()}>
                                                        <NavItem><Link to="/oceny">
                                            <span>
                                                <i className="fa fa-star-half-o"></i>
                                            </span>
                                                            <span>
                                                Oceny
                                            </span>
                                                        </Link>
                                                        </NavItem></If>
                                                    <If isTrue={LoginService.isLeader()}>
                                                        <NavItem><Link to="/raporty">
                                            <span>
                                                <i className="fa fa-file-text-o"></i>
                                            </span>
                                                            <span>
                                                Raporty
                                            </span>
                                                        </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isLeader()}>
                                                        <NavItem><Link to="/uwagi">
                                            <span>
                                                <i className="fa fa-comments-o"></i>
                                            </span>
                                                            <span>
                                                Uwagi
                                            </span>
                                                        </Link>
                                                        </NavItem></If>
                                                    <If isTrue={LoginService.isAdmin()}>
                                                        <NavItem>
                                                            <Link to="/ustawienia">
                                            <span>
                                                <i className="fa fa-wrench"></i>
                                            </span>
                                                                <span>
                                                Ustawienia
                                            </span>
                                                            </Link>
                                                        </NavItem>
                                                    </If>
                                                    <If isTrue={LoginService.isUserLogged()}>
                                                        <NavItem><Link to="/konto">
                                            <span>
                                                <i className="fa fa-cogs"></i>
                                            </span>
                                                            <span>
                                                Konto
                                            </span>
                                                        </Link>
                                                        </NavItem></If>

                                                </Nav>
                                            </Navbar.Collapse>
                                        </Navbar>
                                    </div>
                            }
                        </div>

                }
            </nav>

        );
    }
}

export default Sidebar;