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
        };
        this.getPractiseID = this.getPractiseID.bind(this);
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

    componentDidMount() {
        this.getPractiseID();

        if (this.props.slot) {
            this.setState({
                date: DateUtilities.getDateFromObject(this.props.slot.start),
                time_start: DateUtilities.getTimeFromObject(this.props.slot.start),
                time_end: DateUtilities.getTimeFromObject(this.props.slot.end)
            })
        }

        if(this.props.editedEvent){
            this.setState({
                date: this.props.editedEvent.post_date_start.substr(0,10),
                time_start: this.props.editedEvent.post_date_start.substr(11,5),
                time_end: this.props.editedEvent.post_date_end.substr(11,5),
                description: this.props.editedEvent.post_description
            })
        }

        console.log(this.props.editedEvent)
    }

    cancelSaving() {
        this.props.handleCancelSavingPost();
    }

    savePost() {
        this.setState({addBtnClicked: true});

        console.log(this.state.time_start);
        console.log(this.state.time_end);
        console.log(this.state.date);
        console.log(this.state.description);

        if (this.state.description.length > 0 && (new Date(DateUtilities.formatDateForInsert(this.state.date, this.state.time_end)) > new Date(DateUtilities.formatDateForInsert(this.state.date, this.state.time_start)))) {
            let data = {
                practise_id: this.props.practise_id,
                student_id: localStorage.getItem("current_userid"),
                post_date_start: DateUtilities.formatDateForInsert(this.state.date, this.state.time_start),
                post_date_end: DateUtilities.formatDateForInsert(this.state.date, this.state.time_end),
                post_description: this.state.description
            };

            this.props.handleSavingPost(data,Boolean(this.props.editedEvent));
        }
        else{
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
    }

    onChangeTimeEnd(e) {
        this.setState({time_end: e.target.value})
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
                                    (Boolean(this.props.editedEvent))?
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
                                                                         defaultValue={(this.props.slot) ? DateUtilities.getDateFromObject(this.props.slot.start) : (this.props.editedEvent)? this.props.editedEvent.post_date_start.substr(0,10):null}/>
                                                        </Col>
                                                        <Col md={6} lg={4}>
                                                            <Row>
                                                                <Col xs={12} sm={6}
                                                                     className={(this.state.addBtnClicked && (!this.state.time_start || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                                    <ControlLabel>Czas rozpoczęcia</ControlLabel>
                                                                    <FormControl type="time" onChange={this.onChangeTimeStart}
                                                                                 defaultValue={(this.props.slot) ? DateUtilities.getTimeFromObject(this.props.slot.start) : (this.props.editedEvent)? this.props.editedEvent.post_date_start.substr(11,5):null}/>
                                                                </Col>
                                                                <Col xs={12} sm={6}
                                                                     className={(this.state.addBtnClicked && (!this.state.time_end || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                                    <ControlLabel>Czas zakończenia</ControlLabel>
                                                                    <FormControl type="time" onChange={this.onChangeTimeEnd}
                                                                                 defaultValue={(this.props.slot) ? DateUtilities.getTimeFromObject(this.props.slot.end) : (this.props.editedEvent)? this.props.editedEvent.post_date_end.substr(11,5):null}/>
                                                                </Col>
                                                            </Row>
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
                                                                      defaultValue={(this.props.editedEvent)? this.props.editedEvent.post_description:''}></textarea>
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