import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import Select from 'react-select';
import ReactNotify from 'react-notify';

export default class PractisesEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_start: null,
            date_end: null,
            selectedLeader: null,
            selectedCompany: null,
            total_time: 0,
            buttonClicked: false
        };
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);

        this.onChangeLeader = this.onChangeLeader.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeDateStart = this.onChangeDateStart.bind(this);
        this.onChangeDateEnd = this.onChangeDateEnd.bind(this);
        this.onChangeTotalTime = this.onChangeTotalTime.bind(this);
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }


    onSaveBtnClick() {

        this.setState({buttonClicked: true});

        if (
            this.state.selectedLeader !== null &&
            this.state.selectedCompany !== null &&
            this.state.total_time > 0 &&
            (new Date(this.state.date_end) > new Date(this.state.date_start))
        ) {
            let data = {
                leader_id: this.state.selectedLeader.user_id,
                company_id: this.state.selectedCompany.company_id,
                date_start: this.state.date_start,
                date_end: this.state.date_end,
                total_time: this.state.total_time
            }

            this.props.handleSaveButtonClick(data);

        }
        else {
            if (new Date(this.state.date_end) <= new Date(this.state.date_start)) {
                this.refs.notificator.error("Błąd edycji praktyki.", "Niepoprawne ramy czasowe", 3000);
            } else {
                this.refs.notificator.error("Błąd edycji praktyki.", "Nie uzupełniono poprawnie danych", 3000);
            }
        }    }

    onChangeLeader(e) {
        this.setState({selectedLeader: e});
        if (e !== null) {
            this.setState({selectedCompany: this.props.companies.find(company => company.company_id == e.company_id)})
        }
        else {
            this.setState({selectedCompany: null})
        }
    }

    onChangeCompany(e) {
        this.setState({selectedCompany: e, selectedLeader: null});
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
        console.log(this.props.editedPractise)

        this.setState({
            selectedLeader: this.props.leaders.find(leader => leader.user_id == this.props.editedPractise.leader_id),
            selectedCompany: this.props.companies.find(company => company.company_id == this.props.editedPractise.company_id),
            date_start: this.props.editedPractise.date_start.substr(0,10),
            date_end: this.props.editedPractise.date_end.substr(0,10),
            total_time: this.props.editedPractise.total_time
        })
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal={true}>
                    <Row>
                        <Col xs={4} md={4} lg={2}>
                            <ControlLabel>Data rozpoczęcia</ControlLabel>
                            <FormControl type={"date"} onChange={this.onChangeDateStart} defaultValue={this.props.editedPractise.date_start.substr(0,10)}/>
                        </Col>
                        <Col xs={4} md={4} lg={2}>
                            <ControlLabel>Data zakończenia</ControlLabel>
                            <FormControl type={"date"} onChange={this.onChangeDateEnd} defaultValue={this.props.editedPractise.date_end.substr(0,10)}/>
                        </Col>
                        <Col xs={4} md={4} lg={2}>
                            <ControlLabel>Czas trwania (h)</ControlLabel>
                            <FormControl type="number" onChange={this.onChangeTotalTime} defaultValue={this.props.editedPractise.total_time}/>
                        </Col>
                        <Col xs={6} md={6} lg={3}>
                            <ControlLabel>Opiekun od strony firmy</ControlLabel>
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
                        <Col xs={6} md={6} lg={3}>
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
                    <Row>
                        <Col xs={12}>
                            <ButtonToolbar>
                                <ButtonCancel onClick={this.onCancelBtnClick}/>
                                <ButtonSave onClick={this.onSaveBtnClick}/>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
