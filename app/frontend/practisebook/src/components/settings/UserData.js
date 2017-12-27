import React, {Component} from 'react';
import UsersService from "../../pages/Users/UsersService";
import CompanyService from "../../pages/Companies/CompanyService";
import If from '../../utilities/If';
import {Col, Row} from "react-bootstrap";

export default class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            companies: []
        };
        this.getUserData = this.getUserData.bind(this);
        this.getCompaniesData = this.getCompaniesData.bind(this);
        this.renderUserGroup = this.renderUserGroup.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    componentDidMount() {
        this.getUserData();
        this.getCompaniesData();
    }

    getUserData() {
        let id = localStorage.getItem("current_userid");

        UsersService.getUser(id).then(function (response) {
            if (response.status == 200) {
                if (response.data[0]) {
                    this.setState({user: response.data[1]});
                }
                else {
                    console.log('user doesnt exist')
                }
            }
        }.bind(this))
    }

    getCompaniesData() {
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    renderUserGroup(group_id) {
        let group = "";
        let labelcolor = "";
        if (group_id == 1) {
            group = "admin";
            labelcolor = 'red'
        }
        else if (group_id == 2) {
            group = "lecturer";
            labelcolor = 'blue'
        }
        else if (group_id == 3) {
            group = "leader";
            labelcolor = 'green'
        }
        else {
            group = "student";
            labelcolor = 'grey'
        }

        return <span className="label label-default" style={{background: labelcolor}}>{group}</span>
    }

    renderCompany(company_id) {
        if (company_id) {
            let company = this.state.companies.find(company => company.company_id == company_id);
            if (company) {
                return company.name
            }
        }
    }

    render() {
        if (this.state.user)
            return (
                <div id="userdata" className="top15">
                    <Row>
                        <Col xs={12}>
                            <div className="application_legend_container">
                                <div className="application_legend_title">
                                    <i className="fa fa-user-circle-o" style={{marginRight: '5px'}}></i>
                                    Dane podstawowe
                                </div>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Nazwa użytkownika:
                                        </label>
                                        <span>
                                          {this.state.user.login}
                                        </span>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Grupa:
                                        </label>
                                        <span>
                                         {this.renderUserGroup(this.state.user.group_id)}
                                         </span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="application_legend_container">
                                <div className="application_legend_title">
                                    <i className="fa fa-id-card-o" style={{marginRight: '5px'}}></i>
                                    Dane osobowe
                                </div>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Imię:
                                        </label>
                                        <span>
                                            {this.state.user.firstname}
                                        </span>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Nazwisko:
                                        </label>
                                        <span>
                                            {this.state.user.lastname}
                                        </span>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Email:
                                        </label>
                                        <span>
                                            {this.state.user.email}
                                        </span>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <label className='right3'>
                                            Telefon:
                                        </label>
                                        <span>
                                        {this.state.user.phone}
                                    </span>
                                    </Col>
                                    <If isTrue={Boolean(this.state.user.study)}>
                                        <div>
                                            <Col xs={12} md={6}>
                                                <label className='right3'>
                                                    Kierunek:
                                                </label>
                                                <span>
                                        {this.state.user.study}
                                    </span>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <label className='right3'>
                                                    Semestr:
                                                </label>
                                                <span>
                                            {this.state.user.semester}
                                        </span>
                                            </Col>
                                        </div>
                                    </If>
                                    <If isTrue={Boolean(this.state.user.company_id)}>
                                        <div>
                                            <Col xs={12} md={12}>
                                                <label className='right3'>
                                                Firma:
                                            </label>
                                                <span>
                                                    {this.renderCompany(this.state.user.company_id)}
                                                </span>
                                            </Col>
                                        </div>
                                    </If>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                </div>
            )
        else {
            return (<div style={{fontStyle: 'italic'}}>Nie można odczytać danych</div>)
        }
    }
}
