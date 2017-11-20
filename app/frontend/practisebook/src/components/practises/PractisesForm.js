import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import If from '../../utilities/If';
import ReactNotify from 'react-notify';
import DatePicker from 'react-date-picker'

export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({date: e})
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal={true}>
                    <div>
                        <Col xs={12} md={8} lg={8}>
                            <DatePicker
                                onChange={this.handleChange}
                                value={this.state.date}
                                dropdownMode="select"
                                forceValidDate={true}
                                dateFormat='YYYY-MM-DD'
                                updateOnDateClick={true}
                            />
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
