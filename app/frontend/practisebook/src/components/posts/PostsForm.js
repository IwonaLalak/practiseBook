import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import DatePicker from 'react-date-picker'
import DateField from 'react-date-picker'


export default class PostsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            date: null,
            time_start: null,
            time_end: null,
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTimeStart = this.onChangeTimeStart.bind(this);
        this.onChangeTimeEnd = this.onChangeTimeEnd.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }


    onAddBtnClick() {

        // todo: dodac ograniczenia

        this.setState({addBtnClicked: true})

        if (this.state.date && this.state.time_start && this.state.time_end && this.state.description.length > 0 && (this.state.time_end > this.state.time_start)) {

            let date_start = new Date(this.state.date);
            let date_end = new Date(this.state.date);

            date_start.setHours(parseInt(this.state.time_start.substr(0, 2)));
            date_start.setMinutes(parseInt(this.state.time_start.substr(3, 2)));

            date_end.setHours(parseInt(this.state.time_end.substr(0, 2)));
            date_end.setMinutes(parseInt(this.state.time_end.substr(3, 2)));

            let data = {
                practise_id: 0,
                student_id:0,
                post_date_start: date_start,
                post_date_end: date_end,
                post_description: this.state.description
            };

            this.props.handleAddClick(data,Boolean(this.props.editedPost));

            this.setState({addBtnClicked: false})

        }
        else {
            if(this.state.time_end <= this.state.time_start){
                this.refs.notificator.error("Błąd dodawania nowego wpisu.", "Godzina końcowa musi być późniejsza od godziny startowej", 3000)
            }
            else{
                this.refs.notificator.error("Błąd dodawania nowego wpisu.", "Nie uzupełniono poprawnie danych", 3000);
            }
        }
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }

    componentDidMount() {
        if (this.props.editedPost) {

            console.log(this.props.editedPost)

            this.setState({
                date: this.props.editedPost.post_date_start.substr(0,10),
                time_start: this.props.editedPost.post_date_start.substr(11,5),
                time_end: this.props.editedPost.post_date_end.substr(11,5),
                description: this.props.editedPost.post_description
            })

        }
    }

    onChangeDate(e) {
        this.setState({date: new Date(e.target.value)})
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
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal>
                    <div>
                        <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                                <h5>Ramy czasowe</h5>
                                <Row>
                                    <Col md={6} lg={2} className={(this.state.addBtnClicked && !this.state.date) ? 'has-error' : ''}>
                                        <ControlLabel>Data wpisu</ControlLabel>
                                        <FormControl type="date" onChange={this.onChangeDate} defaultValue={(this.props.editedPost)? this.props.editedPost.post_date_start.substr(0,10):null}/>
                                    </Col>
                                    <Col md={6} lg={4}>
                                        <Row>
                                            <Col xs={12} sm={6} className={(this.state.addBtnClicked && (!this.state.time_start || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                <ControlLabel>Czas rozpoczęcia</ControlLabel>
                                                <FormControl type="time" onChange={this.onChangeTimeStart} defaultValue={(this.props.editedPost)? this.props.editedPost.post_date_start.substr(11,5):null}/>
                                            </Col>
                                            <Col xs={12} sm={6} className={(this.state.addBtnClicked && (!this.state.time_end || this.state.time_end <= this.state.time_start)) ? 'has-error' : ''}>
                                                <ControlLabel>Czas zakończenia</ControlLabel>
                                                <FormControl type="time" onChange={this.onChangeTimeEnd} defaultValue={(this.props.editedPost)? this.props.editedPost.post_date_end.substr(11,5):null}/>
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
                                        <textarea className="form-control" onChange={this.onChangeDescription} defaultValue={(this.props.editedPost)? this.props.editedPost.post_description:''}></textarea>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <div style={{clear: 'both'}}>
                                <FormGroup>
                                    <div className="pull-right">
                                        <ButtonToolbar>
                                            <ButtonCancel onClick={this.onCancelBtnClick}/>
                                            <ButtonSave onClick={this.onAddBtnClick}/>
                                        </ButtonToolbar>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
