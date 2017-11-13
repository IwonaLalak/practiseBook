import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class CompanyAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'firmy',text:'firmy'},{url:'',text:'dodaj'}]}/>
                </div>
                <div>
                    dodanie firmy
                </div>
            </div>
        )
    }
}
