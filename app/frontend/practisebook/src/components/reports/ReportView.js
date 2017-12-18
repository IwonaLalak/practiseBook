import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ButtonAction} from "../../utilities/Buttons";
import UsersService from "../../pages/Users/UsersService";
import CompanyService from "../../pages/Companies/CompanyService";
import If from "../../utilities/If";


export default class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: (this.props.report) ? this.props.report : {},
            users: [],
            companies: []
        };
        this.getUsers = this.getUsers.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
        this.renderRadioboxTypeYesNo = this.renderRadioboxTypeYesNo.bind(this);
        this.renderRadiobox3Types = this.renderRadiobox3Types.bind(this);
        this.renderUserData = this.renderUserData.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    renderRadioboxTypeYesNo(value) {
        return (
            <span>
                <span className={(value == 1) ? 'checked_answer' : 'unchecked_answer'}>TAK</span>
                <span className={'slash_between_answers'}>/</span>
                <span className={(value == 0) ? 'checked_answer' : 'unchecked_answer'}>NIE</span>
            </span>
        )
    }

    renderRadiobox3Types(value) {
        return (
            <span>
                <span className={(value == 1) ? 'checked_answer' : 'unchecked_answer'}>Dostateczny</span>
                <span className={'slash_between_answers'}>/</span>
                <span className={(value == 2) ? 'checked_answer' : 'unchecked_answer'}>Dobry</span>
                <span className={'slash_between_answers'}>/</span>
                <span className={(value == 3) ? 'checked_answer' : 'unchecked_answer'}>Bardzo dobry</span>
            </span>
        )
    }

    renderUserData(userid) {
        let user = this.state.users.find(user => user.user_id == userid);
        if (user) {
            return (
                <span>
                    {user.firstname + ' ' + user.lastname}
                </span>
            )
        }
        else return userid;
    }

    renderCompany(companyid) {
        let company = this.state.companies.find(company => company.company_id == companyid);
        if (company) {
            return (
                <span>{company.name}</span>
            )
        }
        else return companyid
    }

    componentWillReceiveProps(nextprops) {
        this.setState({report: nextprops.report})
    }

    componentDidMount() {
        this.getUsers();
        this.getCompanies();
    }

    getUsers() {
        UsersService.getAllUsers().then(function (response) {
            this.setState({users: response.data})
        }.bind(this))
    }

    getCompanies() {
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    render() {

        if (this.state.report != {}) {
            return (
                <div>
                    <Row>
                        <Col xs={12} md={10} lg={8}>
                            <div id="REPORT_VIEW">
                                <div id="report-form-corner"></div>
                                <div>
                                    <Row>
                                        <Col xs={12}>
                                            <h1>
                                                Raport nr {this.state.report.raport_id}
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4>Postawowe informacje</h4>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <p>
                                                <span>Praktyka numer: </span>
                                                <label>
                                                    {this.state.report.practise_id}
                                                </label>
                                            </p>
                                            <p>
                                                <span>Praktykant: </span>
                                                <label>
                                                    {this.renderUserData(this.state.report.student_id)}
                                                </label>
                                            </p>

                                        </Col>
                                        <Col xs={12} md={4}>
                                            <p>
                                                <span>Czas praktyki: </span>
                                                <label>
                                                    {this.state.report.date_start} - {this.state.report.date_end}, {this.state.report.total_time}h
                                                </label>
                                            </p>
                                            <p>
                                                <span>Zakład pracy: </span>
                                                <label>
                                                    {this.renderCompany(this.state.report.company_id)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <p>
                                                <span>
                                                    Data wystawienia:
                                                </span>
                                                <label>
                                                    {this.state.report.raport_date}
                                                </label>
                                            </p>
                                            <p>
                                                <span>Wystawiający: </span>
                                                <label>
                                                    {this.renderUserData(this.state.report.leader_id)}
                                                </label>
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4>Ocena znajomości przez studenta zakładu pracy oraz zasad w nim panujących</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                            <span>
                                            Student zapoznał się z przepisami bezpiecznej pracy i stosował je przez cały czas odbywania praktyki.
                                            </span>
                                                <label>
                                                    {this.renderRadioboxTypeYesNo(this.state.report.radiobox1)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                                <span>Student zapoznał się z strukturą organizacyjną zakładu pracy.</span>
                                                <label>
                                                    {this.renderRadioboxTypeYesNo(this.state.report.radiobox2)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                            <span>Student zapoznał się z najważniejszymi zadaniami realizowanymi przez poszczególne wydziały / zespoły
                                        organizacyjne przedsiębiorstwa.</span>
                                                <label>
                                                    {this.renderRadioboxTypeYesNo(this.state.report.radiobox3)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                                <span>Student potrafi scharakteryzować specyfikę produktów bądź usług przygotowywanych w zakładzie pracy.</span>
                                                <label>
                                                    {this.renderRadioboxTypeYesNo(this.state.report.radiobox4)}
                                                </label>
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4>Ocena umiejętności zawodowych i miękkich studenta</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                                <span>Ocena stopnia umiejętności studenta niezbędnych do wykonania zadań określonych w planie praktyk</span>
                                                <label className={'display_in_next_line'}>
                                                    {this.renderRadiobox3Types(this.state.report.radiobox5)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                                <span>Ocena stopnia samoorganizacji oraz jakości pracy studenta</span>
                                                <label className={'display_in_next_line'}>
                                                    {this.renderRadiobox3Types(this.state.report.radiobox6)}
                                                </label>
                                            </p>
                                        </Col>
                                        <Col xs={12}>
                                            <p>
                                                <span>Ocena stopnia komunikatywności, umiejętności współpracy oraz kultury osobistej studenta</span>
                                                <label className={'display_in_next_line'}>
                                                    {this.renderRadiobox3Types(this.state.report.radiobox7)}
                                                </label>
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4>Ocena słowna studenta</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <p style={{border: '1px solid #ccc', padding: '7px 15px', textAlign: 'justify'}}>
                                                {this.state.report.raport_description}
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <h4>Całkowita ocena studenta</h4>
                                        </Col>
                                        <Col xs={12}>
                                            <h5>
                                                {this.state.report.raport_grade}
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={10} lg={8}>
                            <If isTrue={!this.props.hideBackButton}>
                                <div className={'pull-right'} style={{marginTop: '15px'}}>
                                    <ButtonAction onClick={() => {
                                        window.history.back();
                                    }} btnText={'Powrót'} iconType={'fa fa-angle-double-left'}/>
                                </div>
                            </If>
                        </Col>
                    </Row>
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>
                        Nie można wyświelić informacji o raporcie
                    </p>
                </div>
            )
        }
    }
}
