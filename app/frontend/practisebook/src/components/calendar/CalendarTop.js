import React, {Component} from 'react';
import Select from "react-select";
import {ButtonAdd} from "../../utilities/Buttons";


export default class CalendarTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
        this.onChangeViewOption = this.onChangeViewOption.bind(this);
    }

    componentDidMount() {
    }

    onChangeViewOption(e) {
        this.setState({selectedOption: e})
        if(e != null){
            this.props.handleChangeViewOption(e);
        }
    }

    render() {

        const viewOptions = [
            {id: 1, label: 'Co 10 minut', step: 5, timeslot: 2},
            {id: 2, label: 'Co 30 minut', step: 15, timeslot: 2},
            {id: 3, label: 'Co 1 godzinę', step: 30, timeslot: 2}
        ];

        return (
            <div style={{marginBottom: '7px'}}>
                <div className={"pull-right"} id={"selectboxOfViewOption"}>
                    <Select
                        options={viewOptions}
                        value={this.state.selectedOption}
                        name="StudentSelect"
                        onChange={this.onChangeViewOption}
                        clearable={false}
                        labelKey="label"
                        valueKey="id"
                        placeholder="Wybierz szczegółowość widoku"
                        style={{width: '267px', display: 'inline-block'}}
                    />
                </div>
            </div>
        )
    }
}
