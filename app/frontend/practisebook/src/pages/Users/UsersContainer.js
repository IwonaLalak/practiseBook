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
            users: [],
            filtersState: false
        };
        this.getData = this.getData.bind(this);
        this.handleClickAddNewUser = this.handleClickAddNewUser.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        UserService.getAllUsers().then(function (response) {
            this.setState({users:response.data})
        }.bind(this))
    }

    handleClickEnableSearch(){
        this.setState({filtersState: !this.state.filtersState});
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
                            handleClickAddNewUser = {this.handleClickAddNewUser}
                            handleClickEnableSearch = {this.handleClickEnableSearch}
                        />
                    </div>
                    <div>
                       <UsersTable
                           users={this.state.users}
                           enableFilters = {this.state.filtersState}
                       />
                    </div>
                </div>
            </div>
        )
    }
}
