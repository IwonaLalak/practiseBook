import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'uwagi',text:'uwagi'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona uwag
                </div>
            </div>
        )
    }
}
