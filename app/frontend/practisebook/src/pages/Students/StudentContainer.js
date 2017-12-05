import React, {Component} from 'react';

import Header from '../../components/header/Header';

export default class StudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
       // console.log(this.props)
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={["studenci","student"]}/>
                </div>
                <div>
                    <p>student id: {this.props.match.params.id}</p>
                </div>
            </div>
        )
    }
}
