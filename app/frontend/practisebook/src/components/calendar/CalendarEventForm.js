import React, {Component} from 'react';
import {Row, Col, ButtonToolbar, FormControl} from "react-bootstrap";
import ReactNotify from 'react-notify';
import PostsForm from "../posts/PostsForm";
import PractisesService from "../../pages/Practises/PractisesService";
import Form from "react-bootstrap/es/Form";
import FormGroup from "react-bootstrap/es/FormGroup";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import DateUtilities from "../../utilities/DateUtilities";
import If from "../../utilities/If";
import SettingsService from "../../pages/Settings/SettingsService";


export default class CalendarEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practise_id: null,
            date: null,
            time_start: null,
            time_end: null,
            description: '',
            addBtnClicked: false,
            working_time: 0,
            validation_time: []
        };
        this.getPractiseID = this.getPractiseID.bind(this);
        this.getValidationTime = this.getValidationTime.bind(this);
        this.cancelSaving = this.cancelSaving.bind(this);
        this.savePost = this.savePost.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTimeStart = this.onChangeTimeStart.bind(this);
        this.onChangeTimeEnd = this.onChangeTimeEnd.bind(this);
    }

    getPractiseID() {
        PractisesService.getPractiseByStudent(this.props.student_id).then(function (response) {
            if (response.data) {
                this.setState({practise_id: response.data.practises[0].practise_id})
            }
        }.bind(this))
    }

    getValidationTime(){
        SettingsService.getSettings().then(function (response) {
            if (response.data) {
                this.setState({validation_time: response.data})
            }
        }.bind(this))
    }

    componentDidMount() {
        this.getPractiseID();
        this.getValidationTime();

        if (this.props.slot) {
            this.setState({
                date: DateUtilities.getDateFromObject(this.props.slot.start),
                time_start: DateUtilities.getTimeFromObject(this.props.slot.start),
                time_end: DateUtilities.getTimeFromObject(this.props.slot.end),
                working_time: DateUtilities.countWorkingTime(DateUtilities.getTimeFromObject(this.props.slot.start), DateUtilities.getTimeFromObject(this.props.slot.end))
            })
        }

        if (this.props.editedEvent) {
            this.setState({
                date: this.props.editedEvent.post_date_start.substr(0, 10),
                time_start: this.props.editedEvent.post_date_start.substr(11, 5),
                time_end: this.props.editedEvent.post_date_end.substr(11, 5),
                description: this.props.editedEvent.post_description,
                working_time: DateUtilities.countWorkingTime(this.props.editedEvent.post_date_start.substr(11, 5), this.props.editedEvent.post_date_end.substr(11, 5))
            })
        }

    }

    cancelSaving() {
        this.props.handleCancelSavingPost();
    }

    savePost() {
        this.setState({addBtnClicked: true});

        if (this.state.description.length > 0
                && DateUtilities.validateSelectedTime(this.state.time_start, this.state.validation_time)
                && DateUtilities.validateSelectedTime(this.state.time_end, this.state.validation_time)
            && (new Date(DateUtilities.formatDateForInsert(this.state.date, this.state.time_end)) > new Date(DateUtilities.formatDateForInsert(this.state.date, this.state.time_start)))) {
            let data = {
                practise_id: this.state.practise_id,
                student_id: localStorage.getItem("current_userid"),
                post_date_start: DateUtilities.formatDateForInsert(this.state.date, this.state.time_start),
                post_date_end: DateUtilities.formatDateForInsert(this.state.date, this.state.time_end),
                post_description: this.state.description
            };

            this.props.handleSavingPost(data, Boolean(this.props.editedEvent));
        }
        else {
            this.refs.notificator.error("Błąd dodawania wpisu", "Nie uzupełniono poprawnie danych", 3000);
        }
    }

    onChangeDate(e) {
        this.setState({date: e.target.value})
        if (e.target.value.length < 1) {
            this.setState({date: null})
        }
    }

    onChangeTimeStart(e) {
        this.setState({time_start: e.target.value})
        this.setState({working_time: DateUtilities.countWorkingTime(e.target.value, this.state.time_end)});
    }

    onChangeTimeEnd(e) {
        this.setState({time_end: e.target.value})
        this.setState({working_time: DateUtilities.countWorkingTime(this.state.time_start, e.target.value)});
    }

    onChangeDescription(e) {
        this.setState({description: e.target.value})
    }

    render() {
        return (
            <div id="EVENT_FORM">
                <ReactNotify ref='notificator'/>
                <Row>
                    <Col xs={12}>
                        <div className='application_legend_container'>
                            <div className='application_legend_title'>
                                {
                                    (Boolean(this.props.editedEvent)) ?
                                        'Edycja wpisu'
                                        :
                                        'Nowy wpis'
                                }
                            </div>
                            <Row>
                                <Col xs={12}>
                                    <Form horizontal>
                                        <div>
                                            <Col sm={12} md={12} lg={12}>
                                                <FormGroup>
                                                    <h5>Ramy czasowe</h5>
                                                    <Row>
                                                        <Col md={6} lg={2}
                                                             className={(this.state.addBtnClicked && !this.state.date) ? 'has-error' : ''}>
                                                            <ControlLabel>Data wpisu</ControlLabel>
                                                            <FormControl type="date" onChange={this.onChangeDate}
                                                                         defaultValue={(this.props.slot) ? DateUtilities.getDateFromObject(this.props.slot.start) : (this.props.editedEvent) ? this.props.editedEvent.post_date_start.substr(0, 10) : null}/>
                                                        </Col>
                                                        <Col md={6} lg={4}>
                                                            <Row>
                                                                <Col xs={12} sm={6}
                                                                     className={(this.state.addBtnClicked && (!this.state.time_start || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                                    <ControlLabel>Czas rozpoczęcia</ControlLabel>
                                                                    <FormControl type="time" onChange={this.onChangeTimeStart}
                                                                                 defaultValue={(this.props.slot) ? DateUtilities.getTimeFromObject(this.props.slot.start) : (this.props.editedEvent) ? this.props.editedEvent.post_date_start.substr(11, 5) : null}/>
                                                                    <If isTrue={!DateUtilities.validateSelectedTime(this.state.time_start,this.state.validation_time)}>
                                                                        <span className="small_application_text_alert">
                                                                            <i className="fa fa-exclamation-circle"></i>
                                                                            <span>
                                                                            Najwcześniejsza godz: {(this.state.validation_time)? this.state.validation_time.min_hour : '07:00'}
                                                                            </span>
                                                                        </span>
                                                                    </If>
                                                                </Col>
                                                                <Col xs={12} sm={6}
                                                                     className={(this.state.addBtnClicked && (!this.state.time_end || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                                    <ControlLabel>Czas zakończenia</ControlLabel>
                                                                    <FormControl type="time" onChange={this.onChangeTimeEnd}
                                                                                 defaultValue={(this.props.slot) ? DateUtilities.getTimeFromObject(this.props.slot.end) : (this.props.editedEvent) ? this.props.editedEvent.post_date_end.substr(11, 5) : null}/>
                                                                    <If isTrue={!DateUtilities.validateSelectedTime(this.state.time_end,this.state.validation_time)}>
                                                                        <span className="small_application_text_alert">
                                                                            <i className="fa fa-exclamation-circle"></i>
                                                                            <span>
                                                                            Najpóżniejsza godz: {(this.state.validation_time)? this.state.validation_time.max_hour : '19:00'}
                                                                            </span>
                                                                        </span>
                                                                    </If>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md={6} lg={4}>
                                                            <p style={{marginTop: '32px', fontStyle: 'italic'}}>
                                                                Przepracowano: {this.state.working_time} minut
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                <FormGroup>
                                                    <h5>Opis wykonywanych czynności</h5>
                                                    <Row>
                                                        <Col md={12} lg={12}
                                                             className={(this.state.addBtnClicked && !this.state.description.length > 0) ? 'has-error' : ''}>
                                                            <ControlLabel>Notatka</ControlLabel>
                                                            <textarea className="form-control" onChange={this.onChangeDescription}
                                                                      defaultValue={(this.props.editedEvent) ? this.props.editedEvent.post_description : ''}></textarea>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                <div style={{clear: 'both'}}>
                                                    <FormGroup>
                                                        <div className="pull-right">
                                                            <ButtonToolbar>
                                                                <ButtonCancel onClick={this.cancelSaving}/>
                                                                <ButtonSave onClick={this.savePost}/>
                                                            </ButtonToolbar>
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            </Col>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
