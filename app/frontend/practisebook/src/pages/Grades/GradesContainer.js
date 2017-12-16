import React, {Component} from 'react';

import Header from '../../components/header/Header';
import GeneralTop from "../../components/generaltop/GeneralTop";
import GradesTable from "../../components/grades/GradesTable";
import GradesForm from "../../components/grades/GradesForm";
import StudentsService from "../Students/StudentsService";
import ReactNotify from 'react-notify';
import GradesService from "./GradesService";
import If from "../../utilities/If";

export default class GradesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            students: [],
            filtersState: false,
            showGradeForm: false,
            gradeForEdition: false,
        };
        this.getStudents = this.getStudents.bind(this);
        this.getGrades = this.getGrades.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewGrade = this.handleClickAddNewGrade.bind(this);
        this.handleClickEditGrade = this.handleClickEditGrade.bind(this);
        this.handleClickDeleteGrade = this.handleClickDeleteGrade.bind(this);
        this.saveData = this.saveData.bind(this);
        this.cancelSavingData = this.cancelSavingData.bind(this);
    }

    componentDidMount() {
        this.getGrades();
        this.getStudents();
    }

    getGrades() {
        GradesService.getGradesByLecturer(localStorage.getItem('current_userid')).then(function (response) {
            this.setState({grades: response.data})
        }.bind(this))
    }

    getStudents() {
        StudentsService.getStudentsByLecturer(localStorage.getItem('current_userid')).then(function (response) {
            this.setState({students: response.data})
        }.bind(this))
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewGrade() {
        this.setState({showGradeForm: true})
    }

    handleClickEditGrade(id) {
        this.setState({gradeForEdition: this.state.grades.find(grade => grade.grade_id == id), showGradeForm: true});
    }

    handleClickDeleteGrade(id) {
        GradesService.deleteGrade(id).then(function (response) {
            if (response.status == 200) {
                this.refs.notificator.success("Pomyślnie usunięto ocenę", "", 3000);
                this.getGrades();
            }
            else {
                this.refs.notificator.error("Błąd usuwania oceny.", "Wystąpił bład po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    saveData(data, isEdition) {
        if (isEdition) {
            GradesService.editGrade(this.state.gradeForEdition.grade_id, data).then(function (response) {
                if (response.status == 200) {
                    this.refs.notificator.success("Pomyślnie edytowano ocenę", "", 3000);
                    this.getGrades();
                }
                else {
                    this.refs.notificator.error("Błąd edycji oceny.", "Wystąpił bład po stronie bazy danych", 3000);
                }
            }.bind(this))
        }
        else {
            GradesService.addNewGrade(data).then(function (response) {
                if (response.status == 200) {
                    this.refs.notificator.success("Pomyślnie dodano ocenę", "", 3000);
                    this.getGrades();
                }
                else {
                    this.refs.notificator.error("Błąd dodawania nowej oceny.", "Wystąpił bład po stronie bazy danych", 3000);
                }
            }.bind(this))
        }
        this.cancelSavingData();
    }

    cancelSavingData() {
        this.setState({
            gradeForEdition: false,
            showGradeForm: false
        })
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'oceny', text: 'oceny'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id={'ALL_GRADES'}>
                    <div>
                        <GeneralTop handleClickAdd={this.handleClickAddNewGrade}
                                    handleClickEnableSearch={this.handleClickEnableSearch}
                                    addBtnText="Dodaj nową ocenę"
                        />
                    </div>
                    <div>
                        <If isTrue={this.state.showGradeForm}>
                            <GradesForm
                                students={this.state.students}
                                handleCancelClick={this.cancelSavingData}
                                handleAddClick={this.saveData}
                                editedGrade={this.state.gradeForEdition}
                            />
                        </If>
                    </div>
                    <GradesTable
                        grades={this.state.grades}
                        enableFilters={this.state.filtersState}
                        handleEditClick={this.handleClickEditGrade}
                        handleDeleteClick={this.handleClickDeleteGrade}
                    />
                </div>
            </div>
        )
    }
}
