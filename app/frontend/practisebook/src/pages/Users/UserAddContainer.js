import React, {Component} from 'react';
import ReactNotify from 'react-notify';
import Header from '../../components/header/Header';
import UserService from './UsersService';
import UsersForm from '../../components/users/UsersForm';
import {withRouter} from 'react-router-dom';

export default class UserAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveUser = this.saveUser.bind(this);
        this.cancelEdition = this.cancelEdition.bind(this);
    }

    saveUser(data) {
        UserService.addNewUser(data).then(function (response) {
            if (response.data[0]) {
                this.refs.notificator.success("Pomyślnie dodano użytkownika", "", 3000);
            }
            else if (!response.data[0] && response.data[1] === 'user exist') {
                this.refs.notificator.error("Błąd dodawania nowego użytkownika.", "Podany login jest już zajęty", 3000);
            }
        }.bind(this));
    }

    cancelEdition(){
        this.props.history.push("/uzytkownicy");
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url:'uzytkownicy',text:'użytkownicy'},{url:'',text:'dodaj'}]}/>
                </div>
                <div id="ADD_USER">
                    <div>
                        <UsersForm handleAddClick={this.saveUser} handleCancelClick={this.cancelEdition} horizontal={true} editedUser={false}/>
                    </div>
                </div>
            </div>
        )
    }
}
