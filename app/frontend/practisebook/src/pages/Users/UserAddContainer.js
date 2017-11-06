import React, {Component} from 'react';

import {Form, FormControl, FormGroup, ControlLabel, Col, Row} from 'react-bootstrap';
import {ButtonSave} from "../../utilities/Buttons";

import Header from '../../components/header/Header';

export default class UserAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleAddNewUserClick = this.handleAddNewUserClick.bind(this);
    }

    handleAddNewUserClick(){

    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["użytkownicy","dodaj"]}/>
                </div>
                <div id="ADD_USER">
                    <div>
                        <Form horizontal>
                            <div>
                                <Col sm={12} md={8} lg={7}>
                                    <FormGroup>
                                        <h5>Dane osobowe</h5>
                                        <Row>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Imię</ControlLabel>
                                                <FormControl type="text"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Nazwisko</ControlLabel>
                                                <FormControl type="text"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Telefon</ControlLabel>
                                                <FormControl type="number"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Email</ControlLabel>
                                                <FormControl type="email"/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <h5>Dane konta</h5>
                                        <Row>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Login</ControlLabel>
                                                <FormControl type="text"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Hasło</ControlLabel>
                                                <FormControl type="password"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Grupa</ControlLabel>
                                                <FormControl/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <h5>Dane pracownika firmy</h5>
                                        <Row>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Firma</ControlLabel>
                                                <FormControl/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <h5>Dane studenta</h5>
                                        <Row>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Kierunek</ControlLabel>
                                                <FormControl type="text"/>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <ControlLabel>Semestr</ControlLabel>
                                                <FormControl type="number"/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="pull-right">
                                            <ButtonSave onClick={this.handleAddNewUserClick}/>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
