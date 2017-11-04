import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["użytkownicy","użytownik"]}/>
                </div>
                <div>
                    strona usera
                </div>
            </div>
        )
    }
}
