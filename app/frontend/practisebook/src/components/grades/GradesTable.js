import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete, TableBtnSee} from '../../utilities/Buttons';
import ReactTooltip from 'react-tooltip'


export default class GradesTable extends Component {
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

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <TableBtnEdit onClick={() => this.onEditClick(cell)}/>
                <TableBtnDelete onClick={() => this.onDeleteClick(cell)}/>
            </ButtonToolbar>
        )
    }

    renderStudent(cell,row){
        return (
            <div>
                <p data-tip='' data-for={'student_data' + cell} data-place="bottom">{row.firstname} {row.lastname}</p>
                <ReactTooltip id={'student_data' + cell}>
                    <p>{row.phone}</p>
                    <p>{row.email}</p>
                    <p>{row.study}, {row.semester}</p>
                </ReactTooltip>
            </div>
        )    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25};
        return (
            <div>
                <BootstrapTable data={this.props.grades}
                                hover
                                pagination
                                options={options}
                                bordered={false}
                >
                    <TableHeaderColumn isKey dataField='grade_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='grade_date' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Data wystawienia oceny</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_start' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Data początku praktyki</TableHeaderColumn>
                    <TableHeaderColumn dataField='date_end' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Data końca praktyki</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastname' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false} dataFormat={this.renderStudent}>Student</TableHeaderColumn>
                    <TableHeaderColumn dataField='grade' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Ocena</TableHeaderColumn>
                    <TableHeaderColumn dataField='grade_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}
                                       > Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
