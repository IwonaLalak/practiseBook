import React, {Component} from 'react';
import {Row, Col, FormGroup, ControlLabel, ButtonToolbar} from "react-bootstrap";
import GradesService from "../../Grades/GradesService";
import If from "../../../utilities/If";
import {ButtonAction, ButtonCancel, ButtonSave} from "../../../utilities/Buttons";
import Select from "react-select";
import ReactNotify from 'react-notify';


export default class InformationTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grade: null,
            selectedGrade:null,
            showGradeForm: false
        };
        this.getGrade = this.getGrade.bind(this);
        this.onClickAddGrade = this.onClickAddGrade.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.saveData = this.saveData.bind(this);
        this.onChangeGrade = this.onChangeGrade.bind(this);
    }

    getGrade(id){
        GradesService.getGradesByPractise(id).then(function (response) {
            this.setState({
                grade: response.data
            })
        }.bind(this))
    }

    componentWillReceiveProps(nextprops){
        this.getGrade(nextprops.practise_id);
    }

    onClickAddGrade(){
        this.setState({showGradeForm: true});
    }

    onCancelClick(){
        this.setState({showGradeForm: false})
    }

    saveData(){
        if(this.state.selectedGrade){

            let data={
                practise_id: this.props.practise_id,
                lecturer_id: localStorage.getItem("current_userid"),
                grade: this.state.selectedGrade.value
            };

            GradesService.addNewGrade(data).then(function (response) {
                if(response.status == 200){
                    this.refs.notificator.success("Pomyślnie wystawiono ocenę", "", 3000);
                    this.getGrade(this.props.practise_id);
                }
            }.bind(this))
        }
        else{
            this.refs.notificator.error("Błąd wystawiania oceny.", "Nie uzupełniono poprawnie oceny", 3000);
        }

    }

    onChangeGrade(e){
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
                <Row>
                    <Col xs={12} md={10} lg={7}>
                        <If isTrue={Boolean(this.state.grade)}>
                            <div>
                            <p>
                                <span>
                                    Ocena studenta:
                                </span>
                                <label>
                                    {
                                        (Boolean(this.state.grade))?
                                            this.state.grade.grade
                                            :
                                            ''
                                    }
                                </label>
                            </p>
                            <p>
                                <span>
                                    Data wystawienia:
                                </span>
                                <label>
                                    {
                                        (Boolean(this.state.grade))?
                                            this.state.grade.grade_date
                                            :
                                            ''
                                    }
                                </label>
                            </p>
                            </div>
                        </If>
                        <If isTrue={Boolean(!this.state.grade)}>
                            <div className="application_error_text_alert">
                                <i className="fa fa-exclamation-circle"></i>
                                <span>Student nie posiada jeszcze wystawionej oceny</span>
                            </div>
                            <div>
                                <If isTrue={localStorage.getItem('current_usergroup')==2 && !this.state.showGradeForm}>
                                    <ButtonAction onClick={this.onClickAddGrade} btnText={'Wystaw ocenę'} iconType={'fa fa-plus'}/>
                                </If>
                                <If isTrue={localStorage.getItem('current_usergroup')==2 && this.state.showGradeForm}>
                                    <FormGroup>
                                        <Row>
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
                                                        <ButtonCancel onClick={this.onCancelClick}/>
                                                        <ButtonSave onClick={this.saveData}/>
                                                    </ButtonToolbar>
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </If>
                            </div>
                        </If>
                    </Col>
                </Row>
            </div>
        )
    }
}
