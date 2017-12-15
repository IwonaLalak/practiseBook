import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col, Form, FormControl, FormGroup, ControlLabel, Button,InputGroup} from 'react-bootstrap';
import ReactNotify from 'react-notify';
import LoginService from "./LoginService";

export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            buttonClicked: false,
            waitingForRedirect: false
        };
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        // for tests
        this.quickLogin = this.quickLogin.bind(this);
    }


    onClickLogin() {
        this.setState({buttonClicked: true});

        if (this.state.login.length > 0 && this.state.password.length > 0) {

            LoginService.login({
                login: this.state.login,
                password: window.btoa(this.state.password)
            }).then(function (response) {

                if (response.data[0]) {
                    this.refs.notificator.success("Zalogowano pomyślnie", "Następuje przekierowanie", 3000);
                    LoginService.setUserdata(response.data[1]);
                    this.setState({waitingForRedirect: true});
                    setTimeout(
                        function () {
                            this.props.history.push("/konto");
                        }.bind(this), 3000
                    )
                }
                else {
                    this.refs.notificator.error("Błąd logowania użytkownika.", "Zły login lub hasło", 3000);
                }
            }.bind(this))

        }
        else {
            this.refs.notificator.error("Błąd logowania użytkownika.", "Nie uzupełniono wszystkich pól", 3000);
        }

    }

    onChangeLogin(e) {
        this.setState({login: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    quickLogin(user){
        LoginService.login({
            login: user,
            password: window.btoa(user)
        }).then(function (response) {

            if (response.data[0]) {
                LoginService.setUserdata(response.data[1]);
                this.props.history.push("/konto");
            }
            else {
                this.refs.notificator.error("Błąd logowania użytkownika.", "Zły login lub hasło", 3000);
            }
        }.bind(this))
    }

    render() {
        return (
            <div id="LOGIN_PAGE">
                <ReactNotify ref='notificator'/>
                <Row style={{margin: 0}}>
                    <Col xs={12} md={8} lg={3}>
                        <div id="loginContainer">
                            <Form horizontal={true}>
                                <FormGroup className={(this.state.buttonClicked && this.state.login.length < 1) ? "has-error" : ''}>
                                    <InputGroup>
                                        <InputGroup.Addon><label className={'label-addon'}><i className={'fa fa-user'}></i> Login:</label></InputGroup.Addon>
                                    <FormControl type="text" onChange={this.onChangeLogin}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className={(this.state.buttonClicked && this.state.password.length < 1) ? "has-error" : ''}>
                                    <InputGroup>
                                        <InputGroup.Addon><label className={'label-addon'}><i className={'fa fa-lock'}></i> Hasło:</label></InputGroup.Addon>
                                    <FormControl type="password" onChange={this.onChangePassword}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button bsStyle="primary" onClick={this.onClickLogin}>
                                        <i className="fa fa-sign-in"></i>
                                        Zaloguj się
                                    </Button>
                                    <span style={
                                        (this.state.waitingForRedirect) ?
                                            {marginLeft: '5px', visibility: 'visible'}
                                            :
                                            {marginLeft: '5px', visibility: 'hidden'}
                                    }>
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    </span>
                                </FormGroup>
                            </Form>
                        </div>

                        <div style={{marginTop: '25px', paddingLeft: '50px'}}>
                            <h3 style={{color: '#fff'}}>Szybkie logowanie - dla testów</h3>
                            <div className="btn-group">
                                <button className="btn btn-default" style={{background: 'red', borderColor:'red', color: '#fff', fontWeight: 'bold'}} onClick={()=>this.quickLogin("admin")}>admin</button>
                                <button className="btn btn-default" style={{background: 'blue', borderColor:'blue', color: '#fff', fontWeight: 'bold'}} onClick={()=>this.quickLogin("lecturer")}>lecturer</button>
                                <button className="btn btn-default" style={{background: 'green', borderColor:'green', color: '#fff', fontWeight: 'bold'}} onClick={()=>this.quickLogin("leader")}>leader</button>
                                <button className="btn btn-default" style={{background: 'grey', borderColor:'grey', color: '#fff', fontWeight: 'bold'}} onClick={()=>this.quickLogin("student")}>student</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
