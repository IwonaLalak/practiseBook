import React, {Component} from 'react';
import ReactNotify from 'react-notify';
import {Row, Col, Tab, Tabs} from 'react-bootstrap';
import Header from '../../components/header/Header';
import ChangePasswordForm from "../../components/settings/ChangePasswordForm";
import UserData from "../../components/settings/UserData";
import UsersService from "../Users/UsersService";

export default class AccountContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderUserDataContainer = this.renderUserDataContainer.bind(this);
        this.renderUserPasswordChangeContainer = this.renderUserPasswordChangeContainer.bind(this);
        this.saveNewPassword = this.saveNewPassword.bind(this);
    }

    renderUserDataContainer() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={10} lg={5}>
                        <UserData/>
                    </Col>
                </Row>
            </div>
        )
    }

    renderUserPasswordChangeContainer() {
        return (
            <div>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <ChangePasswordForm handleChangePassword={this.saveNewPassword}/>
                    </Col>
                </Row>
            </div>
        )
    }

    saveNewPassword(data) {
        let userid = localStorage.getItem("current_userid");
        UsersService.changePassword(data, userid).then(function (response) {
            if (response.data[0]) {
                this.refs.notificator.success("Pomyślnie zmieniono hasło", "", 3000);
            }
            else {
                this.refs.notificator.error("Nie zmieniono hasła", "Wystąpił błąd po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'konto', text: 'konto użytkownika'}, {url: '', text: 'Dane'}]}/>
                </div>
                <div id="USER_ACCOUNT_SETTINGS">
                    <Tabs defaultActiveKey={1} id="account-tabs">
                        <Tab eventKey={1} title="Dane konta">{this.renderUserDataContainer()}</Tab>
                        <Tab eventKey={2} title="Zmiana hasła">{this.renderUserPasswordChangeContainer()}</Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}
