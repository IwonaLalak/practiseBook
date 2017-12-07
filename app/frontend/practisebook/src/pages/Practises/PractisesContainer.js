import React, {Component} from 'react';
import If from '../../utilities/If';
import {withRouter} from 'react-router-dom';
import Header from '../../components/header/Header';
import PractiseDataForStudents from "../../components/practises/PractiseDataForStudents";
import PractisesDataContainer from "../../components/practises/PractisesDataContainer";

export default class PractisesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: (localStorage.getItem("current_usergroup") == 4)? "student" : (localStorage.getItem("current_usergroup") == 2)? "lecturer" : "admin"
        };
        this.renderAdminPart = this.renderAdminPart.bind(this);
        this.renderStudentPart = this.renderStudentPart.bind(this);
        this.renderLecturerPart = this.renderLecturerPart.bind(this);
        this.handleAddNewPractise = this.handleAddNewPractise.bind(this);
    }

    handleAddNewPractise(){
       this.props.history.push("/praktyki/dodaj");
    }

    renderStudentPart(){
        return(
            <div id="PRACTISE_DATA">
                <PractiseDataForStudents/>
            </div>
        )
    }

    renderAdminPart(){
        return(
            <div id="PRACTISES_DATA">
                <PractisesDataContainer userid={false} onClickAdd={this.handleAddNewPractise}/>
            </div>
        )
    }

    renderLecturerPart(){
        return(
            <div id="PRACTISES_DATA">
                <PractisesDataContainer userid={localStorage.getItem("current_userid")} onClickAdd={this.handleAddNewPractise}/>
            </div>
        )
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'praktyki',text:'praktyki'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    <If isTrue={this.state.logged === 'student'}>
                        {this.renderStudentPart()}
                    </If>
                    <If isTrue={this.state.logged === 'lecturer'}>
                        {this.renderLecturerPart()}
                    </If>
                    <If isTrue={this.state.logged === 'admin'}>
                        {this.renderAdminPart()}
                    </If>
                </div>
            </div>
        )
    }
}
