import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete} from '../../utilities/Buttons';
import ReactTooltip from 'react-tooltip'

export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.renderStudent = this.renderStudent.bind(this);
        this.renderLecturer = this.renderLecturer.bind(this);
        this.renderLeader = this.renderLeader.bind(this);
        this.renderCompany = this.renderCompany.bind(this);
    }

    onEditClick(id) {
        this.props.handleEditClick(id);
    }

    onDeleteClick(id) {
        this.props.handleDeleteClick(id);
    }

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <TableBtnEdit onClick={() => this.onEditClick(cell)}/>
                <TableBtnDelete onClick={() => this.onDeleteClick(cell)}/>
            </ButtonToolbar>
        )
    }

    renderPractiseName(cell, row) {
        return ("Praktyka " + cell);
    }

    renderStudent(cell, row) {
        let student = this.props.students.find(student => student.user_id == cell);
        if (student) {
            return (
                <div>
                    <p data-tip='' data-for={'student_data' + cell} data-place="bottom">{student.firstname} {student.lastname}</p>
                    <ReactTooltip id={'student_data' + cell}>
                        <p>{student.phone}</p>
                        <p>{student.email}</p>
                        <p>{student.study}, {student.semester}</p>
                    </ReactTooltip>
                </div>
            )
        }
    }

    renderLecturer(cell, row) {
        let lecturer = this.props.lecturers.find(lecturer => lecturer.user_id == cell);
        if (lecturer) {
            return (
                <div>
                    <p data-tip='' data-for={'lecturer_data' + cell} data-place="bottom">{lecturer.firstname} {lecturer.lastname}</p>
                    <ReactTooltip id={'lecturer_data' + cell}>
                        <p>{lecturer.phone}</p>
                        <p>{lecturer.email}</p>
                    </ReactTooltip>
                </div>
            )
        }
    }

    renderLeader(cell, row) {
        let leader = this.props.leaders.find(leader => leader.user_id == cell);
        if (leader) {
            return (
                <div>
                    <p data-tip='' data-for={'leader_data' + cell} data-place="bottom">{leader.firstname} {leader.lastname}</p>
                    <ReactTooltip id={'leader_data' + cell}>
                        <p>{leader.phone}</p>
                        <p>{leader.email}</p>
                    </ReactTooltip>
                </div>
            )
        }
    }

    renderCompany(cell, row) {

        return (
            <div>
                <p data-tip='' data-for={'company_data' + row.company_id} data-place="bottom">{cell}</p>
                <ReactTooltip id={'company_data' + row.company_id}>
                    <p>{row.street} {row.place}, {row.city}</p>
                    <p>{row.phone}</p>
                    <p>{row.email}</p>
                </ReactTooltip>
            </div>
        )

    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25};

        return (
            <div>
                <BootstrapTable data={this.props.practises}
                                hover
                                pagination
                                options={options}
                                bordered={false}
                >
                    <TableHeaderColumn dataField='practise_id' isKey
                                       thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                                       dataFormat={this.renderPractiseName}
                    >

                        Numer praktyki
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='date_start' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Data rozpoczęcia</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_end' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Data końca</TableHeaderColumn>
                    <TableHeaderColumn dataField='student_id' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       dataFormat={this.renderStudent}>Student</TableHeaderColumn>
                    <TableHeaderColumn dataField='leader_id' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       dataFormat={this.renderLeader}>Leader</TableHeaderColumn>
                    <TableHeaderColumn dataField='lecturer_id' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       dataFormat={this.renderLecturer}>Wykładowca</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}
                                       dataFormat={this.renderCompany}>Firma</TableHeaderColumn>
                    <TableHeaderColumn dataField='practise_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       dataFormat={this.renderActionButtons}
                                       expandable={false}> Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
