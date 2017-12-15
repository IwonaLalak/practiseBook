import React, {Component} from 'react';

import Header from '../../components/header/Header';
import CalendarItem from "../../components/calendar/CalendarItem";
import PractisesService from "../Practises/PractisesService";

export default class CalendarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practise_id: 0,
        };
        this.getPractiseId = this.getPractiseId.bind(this);
    }

    getPractiseId(){
        PractisesService.getPractiseByStudent(localStorage.getItem("current_userid")).then(function (response) {
            this.setState({practise_id: response.data.practises[0].practise_id})
        }.bind(this))
    }

    componentDidMount(){
        this.getPractiseId();
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'kalendarz',text:'kalendarz'},{url:'',text:'przegląd'}]}/>
                </div>
                <div id="CALENDAR_PAGE">
                    <CalendarItem student_id={localStorage.getItem("current_userid")} practise_id={this.state.practise_id} editableMode={true}/>
                </div>
            </div>
        )
    }
}
