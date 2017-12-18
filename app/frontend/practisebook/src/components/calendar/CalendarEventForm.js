import React, {Component} from 'react';
import {Row, Col, ButtonToolbar, FormControl} from "react-bootstrap";
import ReactNotify from 'react-notify';


export default class CalendarEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="EVENT_FORM">
                <ReactNotify ref='notificator'/>
                <Row>
                    <Col xs={12}>
                        <div className='application_legend_container'>
                            <div className='application_legend_title'>
                                Nowy wpis
                            </div>
                            <Row>
                                <Col xs={12}>
                                    formularz
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
