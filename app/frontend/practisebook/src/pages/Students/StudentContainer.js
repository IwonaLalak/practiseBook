import React, {Component} from 'react';

import Header from '../../components/header/Header';
import PractisesService from "../Practises/PractisesService";
import {Tabs, Tab} from "react-bootstrap";
import InformationTab from "./tabs/InformationTab";
import CalendarTab from "./tabs/CalendarTab";

export default class StudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            lecturer:{},
            leader:{},
            practise:{},

        };
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
                console.log(response.data)
                this.setState({
                    student: response.data.students[0],
                    lecturer: response.data.lecturers[0],
                    leader: response.data.leaders[0],
                    practise: response.data.practises[0],
                })
            }.bind(this))
        }

    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url: 'studenci', text: 'studenci'}, {url: '', text: 'Student '+this.props.match.params.id}]}/>
                </div>
                <div id="CURRENT_STUDENT">
                    <Tabs defaultActiveKey={2} id="student-all-data-tab">
                        <Tab eventKey={1} title="Informacje">
                            <InformationTab student_id={this.props.match.params.id}/>
                        </Tab>
                        <Tab eventKey={2} title="Kalendarz studenta">
                            <CalendarTab student_id={this.props.match.params.id}/>
                        </Tab>
                        <Tab eventKey={3} title="Uwagi leadera">Tab 3 content</Tab>
                        <Tab eventKey={4} title="Ocena">Tab 4 content</Tab>
                        <Tab eventKey={5} title="Raport">Tab 5 content</Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}
