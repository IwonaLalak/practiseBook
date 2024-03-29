import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import ReactNotify from 'react-notify';

export default class PractisesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_start: null,
            date_end: null,
            selectedStudent: null,
            selectedLecturer: null,
            selectedLeader: null,
            selectedCompany: null,
            total_time: 0,
            buttonClicked: false
        };
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);

        this.onChangeStudent = this.onChangeStudent.bind(this);
        this.onChangeLecturer = this.onChangeLecturer.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeLeader = this.onChangeLeader.bind(this);
        this.onChangeDateStart = this.onChangeDateStart.bind(this);
        this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
        this.onChangeTotalTime = this.onChangeTotalTime.bind(this);
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }



    onAddBtnClick() {

        // todo: dodać z settingsow ograniczenia

        this.setState({buttonClicked: true});

        if (
            this.state.selectedStudent !== null &&
            this.state.selectedLecturer !== null &&
            this.state.selectedLeader !== null &&
            this.state.selectedCompany !== null &&
            this.state.total_time > 0 &&
            (new Date(this.state.date_end) > new Date(this.state.date_start))
        ) {
            let data = {
                student_id: this.state.selectedStudent.user_id,
                lecturer_id: this.state.selectedLecturer.user_id,
                leader_id: this.state.selectedLeader.user_id,
                company_id: this.state.selectedCompany.company_id,
                date_start: this.state.date_start,
                date_end: this.state.date_end,
                total_time: this.state.total_time
            }

            this.props.handleAddClick(data);
            let inputs = document.getElementsByTagName('input');

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = '';
            }

            this.setState({
                selectedLeader: null,
                selectedCompany: null,
                selectedStudent: null,
                selectedLecturer: null,
                date_start: new Date(),
                date_end: new Date(),
                buttonClicked: false,
                total_time: 0
            });
        }
        else {
            if (new Date(this.state.date_end) <= new Date(this.state.date_start)) {
                this.refs.notificator.error("Błąd dodawania nowej praktyki.", "Niepoprawne ramy czasowe", 3000);
            } else {
                this.refs.notificator.error("Błąd dodawania nowej praktyki.", "Nie uzupełniono poprawnie danych", 3000);
            }
        }
    }

    onChangeStudent(e) {
        this.setState({selectedStudent: e})
    }

    onChangeLecturer(e) {
        this.setState({selectedLecturer: e})
    }

    onChangeCompany(e) {
        this.setState({selectedCompany: e, selectedLeader: null});
    }

    onChangeLeader(e) {
        this.setState({selectedLeader: e});
        if (e !== null) {
            this.setState({selectedCompany: this.props.companies.find(company => company.company_id == e.company_id)})
        }
        else {
            this.setState({selectedCompany: null})
        }
    }

    onChangeDateStart(e) {
        this.setState({date_start: e.target.value})
    }

    onChangeDateEnd(e) {
        this.setState({date_end: e.target.value})
    }

    onChangeTotalTime(e) {
        this.setState({total_time: e.target.value})
    }

    componentWillReceiveProps() {
        if (localStorage.getItem("current_usergroup") == 2) {
            this.setState({selectedLecturer: this.props.lecturers.find(lecturer => lecturer.user_id == localStorage.getItem("current_userid"))})
        }
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal={true}>
                    <div>
                        <Col xs={12} md={8} lg={8}>
                            <FormGroup>
                                <h5>Wybór studenta oraz opiekuna za strony uczelni</h5>
                                <Row>
                                    <Col xs={12} md={6} className={(this.state.buttonClicked && !this.state.selectedStudent) ? 'has-error' : ''}>
                                        <ControlLabel>Student</ControlLabel>
                                        <Select
                                            options={this.props.students}
                                            value={this.state.selectedStudent}
                                            name="StudentSelect"
                                            onChange={this.onChangeStudent}
                                            clearable={false}
                                            labelKey="lastname"
                                            valueKey="user_id"
                                            placeholder="Wybierz studenta"
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className={(this.state.buttonClicked && !this.state.selectedLecturer) ? 'has-error' : ''}>
                                        <ControlLabel>Opiekun ze strony uczelni</ControlLabel>
                                        <Select
                                            options={this.props.lecturers}
                                            value={this.state.selectedLecturer}
                                            name="LecturerSelect"
                                            onChange={this.onChangeLecturer}
                                            clearable={false}
                                            labelKey="lastname"
                                            valueKey="user_id"
                                            placeholder="Wybierz wykładowcę"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h5>Wybór opiekuna ze strony firmy</h5>
                                <Row>
                                    <Col xs={12} md={6} className={(this.state.buttonClicked && !this.state.selectedLeader) ? 'has-error' : ''}>
                                        <ControlLabel>Opiekun ze strony firmy</ControlLabel>
                                        <Select
                                            options={this.props.leaders}
                                            value={this.state.selectedLeader}
                                            name="LeaderSelect"
                                            onChange={this.onChangeLeader}
                                            clearable={false}
                                            labelKey="lastname"
                                            valueKey="user_id"
                                            placeholder="Wybierz leadera"
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className={(this.state.buttonClicked && !this.state.selectedCompany) ? 'has-error' : ''}>
                                        <ControlLabel>Firma</ControlLabel>
                                        <Select
                                            options={this.props.companies}
                                            value={this.state.selectedCompany}
                                            name="CompanySelect"
                                            onChange={this.onChangeCompany}
                                            clearable={false}
                                            labelKey="name"
                                            valueKey="company_id"
                                            placeholder="Wybierz firmę"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h5>Termin i długość praktyki</h5>
                                <Row>
                                    <Col xs={12} md={3} className={((new Date(this.state.date_end) <= new Date(this.state.date_start) && this.state.buttonClicked)? 'has-error' : '')}>
                                        <ControlLabel>Data rozpoczęcia</ControlLabel>
                                        <div>
                                            <FormControl type={"date"} onChange={this.onChangeDateStart}/>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={3} className={((new Date(this.state.date_end) <= new Date(this.state.date_start) && this.state.buttonClicked)? 'has-error' : '')}>
                                        <ControlLabel>Data zakończenia</ControlLabel>
                                        <div>
                                            <FormControl type={"date"} onChange={this.onChangeDateEnd}/>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={2} className={(this.state.buttonClicked && !this.state.total_time > 0) ? 'has-error' : ''}>
                                        <ControlLabel>Czas trwania (h)</ControlLabel>
                                        <FormControl type="number" onChange={this.onChangeTotalTime}/>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <div className="pull-right">
                                            <ButtonToolbar style={{marginTop: '27px'}}>
                                                <ButtonCancel onClick={this.onCancelBtnClick}/>
                                                <ButtonSave onClick={this.onAddBtnClick}/>
                                            </ButtonToolbar>
                                        </div>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
