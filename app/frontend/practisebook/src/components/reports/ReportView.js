import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar, Radio} from 'react-bootstrap';
import {ButtonAction, ButtonCancel, ButtonClose, ButtonEdit, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import If from "../../utilities/If";
import Select from "react-select";


export default class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Row>
                    <Col xs={12} md={10} lg={8}>
                        <div id="REPORT_FORM">
                            <div id="report-form-corner"></div>
                            <div>
                                <Row>
                                    <Col xs={12}>
                                        <h1>
                                            Raport nr 1
                                        </h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <h4>Postawowe informacje</h4>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p>
                                            <label>Praktyka numer: </label>
                                            <span>
                                                1
                                            </span>
                                        </p>
                                        <p>
                                            <label>Praktykant: </label>
                                            <span>
                                                sdssdsds dsdsds
                                            </span>
                                        </p>

                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p>
                                            <label>Czas praktyki: </label>
                                            <span>
                                                data - data, 120h
                                            </span>
                                        </p>
                                        <p>
                                            <label>Zakład pracy: </label>
                                            <span>firma</span>
                                        </p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <p>
                                            <label>
                                                Data wystawienia:
                                            </label>
                                            <span>data</span>
                                        </p>
                                        <p>
                                            <label>Wystawiający: </label>
                                            <span>ndsjn knsksdns</span>
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
                                                T / N
                                            </label>
                                        </p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>
                                            <span>Student zapoznał się z strukturą organizacyjną zakładu pracy.</span>
                                            <label>
                                                T / N
                                            </label>
                                        </p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>
                                            <span>Student zapoznał się z najważniejszymi zadaniami realizowanymi przez poszczególne wydziały / zespoły
                                        organizacyjne przedsiębiorstwa.</span>
                                            <label>
                                                T / N
                                            </label>
                                        </p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>
                                            <span>Student potrafi scharakteryzować specyfikę produktów bądź usług przygotowywanych w zakładzie pracy.</span>
                                            <label>
                                                T / N
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
                                            <label>
                                                Dostateczny / dobry / bardzo dobry
                                            </label>
                                        </p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>
                                            <span>Ocena stopnia samoorganizacji oraz jakości pracy studenta</span>
                                            <label>
                                                Dostateczny / dobry / bardzo dobry
                                            </label>
                                        </p>
                                    </Col>
                                    <Col xs={12}>
                                        <p>
                                            <span>Ocena stopnia komunikatywności, umiejętności współpracy oraz kultury osobistej studenta</span>
                                            <label>
                                                Dostateczny / dobry / bardzo dobry
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
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                            dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd dhdshsdhsd
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <h4>Całkowita ocena studenta</h4>
                                    </Col>
                                    <Col xs={12}>
                                        <h5>
                                            3.0
                                        </h5>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={10} lg={8}>
                        <div className={'pull-right'} style={{marginTop: '15px'}}>
                            <ButtonAction onClick={() => {
                            }} btnText={'Powrót'} iconType={'fa fa-angle-double-left'}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
