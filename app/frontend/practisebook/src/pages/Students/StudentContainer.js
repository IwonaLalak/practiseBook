import React, {Component} from 'react';

import Header from '../../components/header/Header';
import PractisesService from "../Practises/PractisesService";
import {Tabs, Tab} from "react-bootstrap";
import InformationTab from "./tabs/InformationTab";
import CalendarTab from "./tabs/CalendarTab";
import GradeTab from "./tabs/GradeTab";
import ReportTab from "./tabs/ReportTab";

export default class StudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            lecturer:{},
            leader:{},
            practise:{},
        };
        this.renderStudentName = this.renderStudentName.bind(this);
    }

    componentDidMount(){
        this.getStudentPractise();
    }

    isInt(a){
        return a === ""+~~a
    }

    getStudentPractise(){

        let student_id = this.props.match.params.id;

        // todo: brak zabezpieczeń czy dany id istnieje w bazie jako student
        if(this.isInt(student_id)){
            PractisesService.getPractiseByStudent(student_id).then(function (response) {
                this.setState({
                    student: response.data.students[0],
                    lecturer: response.data.lecturers[0],
                    leader: response.data.leaders[0],
                    practise: response.data.practises[0],
                })
            }.bind(this))
        }
    }

    renderStudentName(){
        if(this.state.student){
            return this.state.student.firstname+" "+this.state.student.lastname
        }
        else return 'Student '+this.props.match.params.id;
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url: 'studenci', text: 'studenci'}, {url: '', text: this.renderStudentName()}]}/>
                </div>
                <div id="CURRENT_STUDENT">
                    <Tabs defaultActiveKey={4} id="student-all-data-tab">
                        <Tab eventKey={1} title="Informacje">
                            <InformationTab student={this.state.student} lecturer={this.state.lecturer} leader={this.state.leader} practise={this.state.practise}/>
                        </Tab>
                        <Tab eventKey={2} title="Kalendarz studenta">
                            <CalendarTab student_id={this.props.match.params.id}/>
                        </Tab>
                        <Tab eventKey={3} title="Ocena">
                            <GradeTab practise_id={this.state.practise.practise_id}/>
                        </Tab>
                        <Tab eventKey={4} title="Raport">
                            <ReportTab practise_id={this.state.practise.practise_id}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}
