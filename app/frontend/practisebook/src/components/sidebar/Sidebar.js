import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import GlobalInformations from '../../GlobalInformations';

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    // TODO: linki w zależności od usera

    render() {
        return (
            <nav>
                {
                    (window.location.pathname === '/' || window.location.pathname === '/login') ?
                        <div id="SidebarLogin">
                            <div>
                                {
                                    GlobalInformations.APP_NAME
                                }
                            </div>
                            <p>
                                {
                                    "ver. " +
                                    GlobalInformations.APP_VERSION
                                }
                            </p>
                            <p>
                                {
                                    "autor: " +
                                    GlobalInformations.APP_AUTHOR
                                }
                            </p>
                        </div>
                        :
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
                                    <li>
                                        <Link to="/ustawienia">
                                            <span>
                                                <i className="fa fa-cogs"></i>
                                            </span>
                                            <span>
                                                Ustawienia
                                            </span>
                                        </Link>
                                    </li>


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
                                </ul>
                            </div>
                        </div>
                }
            </nav>

        );
    }
}

export default Sidebar;