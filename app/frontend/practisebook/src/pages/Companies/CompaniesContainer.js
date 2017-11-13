import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ReactNotify from 'react-notify';
import Header from '../../components/header/Header';
import GeneralTop from "../../components/generaltop/GeneralTop";
import If from "../../utilities/If";
import CompaniesTable from "../../components/companies/CompaniesTable";
import CompanyService from "./CompanyService";
import CompaniesForm from "../../components/companies/CompaniesForm";

export default class CompaniesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtersState: false,
            companies: [],
            companyForEdition: false
        };
        this.getData = this.getData.bind(this);
        this.handleClickAddNewCompany = this.handleClickAddNewCompany.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickEditCompany = this.handleClickEditCompany.bind(this);
        this.handleClickDeleteCompany = this.handleClickDeleteCompany.bind(this);
        this.saveCompany = this.saveCompany.bind(this);
        this.cancelEdition = this.cancelEdition.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies:response.data})
        }.bind(this))
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewCompany() {
        this.props.history.push("/firmy/dodaj");
    }

    handleClickEditCompany(id){
        this.setState({companyForEdition: this.state.companies.find(company => company.company_id == id)});
    }

    handleClickDeleteCompany(id){
        CompanyService.deleteCompany(id).then(function (response) {
            if(response.status == 200){
                this.refs.notificator.success("Pomyślnie usunięto firmę", "", 3000);
                this.getData();
            }
        }.bind(this))
    }

    saveCompany(data){
        CompanyService.editCompany(this.state.companyForEdition.company_id,data).then(function (response) {
            if(response.status == 200){
                if(response.data[0]){
                    this.refs.notificator.success("Pomyślnie edytowano firmę", "", 3000);
                    this.getData();
                }
                else{
                    this.refs.notificator.error("Wystąpił błąd podczas edycji", "", 3000);
                }
            }
        }.bind(this));
        this.setState({companyForEdition: false});
    }

    cancelEdition(){
        this.setState({companyForEdition: false});
    }

    render(){
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url:'firmy',text:'firmy'},{url:'',text:'przegląd'}]}/>
                </div>
                <div id="ALL_COMPANIES">
                    <div>
                        <GeneralTop
                            handleClickAdd={this.handleClickAddNewCompany}
                            handleClickEnableSearch={this.handleClickEnableSearch}
                            addBtnText = "Dodaj nową firmę"
                        />
                    </div>
                    <If isTrue={this.state.companyForEdition}>
                        <div id="EDIT_COMPANY">
                            <CompaniesForm handleAddClick={this.saveCompany} handleCancelClick={this.cancelEdition} horizontal={false} editedCompany={this.state.companyForEdition}/>
                        </div>
                    </If>
                    <div style={{clear: 'both'}}>
                        <CompaniesTable
                            companies={this.state.companies}
                            enableFilters={this.state.filtersState}
                            handleEditClick={this.handleClickEditCompany}
                            handleDeleteClick={this.handleClickDeleteCompany}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
