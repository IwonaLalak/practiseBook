import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class SettingsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'ustawienia',text:'ustawienia'},{url:'',text:'ustawienia główne'}]}/>
                </div>
                <div>
                    strona ustawien
                </div>
            </div>
        )
    }
}
