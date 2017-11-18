import React, {Component} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import PractisesService from "../../pages/Practises/PractisesService";

export default class PractiseDataForStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practises: [],
            leaders: [],
            lecturers: []
        }
        this.renderGradeData = this.renderGradeData.bind(this);
        this.renderMainData = this.renderMainData.bind(this);
        this.getPractiseData = this.getPractiseData.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderLecturer = this.renderLecturer.bind(this);
    }

    componentDidMount(){
        this.getPractiseData();
    }

    getPractiseData(){
        //todo: userid do zmiany
        let userid = 24;

        PractisesService.getPractiseByStudent(userid).then(function (response) {
            if(response.status == 200){
                if(response.data[0] != false){
                   this.setState({
                       practises: response.data.practises,
                       leaders: response.data.leaders,
                       lecturers: response.data.lecturers
                   })
                }
            }
            console.log(response)
        }.bind(this))
    }

    renderLeader(id){
        let leader = this.state.leaders.find(leader => leader.user_id == id);
        if(leader){
            return(
                <div>
                    <h5>{leader.firstname} {leader.lastname}</h5>
                    <p>
                        Telefon: {leader.phone}
                    </p>
                    <p>
                        Email: {leader.email}
                    </p>
                </div>
            )
        }
    }

    renderLecturer(id){
        let lecturer = this.state.lecturers.find(lecturer => lecturer.user_id == id);
        if(lecturer){
            return(
                <div>
                    <h5>{lecturer.firstname} {lecturer.lastname}</h5>
                    <p>
                        Telefon: {lecturer.phone}
                    </p>
                    <p>
                        Email: {lecturer.email}
                    </p>
                </div>
            )
        }
    }
    renderMainData(){
        return(
            <Row>
                <Col xs={12} md={10} lg={7}>
                    {
                        this.state.practises.map((item, index) =>
                            <div key={++index}>
                                {
                                    (this.state.practises.length > 1)?
                                        <h2>{"Praktyka "+index}</h2>
                                        :
                                        ''
                                }
                                <div>
                                    <h4>
                                        <i className="fa fa-lg fa-calendar"></i>
                                        Terminarz i wymiar praktyki
                                    </h4>
                                    <p>
                                        <label>
                                            Data rozpoczęcia:
                                        </label>
                                        <span>
                                            {item.date_start}
                            </span>
                                    </p>
                                    <p>
                                        <label>
                                            Data zakończenia:
                                        </label>
                                        <span>
                                            {item.date_end}
                            </span>
                                    </p>
                                    <p>
                                        <label>
                                            Wymiar godzinowy praktyki:
                                        </label>
                                        <span>
                                            {item.total_time}
                            </span>
                                    </p>
                                </div>
                                <div>
                                    <h4>
                                        <i className="fa fa-lg fa-building-o"></i>
                                        Zakład pracy
                                    </h4>
                                    <p>
                                        <label>
                                            Nazwa:
                                        </label>
                                        <span>
                                            {item.name}
                            </span>
                                    </p>
                                    <p>
                                        <label>
                                            Adres:
                                        </label>
                                        <span>
                                            {item.street} {item.place}, {item.city}
                            </span>
                                    </p>
                                    <p>
                                        <label>
                                            Kontakt:
                                        </label>
                                        <span>
                                            {item.phone}, {item.email}
                            </span>
                                    </p>
                                </div>
                                <div>
                                    <h4>
                                        <i className="fa fa-lg fa-users"></i>
                                        Opiekunowie
                                    </h4>
                                    <p>
                                        <label>
                                            Opiekun ze strony firmy:
                                        </label>
                                        {this.renderLeader(item.leader_id)}
                                    </p>
                                    <p>
                                        <label>
                                            Opiekun z strony uczelni:
                                        </label>
                                        {this.renderLecturer(item.lecturer_id)}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                </Col>
            </Row>
        )
    }

    renderGradeData(){
        return(
            <Row>
                <Col xs={12} md={10} lg={7}>
                    <h4>
                        <i className="fa fa-lg fa-star-half-o"></i>
                        Ocena za praktyki
                    </h4>
                    <p>
                        tu ocena
                    </p>
                    <h4>
                        <i className="fa fa-lg fa-file-text-o"></i>
                        Raport oceniający pracę
                    </h4>
                    <p>
                        tu raport
                    </p>
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
