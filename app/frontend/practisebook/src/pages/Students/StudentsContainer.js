import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class StudentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'studenci',text:'studenci'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona studentow
                </div>
            </div>
        )
    }
}
