import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class CompanyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["firmy","firma"]}/>
                </div>
                <div>
                    firma
                </div>
            </div>
        )
    }
}
