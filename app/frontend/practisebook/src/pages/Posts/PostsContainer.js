import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["faktury","przegląd"]}/>
                </div>
                <div>
                    strona postow
                </div>
            </div>
        )
    }
}
