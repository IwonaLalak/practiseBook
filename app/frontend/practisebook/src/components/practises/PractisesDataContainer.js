import React, {Component} from 'react';
import {Tabs, Tab, Row, Col} from 'react-bootstrap';
import PractisesService from "../../pages/Practises/PractisesService";
import PractisesTable from "./PractisesTable";
import GeneralTop from "../generaltop/GeneralTop";

export default class PractisesDataContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersState: false,
            practises: [],
            leaders: [],
            lecturers: [],
            students: []
        }
        this.getPractisesData = this.getPractisesData.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewPractise = this.handleClickAddNewPractise.bind(this);
        this.handleClickEditPractise = this.handleClickEditPractise.bind(this);
        this.handleClickDeletePractise = this.handleClickDeletePractise.bind(this);
    }

    componentDidMount(){
        this.getPractisesData();
    }

    getPractisesData(){
        if(this.props.userid){
            let userid = this.props.userid;

            PractisesService.getPractiseByLecturer(userid).then(function (response) {
                if(response.status == 200){
                    if(response.data[0] != false){
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
        else{
            PractisesService.getAllPractises().then(function (response) {
                if(response.status == 200){
                    if(response.data[0] != false){
                        this.setState({
                            practises: response.data.practises,
                            leaders: response.data.leaders,
                            lecturers: response.data.lecturers,
                            students: response.data.students
                        })
                    }
                }
                console.log(response)
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
        //this.setState({userForEdition: this.state.users.find(user => user.user_id === id)});
    }

    handleClickDeletePractise(id) {
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <GeneralTop
                        handleClickAdd={this.handleClickAddNewPractise}
                        handleClickEnableSearch={this.handleClickEnableSearch}
                        addBtnText = "Dodaj nową praktykę"
                    />
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
