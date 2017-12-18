import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import ReactTooltip from 'react-tooltip'


export default class InformationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderCompany = this.renderCompany.bind(this);
    }

    renderCompany(){
        return (
            <div>
                <p data-tip='' data-for={'company_data' + this.props.practise.company_id} data-place="bottom">{this.props.practise.name} <i className="fa fa-info-circle" style={{color: '#999', marginLeft: '5px'}}></i> </p>
                <ReactTooltip id={'company_data' + this.props.practise.company_id}>
                    <p>{this.props.practise.brand}</p>
                    <p>{this.props.practise.phone}</p>
                    <p>{this.props.practise.email}</p>
                    <p>{this.props.practise.city}, {this.props.practise.street} {this.props.practise.place}</p>
                </ReactTooltip>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={10} lg={7}>
                        <Row>
                            <Col xs={12} md={6}>
                                <h4>
                                    <i className="fa fa-user-circle-o"></i>
                                    Student
                                </h4>
                                <div>
                                    <label>{this.props.student.firstname} {this.props.student.lastname}</label>
                                </div>
                                <div>
                                    <span>{this.props.student.phone}</span>
                                </div>
                                <div>
                                    <span>{this.props.student.email}</span>
                                </div>
                                <div>
                                    <span>{this.props.student.study}, {this.props.student.semester}</span>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <h4>
                                    <i className="fa fa-graduation-cap"></i>
                                    Czas i miejsce odbywania praktyki
                                </h4>
                                <div>
                                    <span>Data rozpoczęcia:</span><label>{this.props.practise.date_start}</label>
                                </div>
                                <div>
                                    <span>Data zakończenia:</span><label>{this.props.practise.date_end}</label>
                                </div>
                                <div>
                                    <span>Całkowity czas trwania:</span><label>{this.props.practise.total_time}h</label>
                                </div>
                                <div>
                                    <span>Zakład pracy:</span><label>{this.renderCompany()}</label>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <h4>
                                    <i className="fa fa-users"></i>
                                    Opiekunowie praktyki
                                </h4>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <h5>ze strony uczelni (wykładowca)</h5>
                                        <div>
                                            <label>{this.props.lecturer.firstname} {this.props.lecturer.lastname}</label>
                                        </div>
                                        <div>
                                            <span>{this.props.lecturer.phone}</span>
                                        </div>
                                        <div>
                                            <span>{this.props.lecturer.email}</span>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <h5>ze strony firmy (leader)</h5>
                                        <div>
                                            <label>{this.props.leader.firstname} {this.props.leader.lastname}</label>
                                        </div>
                                        <div>
                                            <span>{this.props.leader.phone}</span>
                                        </div>
                                        <div>
                                            <span>{this.props.leader.email}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
