import React, {Component} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import PractisesService from "../../pages/Practises/PractisesService";
import PractisesTable from "./PractisesTable";
import GeneralTop from "../generaltop/GeneralTop";
import ReactNotify from 'react-notify';
import PractisesEditForm from "./PractisesEditForm";
import UsersService from "../../pages/Users/UsersService";
import CompanyService from "../../pages/Companies/CompanyService";
import If from "../../utilities/If";

export default class PractisesDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersState: false,
            practises: [],
            leaders: [],
            lecturers: [],
            students: [],
            editedPractise: null,
            all_lecturers: [],
            all_leaders: [],
            all_companies: [],
        }
        this.getPractisesData = this.getPractisesData.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewPractise = this.handleClickAddNewPractise.bind(this);
        this.handleClickEditPractise = this.handleClickEditPractise.bind(this);
        this.handleClickDeletePractise = this.handleClickDeletePractise.bind(this);

        this.saveEditionPractise = this.saveEditionPractise.bind(this);
        this.cancelEditionPractise = this.cancelEditionPractise.bind(this);

        this.getUsersDataForEdition = this.getUsersDataForEdition.bind(this);
        this.getCompaniesDataForEdition = this.getCompaniesDataForEdition.bind(this);
    }

    componentDidMount() {
        this.getPractisesData();
    }

    getPractisesData() {
        if (this.props.userid) {
            let userid = this.props.userid;

            PractisesService.getPractiseByLecturer(userid).then(function (response) {
                if (response.status == 200) {
                    if (response.data[0] != false) {
                        this.setState({
                            practises: response.data.practises,
                            leaders: response.data.leaders,
                            lecturers: response.data.lecturers,
                            students: response.data.students
                        })
                    }
                }
            }.bind(this))
        }
        else {
            PractisesService.getAllPractises().then(function (response) {
                if (response.status == 200) {
                    if (response.data[0] != false) {
                        this.setState({
                            practises: response.data.practises,
                            leaders: response.data.leaders,
                            lecturers: response.data.lecturers,
                            students: response.data.students
                        })
                    }
                }
            }.bind(this))
        }
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewPractise() {
        this.props.onClickAdd();
    }

    handleClickEditPractise(id) {
        this.setState({editedPractise: this.state.practises.find(practise => practise.practise_id === id)});
        if(this.state.all_companies.length <1 || this.state.all_leaders.length < 1){
            this.getCompaniesDataForEdition();
            this.getUsersDataForEdition();
        }
    }

    handleClickDeletePractise(id) {
        PractisesService.deletePractise(id).then(function (response) {
            this.refs.notificator.success("Pomyślnie usunięto praktykę", "", 3000);
            this.getPractisesData();
        }.bind(this))
    }

    saveEditionPractise(data) {
        PractisesService.editPractise(this.state.editedPractise.practise_id, data).then(function (response) {
            this.refs.notificator.success("Pomyślnie edytowano praktykę", "", 3000);
            this.getPractisesData();
        }.bind(this))

        this.cancelEditionPractise();
    }

    cancelEditionPractise() {
        this.setState({editedPractise: null})
    }

    getUsersDataForEdition() {
        UsersService.getAllUsers().then(function (response) {

            this.setState({
                all_lecturers: response.data.filter(function (item) {
                    if (item.group_id == 2) {
                        return item
                    }
                }),

                all_leaders: response.data.filter(function (item) {
                    if (item.group_id == 3) {
                        return item
                    }
                })
            })

        }.bind(this))
    }

    getCompaniesDataForEdition() {
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({all_companies: response.data})
        }.bind(this))
    }

    render() {
        return (
            <Row>
                <ReactNotify ref='notificator'/>
                <Col xs={12}>
                    <GeneralTop
                        handleClickAdd={this.handleClickAddNewPractise}
                        handleClickEnableSearch={this.handleClickEnableSearch}
                        addBtnText="Dodaj nową praktykę"
                    />
                </Col>
                <Col xs={12}>
                    <If isTrue={Boolean(this.state.editedPractise)}>
                    <PractisesEditForm handleSaveButtonClick={this.saveEditionPractise} handleCancelClick={this.cancelEditionPractise}
                                       leaders={this.state.all_leaders} companies={this.state.all_companies} editedPractise={this.state.editedPractise}/>
                    </If>
                </Col>
                <Col xs={12}>
                    <PractisesTable practises={this.state.practises}
                                    leaders={this.state.leaders}
                                    lecturers={this.state.lecturers}
                                    students={this.state.students}
                                    enableFilters={this.state.filtersState}
                                    handleEditClick={this.handleClickEditPractise}
                                    handleDeleteClick={this.handleClickDeletePractise}
                    />
                </Col>
            </Row>
        )
    }
}
