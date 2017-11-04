import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Header from '../../components/header/Header';
import UsersTop from '../../components/users/UsersTop';
import UsersTable from '../../components/users/UsersTable';

import UserService from './UsersService';

export default class UsersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.getData = this.getData.bind(this);
        this.handleClickAddNewUser = this.handleClickAddNewUser.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        UserService.getAllUsers().then(function (response) {
            this.setState({users:response.data})
        }.bind(this))
    }

    handleClickAddNewUser(){
        this.props.history.push("/uzytkownicy/dodaj");
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["użytkownicy","przegląd"]}/>
                </div>
                <div id="ALL_USERS">
                    <div>
                        <UsersTop
                            handleClick = {this.handleClickAddNewUser}
                        />
                    </div>
                    <div>
                       <UsersTable
                           users={this.state.users}
                       />
                    </div>
                </div>
            </div>
        )
    }
}
