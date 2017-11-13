import React, {Component} from 'react';
import {ButtonAdd, ButtonAction} from '../../utilities/Buttons';

export default class GeneralTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSearch: false
        };
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickEnableSearch = this.onClickEnableSearch.bind(this);
    }

    onClickEnableSearch(){
        this.setState({enableSearch: !this.state.enableSearch});
        this.props.handleClickEnableSearch();
    }

    onClickAdd(){
        this.props.handleClickAdd();
    }

    render(){
        return (
            <div>
                <div className="pull-right">
                    <ButtonAction onClick={this.onClickEnableSearch}
                                  btnText={(this.state.enableSearch)? 'Ukryj narzędzia wyszukiwania' : 'Pokaż narzedzia wyszukiwania'}
                                  iconType="fa fa-search"
                    />
                    <ButtonAdd onClick={this.onClickAdd} btnText={this.props.addBtnText}/>
                </div>
            </div>
        )
    }
}
