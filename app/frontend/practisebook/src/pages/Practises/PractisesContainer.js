import React, {Component} from 'react';
import If from '../../utilities/If';
import Header from '../../components/header/Header';
import PractiseDataForStudents from "../../components/practises/PractiseDataForStudents";

export default class PractisesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: 'student'
        };
        this.renderAdminPart = this.renderAdminPart.bind(this);
        this.renderStudentPart = this.renderStudentPart.bind(this);
        this.renderLecturerPart = this.renderLecturerPart.bind(this);
    }

    renderStudentPart(){
        return(
            <div id="PRACTISE_DATA">
                <PractiseDataForStudents/>
            </div>
        )
    }

    renderAdminPart(){
        return <div>aaa</div>
    }

    renderLecturerPart(){
        return <div>lll</div>
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
