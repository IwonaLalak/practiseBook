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
                    <Header url={[{url:'uzytkownicy',text:'użytkownicy'},{url:'',text:'użytkownik'}]}/>
                </div>
                <div>
                    strona usera
                </div>
            </div>
        )
    }
}
