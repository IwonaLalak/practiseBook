import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactNotify from 'react-notify';
import Header from '../../components/header/Header';
import GeneralTop from '../../components/generaltop/GeneralTop';
import UsersTable from '../../components/users/UsersTable';
import UsersForm from '../../components/users/UsersForm';
import UserService from './UsersService';
import If from "../../utilities/If";
import CompanyService from "../Companies/CompanyService";

export default class UsersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            companies: [],
            filtersState: false,
            userForEdition: false
        };
        this.getData = this.getData.bind(this);
        this.getCompaniesData = this.getCompaniesData.bind(this);
        this.handleClickAddNewUser = this.handleClickAddNewUser.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickEditUser = this.handleClickEditUser.bind(this);
        this.handleClickDeleteUser = this.handleClickDeleteUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancelEdition = this.cancelEdition.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getCompaniesData();
    }

    getData() {
        UserService.getAllUsers().then(function (response) {
            this.setState({users: response.data})
        }.bind(this))
    }

    getCompaniesData(){
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewUser() {
        this.props.history.push("/uzytkownicy/dodaj");
    }

    handleClickEditUser(id) {
        this.setState({userForEdition: this.state.users.find(user => user.user_id === id)});
    }

    saveUser(data) {
        UserService.editUser(this.state.userForEdition.user_id,data).then(function (response) {
            if(response.status == 200){
                if(response.data[0]){
                    this.refs.notificator.success("Pomyślnie edytowano użytkownika", "", 3000);
                }
                else{
                    this.refs.notificator.error("Błąd podczas edycji", "Taki użytkownik nie istnieje", 3000);
                }
                this.getData();
            }
        }.bind(this));
        this.setState({userForEdition: false});
    }

    cancelEdition(){
        this.setState({userForEdition: false});
    }

    handleClickDeleteUser(id) {
        UserService.deleteUser(id).then(function (response) {
            if (response.data[0]) {
                this.refs.notificator.success("Pomyślnie usunięto użytkownika", "", 3000);
                this.getData();
            }
            else {
                this.refs.notificator.error("Nie usunięto użytkownika", "Wystąpił błąd po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'uzytkownicy', text: 'użytkownicy'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_USERS">
                    <div>
                        <GeneralTop
                            handleClickAdd={this.handleClickAddNewUser}
                            handleClickEnableSearch={this.handleClickEnableSearch}
                            addBtnText = "Dodaj nowego użytkownika"
                        />
                    </div>
                    <If isTrue={Boolean(this.state.userForEdition)}>
                        <div id="EDIT_USER">
                            <UsersForm handleAddClick={this.saveUser} handleCancelClick={this.cancelEdition} horizontal={false} editedUser={this.state.userForEdition} companies={this.state.companies}/>
                        </div>
                    </If>
                    <div style={{clear: 'both'}}>
                        <UsersTable
                            users={this.state.users}
                            enableFilters={this.state.filtersState}
                            handleEditClick={this.handleClickEditUser}
                            handleDeleteClick={this.handleClickDeleteUser}
                            companies = {this.state.companies}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
