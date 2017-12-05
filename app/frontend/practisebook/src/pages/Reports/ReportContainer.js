import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'raporty',text:'raporty'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    <p>raport id: {this.props.match.params.id}</p>
                </div>
            </div>
        )
    }
}
