import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import Select from "react-select";


export default class GradesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addBtnClicked: false,
            selectedGrade: null,
            selectedStudent: null,
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onChangeStudent = this.onChangeStudent.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);
    }

    onAddBtnClick() {

        this.setState({addBtnClicked: true})

        if(this.state.selectedGrade && this.state.selectedStudent){

            let data={
                practise_id: this.state.selectedStudent.practise_id,
                lecturer_id: localStorage.getItem("current_userid"),
                grade: this.state.selectedGrade.value
            };

            this.props.handleAddClick(data, Boolean(this.props.editedGrade));
        }
        else{
            this.refs.notificator.error("Błąd dodawania nowej oceny.", "Nie uzupełniono poprawnie danych", 3000);
        }

        // grade id, practise id, lecturer id, grade date, grade

    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }

    componentDidMount() {
        if(Boolean(this.props.editedGrade)){

            let grades = [
                {id: 1, value: '2.0', label: '2.0 - niedostateczny'},
                {id: 2, value: '3.0', label: '3.0 - dopuszczający'},
                {id: 3, value: '3.5', label: '3.5 - dopuszczający +'},
                {id: 4, value: '4.0', label: '4.0 - dobry'},
                {id: 5, value: '4.5', label: '4.5 - dobry +'},
                {id: 6, value: '5.0', label: '5.0 - bardzo dobry'},
            ];

            this.setState({
                selectedStudent: this.props.students.find(student=> student.practise_id == this.props.editedGrade.practise_id),
                selectedGrade: grades.find(grade => grade.value == this.props.editedGrade.grade)
            })
        }
    }

    onChangeStudent(e) {
        this.setState({selectedStudent: e})
    }

    onChangeGrade(e) {
        this.setState({selectedGrade: e})
    }

    render() {

        let grades = [
            {id: 1, value: '2.0', label: '2.0 - niedostateczny'},
            {id: 2, value: '3.0', label: '3.0 - dopuszczający'},
            {id: 3, value: '3.5', label: '3.5 - dopuszczający +'},
            {id: 4, value: '4.0', label: '4.0 - dobry'},
            {id: 5, value: '4.5', label: '4.5 - dobry +'},
            {id: 6, value: '5.0', label: '5.0 - bardzo dobry'},
        ];

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal>
                    <div>
                        <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                                <Row>
                                    <Col xs={12} md={6} lg={4}
                                         className={(this.state.addBtnClicked && !this.state.selectedStudent) ? 'has-error' : ''}>
                                        <ControlLabel>Wybierz studenta</ControlLabel>
                                        <Select
                                            options={this.props.students}
                                            value={this.state.selectedStudent}
                                            name="StudentSelect"
                                            onChange={this.onChangeStudent}
                                            clearable={false}
                                            labelKey="lastname"
                                            valueKey="user_id"
                                            placeholder="Wybierz studenta"
                                            disabled={Boolean(this.props.editedGrade)}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} lg={3} className={(this.state.addBtnClicked && !this.state.selectedGrade) ? 'has-error' : ''}>
                                        <ControlLabel>Wybierz ocenę</ControlLabel>
                                        <Select
                                            options={grades}
                                            value={this.state.selectedGrade}
                                            name="StudentSelect"
                                            onChange={this.onChangeGrade}
                                            clearable={false}
                                            labelKey="label"
                                            valueKey="id"
                                            placeholder="Wybierz ocenę"
                                        />
                                    </Col>
                                    <Col xs={12} md={12} lg={5}>
                                        <div style={{marginTop: '32px'}}>
                                            <ButtonToolbar>
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
