import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactNotify from 'react-notify';
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
        this.handleClickEditUser = this.handleClickEditUser.bind(this);
        this.handleClickDeleteUser = this.handleClickDeleteUser.bind(this);
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

    handleClickEditUser(id){
        console.log("edytuje", id);
    }

    handleClickDeleteUser(id){
        UserService.deleteUser(id).then(function (response) {
            if(response.data[0]){
                this.refs.notificator.success("Pomyślnie usunięto użytkownika", "", 3000);
                this.getData();
            }
            else{
                this.refs.notificator.error("Nie usunięto użytkownika", "Wystąpił błąd po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    render(){
        return (
            <div>
                <ReactNotify ref='notificator'/>
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
                           handleEditClick = {this.handleClickEditUser}
                           handleDeleteClick = {this.handleClickDeleteUser}
                       />
                    </div>
                </div>
            </div>
        )
    }
}
