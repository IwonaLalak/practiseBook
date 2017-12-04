import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col, Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
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
    }


    onClickLogin(){
        this.setState({buttonClicked: true});

        if(this.state.login.length>0 && this.state.password.length>0){

            LoginService.login({
                login: this.state.login,
                password: window.btoa(this.state.password)
            }).then(function (response) {

                if(response.data[0]){
                    this.refs.notificator.success("Zalogowano pomyślnie", "Następuje przekierowanie", 3000);
                    LoginService.setUserdata(response.data[1]);
                    this.setState({waitingForRedirect: true});
                    setTimeout(
                        function(){
                            this.props.history.push("/konto");
                        }.bind(this), 3000
                    )
                }
                else{
                    this.refs.notificator.error("Błąd logowania użytkownika.", "Zły login lub hasło", 3000);
                }
            }.bind(this))

        }
        else{
            this.refs.notificator.error("Błąd logowania użytkownika.", "Nie uzupełniono wszystkich pól", 3000);
        }

    }

    onChangeLogin(e){
        this.setState({login: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div id="LOGIN_PAGE">
                <ReactNotify ref='notificator'/>
                <Row style={{margin:0}}>
                    <Col xs={12} md={8} lg={6}>
                        <div id="loginContainer">
                            <Form horizontal={true}>
                                <FormGroup className={(this.state.buttonClicked && this.state.login.length<1)? "has-error" : ''}>
                                    <ControlLabel>Login:</ControlLabel>
                                    <FormControl type="text" onChange={this.onChangeLogin}/>
                                </FormGroup>
                                <FormGroup className={(this.state.buttonClicked && this.state.password.length<1)? "has-error" : ''}>
                                    <ControlLabel>Hasło:</ControlLabel>
                                    <FormControl type="password" onChange={this.onChangePassword}/>
                                </FormGroup>
                                <FormGroup>
                                    <Button bsStyle="primary" onClick={this.onClickLogin}>
                                        <i className="fa fa-sign-in"></i>
                                        Zaloguj się
                                    </Button>
                                    <span style={
                                        (this.state.waitingForRedirect)?
                                            {marginLeft: '5px', visibility: 'visible'}
                                            :
                                            {marginLeft: '5px', visibility: 'hidden'}
                                    }>
                                        <i className="fa fa-circle-o-notch fa-spin"></i>
                                    </span>
                                </FormGroup>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
