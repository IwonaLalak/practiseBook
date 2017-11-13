import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class PractisesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'praktyki',text:'praktyki'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona praktyk
                </div>
            </div>
        )
    }
}
