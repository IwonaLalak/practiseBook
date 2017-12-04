import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount(){
        console.log(
            localStorage.getItem("current_userid")
        )

        console.log(
            localStorage.getItem("current_userdata")
        )
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'uwagi',text:'uwagi'},{url:'',text:'przegląd'}]}/>
                </div>
                <div>
                    strona uwag
                    <h3>
                        {
                            localStorage.getItem("current_userid")
                        }
                    </h3>
                </div>
            </div>
        )
    }
}
