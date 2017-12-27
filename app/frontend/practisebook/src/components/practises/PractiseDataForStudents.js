import React, {Component} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import PractisesService from "../../pages/Practises/PractisesService";
import If from "../../utilities/If";
import ReportsService from "../../pages/Reports/ReportsService";
import {Link} from "react-router-dom";
import {ButtonAction} from "../../utilities/Buttons";
import GradesService from "../../pages/Grades/GradesService";

export default class PractiseDataForStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practises: [],
            leaders: [],
            lecturers: [],
            isReportExist: false,
            grade: false,
        }
        this.renderGradeData = this.renderGradeData.bind(this);
        this.renderMainData = this.renderMainData.bind(this);
        this.getPractiseData = this.getPractiseData.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderLecturer = this.renderLecturer.bind(this);
        this.checkIfReportExist = this.checkIfReportExist.bind(this);
        this.checkIfGradeExist = this.checkIfGradeExist.bind(this);
    }

    componentDidMount() {
        this.getPractiseData();
    }

    getPractiseData() {
        let userid = localStorage.getItem("current_userid");

        PractisesService.getPractiseByStudent(userid).then(function (response) {
            if (response.status == 200) {
                if (response.data[0] != false) {
                    this.setState({
                        practises: response.data.practises,
                        leaders: response.data.leaders,
                        lecturers: response.data.lecturers
                    })
                    this.checkIfReportExist();
                    this.checkIfGradeExist();
                }
            }
        }.bind(this))
    }

    checkIfGradeExist() {
        if (this.state.practises) {

            let practiseid = this.state.practises[0].practise_id;

            GradesService.getGradesByPractise(practiseid).then(function (response) {
                if (response.data) {
                    this.setState({grade: response.data});
                }
            }.bind(this))
        }
    }

    checkIfReportExist() {
        if (this.state.practises) {
            let practiseid = this.state.practises[0].practise_id;

            ReportsService.getReportByPractise(practiseid).then(function (response) {
                if (response.data)
                    this.setState({isReportExist: response.data});
                else this.setState({isReportExist: false});
            }.bind(this))
        }
    }

    renderLeader(id) {
        let leader = this.state.leaders.find(leader => leader.user_id == id);
        if (leader) {
            return (
                <div>
                    <h5>{leader.firstname} {leader.lastname}</h5>
                    <p>
                        <i className="fa fa-phone" style={{marginRight: '5px'}}></i> {leader.phone}
                    </p>
                    <p>
                        <i className="fa fa-envelope-o" style={{marginRight: '5px'}}></i> {leader.email}
                    </p>
                </div>
            )
        }
    }

    renderLecturer(id) {
        let lecturer = this.state.lecturers.find(lecturer => lecturer.user_id == id);
        if (lecturer) {
            return (
                <div>
                    <h5>{lecturer.firstname} {lecturer.lastname}</h5>
                    <p>
                        <i className="fa fa-phone" style={{marginRight: '5px'}}></i> {lecturer.phone}
                    </p>
                    <p>
                        <i className="fa fa-envelope-o" style={{marginRight: '5px'}}></i> {lecturer.email}
                    </p>
                </div>
            )
        }
    }

    renderMainData() {
        return (
            <div className='top15'>
                <Row>
                    <Col xs={12} md={10} lg={5}>
                        {
                            this.state.practises.map((item, index) =>
                                <div key={++index}>
                                    {
                                        (this.state.practises.length > 1) ?
                                            <h2>{"Praktyka " + index}</h2>
                                            :
                                            ''
                                    }
                                    <Row>
                                        <Col xs={12}>
                                            <div className="application_legend_container">
                                                <div className="application_legend_title">
                                                    <i className="fa fa-calendar" style={{marginRight: '5px'}}></i>
                                                    Terminarz i wymiar praktyki
                                                </div>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <label className='right3'>
                                                            Data rozpoczęcia:
                                                        </label>
                                                        <span>
                                                            {item.date_start}
                                                             </span>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <label className='right3'>
                                                            Wymiar godzinowy praktyki:
                                                        </label>
                                                        <span>
                                                        {item.total_time}
                                                          </span>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <label className='right3'>
                                                            Data zakończenia:
                                                        </label>
                                                        <span>
                                                        {item.date_end}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="application_legend_container">
                                                <div className="application_legend_title">
                                                    <i className="fa fa-building-o" style={{marginRight: '5px'}}></i>
                                                    Zakład pracy
                                                </div>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <label className='right3'>
                                                            Nazwa:
                                                        </label>
                                                        <span>
                                                                {item.name}
                                                            </span>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <label className='right3'>
                                                            Adres:
                                                        </label>
                                                        <span>
                                                                {item.street} {item.place}, {item.city}
                                                            </span>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <label className='right3'>
                                                            Kontakt:
                                                        </label>
                                                        <span>
                                                                  {item.phone}, {item.email}
                                                            </span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="application_legend_container">
                                                <div className="application_legend_title">
                                                    <i className="fa fa-users" style={{marginRight: '5px'}}></i>
                                                    Opiekunowie
                                                </div>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <p>
                                                            <label>
                                                                Opiekun ze strony firmy:
                                                            </label>
                                                            {this.renderLeader(item.leader_id)}
                                                        </p>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <p>
                                                            <label>
                                                                Opiekun z strony uczelni:
                                                            </label>
                                                            {this.renderLecturer(item.lecturer_id)}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                    </Col>
                </Row>

                <div>
                    <If isTrue={this.state.practises.length < 1}>
    <span>
        Brak przypisanych praktyk
        </span>
                    </If>
                </div>
            </div>
        )
    }

    renderGradeData() {
        return (
            <Row className='top15'>
                <Col xs={12} md={10} lg={5}>
                    <Row>
                        <Col xs={12}>
                            <div className="application_legend_container">
                                <div className="application_legend_title">
                                    <i className="fa fa-star-half-o" style={{marginRight: '5px'}}></i>
                                    Ocena za praktyki
                                </div>
                                <Row>
                                    <If isTrue={!this.state.grade}>
                                        <Col xs={12}>
                                            <div className="application_error_text_alert">
                                                <i className="fa fa-exclamation-circle"></i>
                                                <span>Ocena nie została jeszcze wystawiona</span>
                                            </div>
                                        </Col>
                                    </If>
                                    <If isTrue={this.state.grade}>
                                        <div>
                                            <Col xs={12} md={6}>
                                            <span className='right3'>
                                                Ocena:
                                            </span>
                                                <label>
                                                    {
                                                        (this.state.grade) ?
                                                            this.state.grade.grade
                                                            :
                                                            ''
                                                    }
                                                </label>
                                            </Col>
                                            <Col xs={12} md={6}>
                                            <span className='right3'>
                                                Wystawiono:
                                            </span>
                                                <label>
                                                    {
                                                        (this.state.grade) ?
                                                            this.state.grade.grade_date
                                                            :
                                                            ''
                                                    }
                                                </label>
                                            </Col>
                                        </div>
                                    </If>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="application_legend_container">
                                <div className="application_legend_title">
                                    <i className="fa fa-file-text-o" style={{marginRight: '5px'}}></i>
                                    Raport oceniający pracę
                                </div>
                                <Row>
                                    <If isTrue={!this.state.isReportExist}>
                                        <Col xs={12}>
                                            <div className="application_error_text_alert">
                                                <i className="fa fa-exclamation-circle"></i>
                                                <span>Raport nie został jeszcze dodany</span>
                                            </div>
                                        </Col>
                                    </If>
                                    <If isTrue={Boolean(this.state.isReportExist)}>
                                        <div>
                                            <Col xs={12} md={6}>
                                                <span style={{marginRight: '5px'}}>Raport dostępny</span>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Link to={'/raport/' + this.state.isReportExist.raport_id}>
                                                    <ButtonAction onClick={() => {
                                                    }} iconType={'fa fa-eye'} btnText={'Zobacz raport'}/>
                                                </Link>
                                            </Col>
                                        </div>
                                    </If>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={1} id="practise-data-tabs">
                    <Tab eventKey={1} title="Informacje o praktyce">{this.renderMainData()}</Tab>
                    <Tab eventKey={2} title="Raport i ocena praktykanta">{this.renderGradeData()}</Tab>
                </Tabs>
            </div>
        )
    }
}
