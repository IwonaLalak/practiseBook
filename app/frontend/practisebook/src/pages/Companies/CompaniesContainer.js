import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class CompaniesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'firmy',text:'firmy'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona firm
                </div>
            </div>
        )
    }
}
