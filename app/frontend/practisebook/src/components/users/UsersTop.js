import React, {Component} from 'react';
import {ButtonAdd} from '../../utilities/Buttons';

export default class UsersTop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    onClickAdd(){
        this.props.handleClick();
    }

    render(){
        return (
            <div>
                <div className="pull-right">
                    <ButtonAdd onClick={this.onClickAdd}/>
                </div>
            </div>
        )
    }
}
