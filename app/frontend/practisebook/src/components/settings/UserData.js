import React, {Component} from 'react';
import UsersService from "../../pages/Users/UsersService";
import CompanyService from "../../pages/Companies/CompanyService";
import If from '../../utilities/If';

export default class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            companies: []
        };
        this.getUserData = this.getUserData.bind(this);
        this.getCompaniesData = this.getCompaniesData.bind(this);
        this.renderUserGroup = this.renderUserGroup.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    componentDidMount() {
        this.getUserData();
        this.getCompaniesData();
    }

    getUserData() {
        //TODO: userid do zmiany
        let id = 38;

        UsersService.getUser(id).then(function (response) {
            if(response.status == 200 ){
                if(response.data[0]){
                    this.setState({user: response.data[1]});
                }
                else{
                    console.log('user doesnt exist')
                }
            }
        }.bind(this))
    }

    getCompaniesData(){
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    renderUserGroup(group_id) {
        let group = "";
        let labelcolor = "";
        if (group_id == 1) {
            group = "admin";
            labelcolor = 'red'
        }
        else if (group_id == 2) {
            group = "lecturer";
            labelcolor = 'blue'
        }
        else if (group_id == 3) {
            group = "leader";
            labelcolor = 'green'
        }
        else {
            group = "student";
            labelcolor = 'grey'
        }

        return <span className="label label-default" style={{background: labelcolor}}>{group}</span>
    }

    renderCompany(company_id){
        if(company_id){
            let company = this.state.companies.find(company => company.company_id == company_id);
            if(company){
                return company.name
            }
        }
    }

    render() {
        if(this.state.user)
        return (
            <div id="userdata">
                <h4>
                    Dane podstawowe
                </h4>
                <p>
                    <label>
                        Nazwa użytkownika:
                    </label>
                    <span>
                        {this.state.user.login}
                    </span>
                </p>
                <p>
                    <label>
                        Grupa:
                    </label>
                    <span>
                        {this.renderUserGroup(this.state.user.group_id)}
                    </span>
                </p>
                <h4>
                    Dane osobowe
                </h4>
                <p>
                    <label>
                        Imię:
                    </label>
                    <span>
                        {this.state.user.firstname}
                    </span>
                </p>
                <p>
                    <label>
                        Nazwisko:
                    </label>
                    <span>
                        {this.state.user.lastname}
                    </span>
                </p>
                <p>
                    <label>
                        Email:
                    </label>
                    <span>
                        {this.state.user.email}
                    </span>
                </p>
                <p>
                    <label>
                        Telefon:
                    </label>
                    <span>
                        {this.state.user.phone}
                    </span>
                </p>
                <If isTrue={Boolean(this.state.user.study)}>
                    <p>
                        <label>
                            Kieruek:
                        </label>
                        <span>
                        {this.state.user.study}
                    </span>
                    </p>
                </If>
                <If isTrue={Boolean(this.state.user.semester)}>
                    <p>
                        <label>
                            Semestr:
                        </label>
                        <span>
                        {this.state.user.semester}
                    </span>
                    </p>
                </If>
                <If isTrue={Boolean(this.state.user.company_id)}>
                    <p>
                        <label>
                            Firma:
                        </label>
                        <span>
                        {this.renderCompany(this.state.user.company_id)}
                    </span>
                    </p>
                </If>
            </div>
        )
        else{
            return(<div style={{fontStyle: 'italic'}}>Nie można odczytać danych</div>)
        }
    }
}
