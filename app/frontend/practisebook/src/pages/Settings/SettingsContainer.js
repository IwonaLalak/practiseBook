import React, {Component} from 'react';

import Header from '../../components/header/Header';
import {Row, Col, Form, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {ButtonSave} from "../../utilities/Buttons";
import SettingsService from "./SettingsService";
import DateUtilities from "../../utilities/DateUtilities";
import ReactNotify from 'react-notify';

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            earliest: '',
            latest: '',
            current_settings: []
        };
        this.getSettingsData = this.getSettingsData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.onChangeEarliest = this.onChangeEarliest.bind(this);
        this.onChangeLatest = this.onChangeLatest.bind(this);
    }

    getSettingsData() {
        SettingsService.getSettings().then(function (response) {
            this.setState({current_settings: response.data})
        }.bind(this))
    }

    componentDidMount() {
        this.getSettingsData();
    }

    onChangeEarliest(e) {
        this.setState({earliest: e.target.value})
    }

    onChangeLatest(e) {
        this.setState({latest: e.target.value})
    }

    saveData() {

        if(this.state.latest > this.state.earliest){
            let data = {
                min_hour: this.state.earliest,
                max_hour: this.state.latest
            }

            SettingsService.setSettings(data).then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    this.refs.notificator.success("Pomyślnie zmieniono ustawienia", "", 3000);
                    this.getSettingsData();
                }
            }.bind(this))
        }
        else{
            this.refs.notificator.error("Podano niepoprawne wartości", "Druga wartość musi być późniejsza od pierwszej", 3000);
        }
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'ustawienia', text: 'ustawienia'}, {url: '', text: 'ustawienia globalne'}]}/>
                </div>
                <div id="GLOBAL_SETTINGS">
                    <Row>
                        <Col xs={12} md={10} lg={6}>
                            <Row>
                                <Col xs={12}>
                                    <div className="application_legend_container">
                                        <div className="application_legend_title">
                                            <i className="fa fa-cogs" style={{marginRight: '5px'}}></i>
                                            Obecne ustawienia
                                        </div>
                                        <Row>
                                            <Col xs={6} md={6}>
                                                <span>Najwcześniejsza godzina:</span>
                                                <label>{this.state.current_settings.min_hour}</label>
                                            </Col>
                                            <Col xs={6} md={6}>
                                                <span>Najpóźniejsza godzina:</span>
                                                <label>{this.state.current_settings.max_hour}</label>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>

                            <Form>
                                <Row>
                                    <Col xs={12}>
                                        <h5>Ustawienia dotyczące dodawania wpisów przez studentów</h5>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <ControlLabel>Najwcześniejsza godzina</ControlLabel>
                                            <FormControl type={'time'} onChange={this.onChangeEarliest}/>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <ControlLabel>Najpóźniejsza godzina</ControlLabel>
                                            <FormControl type={'time'} onChange={this.onChangeLatest}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Row>
                                    <Col xs={12}>
                                        <div className={'pull-right'}>
                                            <ButtonSave onClick={this.saveData}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
