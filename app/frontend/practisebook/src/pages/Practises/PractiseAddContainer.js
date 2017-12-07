import React, {Component} from 'react';
import Header from '../../components/header/Header';
import PractisesForm from "../../components/practises/PractisesForm";
import {withRouter} from 'react-router-dom';
import ReactNotify from 'react-notify';
import UsersService from "../Users/UsersService";
import CompanyService from "../Companies/CompanyService";
import PractisesService from "./PractisesService";


export default class PractiseAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            leaders: [],
            lecturers: [],
            companies: []
        }
        this.cancelSavePractise = this.cancelSavePractise.bind(this);
        this.savePractise = this.savePractise.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
    }

    cancelSavePractise() {
        this.props.history.push("/praktyki");
    }

    savePractise(data) {
        PractisesService.addNewPractise(data).then(function (response) {
            if(response.status == 200){
                this.refs.notificator.success("Pomyślnie dodano nowa praktykę", "", 3000);
            }
            else{
                this.refs.notificator.error("Nie dodano praktyki", "Błąd po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    componentDidMount() {
        this.getUsers();
        this.getCompanies();
    }

    getUsers() {
        UsersService.getAllUsers().then(function (response) {

            this.setState({
                lecturers: response.data.filter(function (item) {
                    if (item.group_id == 2) {
                        return item
                    }
                }),

                leaders: response.data.filter(function (item) {
                    if (item.group_id == 3) {
                        return item
                    }
                }),

                students: response.data.filter(function (item) {
                    if (item.group_id == 4) {
                        return item
                    }
                })
            })

        }.bind(this))
    }

    getCompanies() {
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'praktyki', text: 'praktyki'}, {url: '', text: 'dodaj'}]}/>
                </div>
                <div id="ADD_PRACTISE">
                    <PractisesForm
                        handleCancelClick={this.cancelSavePractise}
                        handleAddClick={this.savePractise}
                        students={this.state.students}
                        leaders={this.state.leaders}
                        lecturers={this.state.lecturers}
                        companies={this.state.companies}
                    />
                </div>
            </div>
        )
    }
}
