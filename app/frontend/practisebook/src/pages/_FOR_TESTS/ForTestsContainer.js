import React, {Component} from 'react';
import UserService from '../Users/UsersService';
import If from "../../utilities/If";
import CompanyService from "../Companies/CompanyService";

export default class ForTestsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            companies: [],
            dataVisibility: true
        };
        this.getData = this.getData.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getCompanies();
    }

    getCompanies() {
        CompanyService.getAllCompanies().then(function (response) {
            this.setState({companies: response.data})
        }.bind(this))
    }

    getData() {
        UserService.getAllUsers().then(function (response) {
            this.setState({users: response.data})
            console.log(response.data)
        }.bind(this))
    }

    toggleVisibility() {
        this.setState({dataVisibility: !this.state.dataVisibility})
    }

    renderCompany(id) {
        let company = this.state.companies.find(c => c.company_id == id);

        if (company) {
            return company.name;
        }
        else {
            return ''
        }
    }

    render() {
        return (
            <div>
                <h3 style={{background: '#D11E48', cursor: 'pointer', padding: '15px', margin: 0, fontSize: '14px', color: '#fff', fontWeight: 'bold', textTransform:'uppercase'}} onClick={this.toggleVisibility}>
                    users data
                </h3>
                <div style={{padding: '15px'}}>
                    <If isTrue={this.state.dataVisibility}>
                        <table className="table table-responsive table-bordered">
                            <thead>
                            <tr>
                                <th>
                                    id
                                </th>
                                <th>
                                    login
                                </th>
                                <th>
                                    password
                                </th>
                                <th>
                                    group
                                </th>
                                <th>
                                    study / company
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(user =>
                                    <tr>
                                        <td>
                                            {user.user_id}
                                        </td>
                                        <td>
                                            {user.login}
                                        </td>
                                        <td>
                                            {window.atob(user.password)}
                                        </td>
                                        <td style={{fontWeight: 'bold'}}>
                                            {
                                                (user.group_id == 1) ?
                                                    <span style={{color: 'red'}}>admin</span>
                                                    :
                                                    (user.group_id == 2) ?
                                                        <span style={{color: 'blue'}}>lecturer</span>
                                                        :
                                                        (user.group_id == 3) ?
                                                            <span style={{color: 'green'}}>leader</span>
                                                            :
                                                            <span style={{color: 'grey'}}>student</span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                (user.study != null) ?
                                                    <span className="label label-default">{user.study}</span>
                                                    :
                                                    (user.company_id != null) ?
                                                        <span className="label label-default"
                                                              style={{background: 'green'}}>{this.renderCompany(user.company_id)}</span>
                                                        :
                                                        ''
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </If>
                </div>
            </div>
        )
    }
}
