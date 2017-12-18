import React, {Component} from 'react';

import Header from '../../components/header/Header';
import StudentsTable from "../../components/students/StudentsTable";
import GeneralTop from "../../components/generaltop/GeneralTop";
import StudentsService from "./StudentsService";
import UsersService from "../Users/UsersService";
import CompanyService from "../Companies/CompanyService";

export default class StudentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            users:[],
            companies:[],
            filtersState: false,
        };
        this.getStudents = this.getStudents.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    getUsers(){
        UsersService.getAllUsers().then(function (response) {
            this.setState({users:response.data})
        }.bind(this))
    }

    getCompanies(){
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies:response.data})
        }.bind(this))
    }

    getStudents(){
        if(localStorage.getItem('current_usergroup') == '2'){
            // lecturers
            StudentsService.getStudentsByLecturer(localStorage.getItem("current_userid")).then(function (response) {
                this.setState({students: response.data});
            }.bind(this))
        }
        else{
            // leaders
            StudentsService.getStudentsByLeader(localStorage.getItem("current_userid")).then(function (response) {
                this.setState({students: response.data});
            }.bind(this))
        }
    }

    componentDidMount(){
     this.getStudents();
     this.getCompanies();
     this.getUsers();
    }

    render() {
        return (
            <div>
                <div>
                    <Header url={[{url: 'studenci', text: 'studenci'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_STUDENTS">
                    <div>
                        <GeneralTop
                                    handleClickEnableSearch={this.handleClickEnableSearch}
                                    disableForParticularGroup={true}
                                    disableFor={localStorage.getItem("current_usergroup")}
                        />
                    </div>
                    <div style={{clear: 'both'}}>
                        <StudentsTable
                            students={this.state.students}
                            users={this.state.users}
                            companies={this.state.companies}
                            enableFilters={this.state.filtersState}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
