import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class AccountContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'konto',text:'konto użytkownika'},{url:'',text:'Zmiana hasła'}]}/>
                </div>
                <div>
                    strona konta
                </div>
            </div>
        )
    }
}
