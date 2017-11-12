import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete} from '../../utilities/Buttons';

export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onEditClick(id) {
        this.props.handleEditClick(id);
    }

    onDeleteClick(id) {
        this.props.handleDeleteClick(id);
    }

    renderUserGroup(cell, row) {
        let group = "";
        let labelcolor = "";
        if (cell == 1) {
            group = "admin";
            labelcolor = 'red'
        }
        else if (cell == 2) {
            group = "lecturer";
            labelcolor = 'blue'
        }
        else if (cell == 3) {
            group = "leader";
            labelcolor = 'green'
        }
        else {
            group = "student";
            labelcolor = 'grey'
        }

        return <span className="label label-default" style={{background: labelcolor}}>{group}</span>
    }

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <TableBtnEdit onClick={() => this.onEditClick(cell)}/>
                <TableBtnDelete onClick={() => this.onDeleteClick(cell)}/>
            </ButtonToolbar>
        )
    }

    expandComponent(row) {
        if (row.study) {

            return (
                <div>
                    <span className="label label-default">Student </span>
                    <span>Kierunek: </span>
                    <span>{row.study}</span>
                    <span>Semestr: </span>
                    <span>{row.semester}</span>
                </div>
            )
        }
        else {
            return (
                <div>
                    <span className="label label-default">Pracownik </span>
                    <span>Firma: </span>
                    <span>{row.company_id}</span>
                </div>
            )
        }
    }

    expandColumnComponent({isExpandableRow, isExpanded}) {
        let content = '';

        if (isExpandableRow) {
            content = (isExpanded ?
                    (<i style={{display: "block", textAlign: "center"}} className='fa fa-lg fa-caret-up'></i>)
                    :
                    (<i style={{display: "block", textAlign: "center"}} className='fa fa-lg fa-caret-down'></i>)
            )
        } else {
            content = ' ';
        }
        return (
            <div> {content} </div>
        );
    }

    isExpandableRow(row) {
        return (row.study || row.company_id)
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25, expandBy: 'column'};
        const groups = {
            1: 'admin',
            2: 'lecturer',
            3: 'leader',
            4: 'student'
        };

        return (
            <div>
                <BootstrapTable data={this.props.users}
                                hover
                                pagination
                                options={options}
                                bordered={false}
                                expandableRow={this.isExpandableRow}
                                expandComponent={this.expandComponent}
                                expandColumnOptions={{
                                    expandColumnVisible: true,
                                    expandColumnComponent: this.expandColumnComponent,
                                    columnWidth: 30
                                }}
                >
                    <TableHeaderColumn isKey dataField='user_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='login' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Login</TableHeaderColumn>
                    <TableHeaderColumn dataField='group_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderUserGroup}
                                       ormatExtraData={this.props.priorytety}
                                       filter={
                                           (this.props.enableFilters) ?
                                               {
                                                   type: 'SelectFilter',
                                                   options: groups,
                                                   placeholder: 'Wybierz'
                                               } : false
                                       }>Grupa</TableHeaderColumn>
                    <TableHeaderColumn dataField='firstname' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Imię</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastname' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Nazwisko</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Telefon</TableHeaderColumn>
                    <TableHeaderColumn dataField='user_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}
                                       expandable={false}> Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
