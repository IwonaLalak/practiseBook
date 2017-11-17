import React, {Component} from 'react';
import {Row, Col, Tab, Tabs} from 'react-bootstrap';
import Header from '../../components/header/Header';
import ChangePasswordForm from "../../components/settings/ChangePasswordForm";
import UserData from "../../components/settings/UserData";

export default class AccountContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderUserDataContainer = this.renderUserDataContainer();
        this.renderUserPasswordChangeContainer = this.renderUserPasswordChangeContainer();
    }

    renderUserDataContainer() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={10} lg={7}>
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
                    <Col xs={12} md={10} lg={7}>
                        <ChangePasswordForm/>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <Header url={[{url: 'konto', text: 'konto użytkownika'}, {url: '', text: 'Dane'}]}/>
                </div>
                <div id="USER_ACCOUNT_SETTINGS">
                    <Tabs defaultActiveKey={1} id="account-tabs">
                        <Tab eventKey={1} title="Dane konta">{this.renderUserDataContainer}</Tab>
                        <Tab eventKey={2} title="Zmiana hasła">{this.renderUserPasswordChangeContainer}</Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}
