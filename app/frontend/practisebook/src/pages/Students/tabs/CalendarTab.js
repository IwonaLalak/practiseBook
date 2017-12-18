import React, {Component} from 'react';
import CalendarItem from "../../../components/calendar/CalendarItem";

export default class CalendarTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return (
            <div>
                <CalendarItem student_id={this.props.student_id} editableMode={false}/>
            </div>
        )
    }
}
