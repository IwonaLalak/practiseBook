import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class UserAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["użytkownicy","dodaj"]}/>
                </div>
                <div>
                    strona dodawania usera
                </div>
            </div>
        )
    }
}
