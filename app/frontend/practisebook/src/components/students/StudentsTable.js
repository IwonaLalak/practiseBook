import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnSee} from '../../utilities/Buttons';
import ReactTooltip from 'react-tooltip'
import {Link} from "react-router-dom";


export default class StudentsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.onSeeClick = this.onSeeClick.bind(this);
        this.renderLecturerOrLeader = this.renderLecturerOrLeader.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    onSeeClick(id) {
        // this.props.handleSeeClick(id);
    }

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <Link to={'student/' + row.user_id}>
                    <TableBtnSee
                        title={'Zobacz stronę studenta'}
                        onClick={() => {
                        }}
                    />
                </Link>
            </ButtonToolbar>
        )
    }

    renderStudent(cell, row) {
        return (
            <div>
                <Link to={'student/' + row.user_id}>
                    <p data-tip='' data-for={'student_data' + cell} data-place="bottom" className='tooltip_here'>{row.firstname} {row.lastname}</p>
                </Link>
                <ReactTooltip id={'student_data' + cell}>
                    <p><i className='fa fa-phone' style={{marginRight: '5px'}}></i> {row.phone}</p>
                    <p><i className='fa fa-envelope-o' style={{marginRight: '5px'}}></i> {row.email}</p>
                    <p><i className='fa fa-graduation-cap' style={{marginRight: '5px'}}></i> {row.study}, {row.semester}</p>
                </ReactTooltip>
            </div>
        )
    }

    renderLecturerOrLeader(cell, row) {
        let user = this.props.users.find(user => user.user_id == cell);
        if (user) {
            return (
                <div>
                    <p data-tip='' data-for={'user_data' + cell} data-place="bottom" className='tooltip_here'>{user.firstname} {user.lastname}</p>
                    <ReactTooltip id={'user_data' + cell}>
                        <p><i className='fa fa-phone' style={{marginRight: '5px'}}></i> {user.phone}</p>
                        <p><i className='fa fa-envelope-o' style={{marginRight: '5px'}}></i> {user.email}</p>
                    </ReactTooltip>
                </div>
            )
        }
        else return cell
    }

    renderCompany(cell, row) {

        let company = this.props.companies.find(company => company.company_id == cell);
        if (company) {
            return (
                <div>
                    <p data-tip='' data-for={'company_data' + cell} data-place="bottom" className='tooltip_here'>{company.name}</p>
                    <ReactTooltip id={'company_data' + cell}>
                        <p><i className='fa fa-edit' style={{marginRight: '5px'}}></i> {company.brand}</p>
                        <p><i className='fa fa-phone' style={{marginRight: '5px'}}></i> {company.phone}</p>
                        <p><i className='fa fa-envelope-o' style={{marginRight: '5px'}}></i> {company.email}</p>
                        <p><i className='fa fa-map-marker' style={{marginRight: '5px'}}></i> {company.city}, {company.street} {company.place}</p>
                    </ReactTooltip>
                </div>
            )
        }
        else return cell
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25};
        return (
            <div>
                <BootstrapTable data={this.props.students}
                                hover
                                pagination
                                options={options}
                                bordered={false}
                >
                    <TableHeaderColumn isKey dataField='user_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastname' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false} dataFormat={this.renderStudent}>Student</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_start' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Data początku praktyki</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_end' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Data końca praktyki</TableHeaderColumn>
                    <TableHeaderColumn dataField='total_time' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Długość (h)</TableHeaderColumn>
                    <TableHeaderColumn dataField='company_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false} dataFormat={this.renderCompany}>Zakład pracy</TableHeaderColumn>
                    <TableHeaderColumn dataField='leader_id' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       hidden={(localStorage.getItem('current_usergroup') == 3)}
                                       dataFormat={this.renderLecturerOrLeader}
                    >Leader</TableHeaderColumn>
                    <TableHeaderColumn dataField='lecturer_id' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       hidden={(localStorage.getItem('current_usergroup') == 2)}
                                       dataFormat={this.renderLecturerOrLeader}
                    >Wykładowca</TableHeaderColumn>
                    <TableHeaderColumn dataField='user_id' thStyle={tabgrid.tg1} tdStyle={tabgrid.tg1} dataFormat={this.renderActionButtons}
                    > Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
