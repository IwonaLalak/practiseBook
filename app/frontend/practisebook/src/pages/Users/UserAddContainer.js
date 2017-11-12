import React, {Component} from 'react';
import ReactNotify from 'react-notify';
import Header from '../../components/header/Header';
import UserService from './UsersService';
import UsersForm from '../../components/users/UsersForm';

export default class UserAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveUser = this.saveUser.bind(this);
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

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={["użytkownicy", "dodaj"]}/>
                </div>
                <div id="ADD_USER">
                    <div>
                        <UsersForm handleAddClick={this.saveUser} horizontal={true}/>
                    </div>
                </div>
            </div>
        )
    }
}
