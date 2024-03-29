import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import If from '../../utilities/If';
import ReactNotify from 'react-notify';

export default class UsersForm extends Component {
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
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
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
        this.setState({company: e});
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

    onAddBtnClick() {

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
                password: window.btoa(this.state.password),
                group_id: this.state.groupId,
                company_id: (this.state.company)? this.state.company.company_id : null,
                study: this.state.study,
                semester: this.state.semester
            }
            this.props.handleAddClick(data);

            this.setState({
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                login: '',
                password: '',
                group: null,
                company: null,
                study: '',
                semester: '',
                addBtnClicked: false
            });

            let inputs = document.getElementsByTagName('input');

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }
        }
        else {
            if(!this.props.editedUser)
                this.refs.notificator.error("Błąd dodawania nowego użytkownika.", "Nie uzupełniono poprawnie danych", 3000);
            else{
                this.refs.notificator.error("Błąd edytowania użytkownika.", "Nie uzupełniono poprawnie danych", 3000);
            }
        }
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }

    componentDidMount() {
        if (this.props.editedUser) {
            let groups = [{id: 1, name: 'admin'}, {id: 2, name: 'wykładowca'}, {id: 3, name: 'leader'}, {id: 4, name: 'student'}];
            this.setState({
                login: this.props.editedUser.login,
                password: this.props.editedUser.password,
                firstname: this.props.editedUser.firstname,
                lastname: this.props.editedUser.lastname,
                phone: this.props.editedUser.phone,
                email: this.props.editedUser.email,
                study: this.props.editedUser.study,
                semester: this.props.editedUser.semester,
                group: groups.find(group => group.id == this.props.editedUser.group_id),
                groupId: this.props.editedUser.group_id,
                company: (this.props.editedUser.company_id)? this.props.companies.find(company => company.company_id == this.props.editedUser.company_id) : null
            })
        }
    }

    render() {

        const groups = [{id: 1, name: 'admin'}, {id: 2, name: 'wykładowca'}, {id: 3, name: 'leader'}, {id: 4, name: 'student'}];

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal>
                    <div>
                        <Col sm={12} md={(this.props.horizontal) ? 8 : 12} lg={(this.props.horizontal) ? 8 : 12}>
                            <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '45%'}}>
                                <h5>Dane osobowe</h5>
                                <Row>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.firstname.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Imię</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeFirstname}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.firstname : ''}/>
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.lastname.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Nazwisko</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeLastname}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.lastname : ''}/>
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.phone.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Telefon</ControlLabel>
                                        <FormControl type="number" onChange={this.onChangePhone}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.phone : ''}/>
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.email.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl type="email" onChange={this.onChangeEmail}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.email : ''}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '45%', marginLeft: '5%'}}>
                                <h5>Dane konta</h5>
                                <Row>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.login.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Login</ControlLabel>
                                        <FormControl type="text" onChange={this.onChangeLogin}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.login : ''}
                                                     disabled={(this.props.editedUser)}
                                        />
                                    </Col>
                                    <Col md={6} lg={6}
                                         className={(this.state.addBtnClicked && !this.state.password.length > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Hasło</ControlLabel>
                                        <FormControl type="password" onChange={this.onChangePassword}
                                                     defaultValue={(this.props.editedUser) ? this.props.editedUser.password : ''}/>
                                    </Col>
                                    <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.group) ? 'has-error' : ''}>
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
                            <div style={{clear: 'both'}}>
                                <If isTrue={this.state.groupId == 3}>
                                    <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '50%'}}>
                                        <h5>Dane pracownika firmy</h5>
                                        <Row>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.company) ? 'has-error' : ''}>
                                                <ControlLabel>Firma</ControlLabel>
                                                <Select
                                                    options={this.props.companies}
                                                    value={this.state.company}
                                                    name="CompanySelect"
                                                    onChange={this.onChangeCompany}
                                                    clearable={true}
                                                    labelKey="name"
                                                    valueKey="company_id"
                                                    placeholder="Wybierz firmę"
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </If>
                                <If isTrue={this.state.groupId == 4}>
                                    <FormGroup style={(this.props.horizontal) ? {} : {float: 'left', width: '50%'}}>
                                        <h5>Dane studenta</h5>
                                        <Row>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.study) ? 'has-error' : ''}>
                                                <ControlLabel>Kierunek</ControlLabel>
                                                <FormControl type="text" onChange={this.onChangeStudy}
                                                             defaultValue={(this.props.editedUser) ? this.props.editedUser.study : ''}/>
                                            </Col>
                                            <Col md={6} lg={6} className={(this.state.addBtnClicked && !this.state.semester) ? 'has-error' : ''}>
                                                <ControlLabel>Semestr</ControlLabel>
                                                <FormControl type="number" onChange={this.onChangeSemester}
                                                             defaultValue={(this.props.editedUser) ? this.props.editedUser.semester : ''}/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </If>
                            </div>
                            <div style={{clear: 'both'}}>
                                <FormGroup>
                                    <div className={(this.props.horizontal) ? "pull-right" : ""}>
                                        <ButtonToolbar>
                                            <ButtonCancel onClick={this.onCancelBtnClick}/>
                                            <ButtonSave onClick={this.onAddBtnClick}/>
                                        </ButtonToolbar>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
