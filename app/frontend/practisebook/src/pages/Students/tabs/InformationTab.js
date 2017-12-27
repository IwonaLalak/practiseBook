import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import ReactTooltip from 'react-tooltip'


export default class InformationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderCompany = this.renderCompany.bind(this);
    }

    renderCompany() {
        return (
            <div>
                <p data-tip='' data-for={'company_data' + this.props.practise.company_id} data-place="bottom">{this.props.practise.name} <i
                    className="fa fa-info-circle" style={{color: '#999', marginLeft: '5px'}}></i></p>
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
            <div className='top15'>
                <Row>
                    <Col xs={12} md={10} lg={5}>
                        <Row>
                            <Col xs={12}>
                                <div className="application_legend_container">
                                    <div className="application_legend_title">
                                        <i className="fa fa-user-circle-o" style={{marginRight: '5px'}}></i>
                                        Student
                                    </div>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <span style={{fontWeight:'bold'}}>{this.props.student.firstname} {this.props.student.lastname}</span>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <i className="fa fa-phone" style={{marginRight: '5px'}}></i>
                                            <span>{this.props.student.phone}</span>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <span>{this.props.student.study}, {this.props.student.semester}</span>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <i className="fa fa-envelope-o" style={{marginRight: '5px'}}></i>
                                            <span>{this.props.student.email}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="application_legend_container">
                                    <div className="application_legend_title">
                                        <i className="fa fa-graduation-cap" style={{marginRight: '5px'}}></i>
                                        Czas i miejsce odbywania praktyki
                                    </div>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <span className='right3'>Data rozpoczęcia:</span><label>{this.props.practise.date_start}</label>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <span className='right3'>Całkowity czas trwania:</span><label>{this.props.practise.total_time}h</label>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <span className='right3'>Data zakończenia:</span><label>{this.props.practise.date_end}</label>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <span className='right3'>Zakład pracy:</span><label>{this.renderCompany()}</label>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="application_legend_container">
                                    <div className="application_legend_title">
                                        <i className="fa fa-users" style={{marginRight: '5px'}}></i>
                                        Opiekunowie praktyki
                                    </div>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <h5 className='subtitle'>ze strony uczelni (wykładowca)</h5>
                                            <div>
                                                <label>{this.props.lecturer.firstname} {this.props.lecturer.lastname}</label>
                                            </div>
                                            <div>
                                                <i className="fa fa-phone" style={{marginRight: '5px'}}></i>
                                                <span>{this.props.lecturer.phone}</span>
                                            </div>
                                            <div>
                                                <i className="fa fa-envelope-o" style={{marginRight: '5px'}}></i>
                                                <span>{this.props.lecturer.email}</span>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h5 className='subtitle'>ze strony firmy (leader)</h5>
                                            <div>
                                                <label>{this.props.leader.firstname} {this.props.leader.lastname}</label>
                                            </div>
                                            <div>
                                                <i className="fa fa-phone" style={{marginRight: '5px'}}></i>
                                                <span>{this.props.leader.phone}</span>
                                            </div>
                                            <div>
                                                <i className="fa fa-envelope-o" style={{marginRight: '5px'}}></i>
                                                <span>{this.props.leader.email}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
