import React, {Component} from 'react';
import {ButtonSave} from '../../utilities/Buttons';
import {Col, Form, FormGroup, FormControl} from 'react-bootstrap';

export default class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            buttonClicked: false
        };
        this.handleSavePassword = this.handleSavePassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    handleSavePassword() {
        this.setState({buttonClicked: true});
        if(this.state.password.length>0){
        this.props.handleChangePassword({password: window.btoa(this.state.password)});
        }
    }

    render() {
        return (
            <div id="changePasswordForm">
                <Form horizontal={true}>
                    <div className='application_title'>
                        Podaj nowe hasło:
                    </div>
                    <FormGroup
                        className={(this.state.buttonClicked && this.state.password.length <=0) ? 'has-error' : ''}>
                        <Col xs={12}>
                            <FormControl type="password" onChange={this.onChangePassword}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12}>
                            <div className="pull-right">
                                <ButtonSave onClick={this.handleSavePassword}/>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
