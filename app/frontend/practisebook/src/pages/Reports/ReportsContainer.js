import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class ReportsContainer extends Component {
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
                    strona raportow
                </div>
            </div>
        )
    }
}
