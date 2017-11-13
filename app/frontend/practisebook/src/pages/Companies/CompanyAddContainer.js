import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactNotify from 'react-notify';
import Header from '../../components/header/Header';
import CompaniesForm from "../../components/companies/CompaniesForm";
import CompanyService from "./CompanyService";

export default class CompanyAddContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.cancelEdition = this.cancelEdition.bind(this);
        this.saveCompany = this.saveCompany.bind(this);
    }

    cancelEdition(){
        this.props.history.push("/firmy");
    }

    saveCompany(data){
        CompanyService.addNewCompany(data).then(function (response) {
            if(response.status == 200){
                if(response.data[0]){
                    this.refs.notificator.success("Pomyślnie dodano firmę", "", 3000);
                }
                else{
                    this.refs.notificator.success("Błąd podczas dodawania firmy", "Firma o podanej nazwie już istnieje", 3000);
                }
            }
        }.bind(this));
    }

    render(){
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url:'firmy',text:'firmy'},{url:'',text:'dodaj'}]}/>
                </div>
                <div id="ADD_COMPANY">
                    <div>
                        <CompaniesForm handleAddClick={this.saveCompany} handleCancelClick={this.cancelEdition} horizontal={true} editedCompany={false}/>
                    </div>
                </div>
            </div>
        )
    }
}
