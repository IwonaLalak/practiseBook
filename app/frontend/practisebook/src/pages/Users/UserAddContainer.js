import React, {Component} from 'react';

import {Form, FormControl, FormGroup, ControlLabel, Col, Row} from 'react-bootstrap';
import {ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import ReactNotify from 'react-notify';
import If from '../../utilities/If';
import Header from '../../components/header/Header';
import UserService from './UsersService';

export default class UserAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            login: '',
            password: '',
            company: null,
            study: '',
            semester: '',
            group: null,
            groupId: null,
            addBtnClicked: false,
        };
        this.handleAddNewUserClick = this.handleAddNewUserClick.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeStudy = this.onChangeStudy.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    onChangeFirstname(e) {
        this.setState({firstname: e.target.value});
    }

    onChangeLastname(e) {
        this.setState({lastname: e.target.value});
    }

    onChangePhone(e) {
        this.setState({phone: e.target.value});
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    onChangeLogin(e) {
        this.setState({login: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    onChangeCompany(e) {
        this.setState({company: e.target.value});
    }

    onChangeStudy(e) {
        this.setState({study: e.target.value});
    }

    onChangeSemester(e) {
        this.setState({semester: e.target.value});
    }

    onChangeGroup(e) {
        this.setState({group: e, groupId: e.id, study: null, semester: null, company: null})
    }

    handleAddNewUserClick() {

        this.setState({addBtnClicked: true});

        let correct = true;

        if (!(
                this.state.firstname.length > 0 &&
                this.state.lastname.length > 0 &&
                this.state.phone.length > 0 &&
                this.state.email.length > 0 &&
                this.state.login.length > 0 &&
                this.state.password.length > 0 &&
                this.state.group
            )) correct = false;

        if (this.state.groupId === 3 && !this.state.company) correct = false;
        if (this.state.groupId === 4 && (!this.state.semester || !this.state.study)) correct = false;

        if (correct) {
            let data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                phone: this.state.phone,
                email: this.state.email,
                login: this.state.login,
                password: this.state.password,
                group_id: this.state.groupId,
                company_id: this.state.company,
                study: this.state.study,
                semester: this.state.semester
            }
            this.saveUser(data);
        }
        else {
            this.refs.notificator.error("Błąd dodawania nowego użytkownika.", "Nie uzupełniono poprawnie danych", 3000);
        }
    }

    saveUser(data) {
        UserService.addNewUser(data).then(function (response) {
            if (response.data[0]) {
                this.refs.notificator.success("Pomyślnie dodano użytkownika", "", 3000);
                // TODO: jeszcze raz czyszczenie forma
                this.setState({
                    firstname: '',
                    lastname:'',
                    phone:'',
                    email:'',
                    login:'',
                    password:'',
                    group: null,
                    company:null,
                    study:'',
                    semester:'',
                    addBtnClicked: false
                })
            }
            else if (!response.data[0] && response.data[1] === 'user exist') {
                this.refs.notificator.error("Błąd dodawania nowego użytkownika.", "Podany login jest już zajęty", 3000);
            }
            else {
                this.refs.notificator.error("Błąd dodawania nowego użytkownika.", "Wystąpił błąd po stronie bazy danych", 3000);
            }
        }.bind(this));
    }

    render() {

        const groups = [{id: 1, name: 'admin'}, {id: 2, name: 'wykładowca'}, {id: 3, name: 'leader'}, {id: 4, name: 'student'}];

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={["użytkownicy", "dodaj"]}/>
                </div>
                <div id="ADD_USER">
                    <div>
                        <Form horizontal>
                            <div>
                                <Col sm={12} md={8} lg={7}>
                                    <FormGroup>
                                        <h5>Dane osobowe</h5>
                                        <Row>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.firstname.length > 0)? 'has-error':''}>
                                                <ControlLabel>Imię</ControlLabel>
                                                <FormControl type="text" onChange={this.onChangeFirstname}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.lastname.length > 0)? 'has-error':''}>
                                                <ControlLabel>Nazwisko</ControlLabel>
                                                <FormControl type="text" onChange={this.onChangeLastname}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.phone.length > 0)? 'has-error':''}>
                                                <ControlLabel>Telefon</ControlLabel>
                                                <FormControl type="number" onChange={this.onChangePhone}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.email.length > 0)? 'has-error':''}>
                                                <ControlLabel>Email</ControlLabel>
                                                <FormControl type="email" onChange={this.onChangeEmail}/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <h5>Dane konta</h5>
                                        <Row>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.login.length > 0)? 'has-error':''}>
                                                <ControlLabel>Login</ControlLabel>
                                                <FormControl type="text" onChange={this.onChangeLogin}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.password.length > 0)? 'has-error':''}>
                                                <ControlLabel>Hasło</ControlLabel>
                                                <FormControl type="password" onChange={this.onChangePassword}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.group)? 'has-error':''}>
                                                <ControlLabel>Grupa</ControlLabel>
                                                <Select
                                                    options={groups}
                                                    value={this.state.group}
                                                    name="GroupSelect"
                                                    onChange={this.onChangeGroup}
                                                    clearable={false}
                                                    labelKey="name"
                                                    valueKey="id"
                                                    placeholder="Wybierz grupę"
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <If isTrue={this.state.groupId === 3}>
                                        <FormGroup>
                                            <h5>Dane pracownika firmy</h5>
                                            <Row>
                                                <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.company)? 'has-error':''}>
                                                    <ControlLabel>Firma</ControlLabel>
                                                    <FormControl onChange={this.onChangeCompany}/>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </If>
                                    <If isTrue={this.state.groupId === 4}>
                                        <FormGroup>
                                            <h5>Dane studenta</h5>
                                            <Row>
                                                <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.study)? 'has-error':''}>
                                                    <ControlLabel>Kierunek</ControlLabel>
                                                    <FormControl type="text" onChange={this.onChangeStudy}/>
                                                </Col>
                                                <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.semester)? 'has-error':''}>
                                                    <ControlLabel>Semestr</ControlLabel>
                                                    <FormControl type="number" onChange={this.onChangeSemester}/>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </If>
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
