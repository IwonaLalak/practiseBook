import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class CalendarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'kalendarz',text:'kalendarz'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona kalendarza
                </div>
            </div>
        )
    }
}
