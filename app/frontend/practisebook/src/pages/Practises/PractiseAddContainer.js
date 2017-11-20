import React, {Component} from 'react';
import Header from '../../components/header/Header';
import PractisesForm from "../../components/practises/PractisesForm";

export default class PractiseAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'praktyki',text:'praktyki'},{url:'',text:'dodaj'}]}/>
                </div>
                <div id="ADD_PRACTISE">
                    <PractisesForm />
                </div>
            </div>
        )
    }
}
