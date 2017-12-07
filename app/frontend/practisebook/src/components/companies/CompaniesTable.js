import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete} from '../../utilities/Buttons';

export default class CompaniesTable extends Component {
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

    expandComponent(row) {
            return (
                <div>
                    <span className="label label-default">Opis</span>
                    <span>{row.description}</span>
                </div>
            )
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
        return (row.description)
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25, expandBy: 'column'};

        return (
            <div>
                <BootstrapTable data={this.props.companies}
                                hover
                                pagination
                                options={options}
                                bordered={false}expandableRow={this.isExpandableRow}
                                expandComponent={this.expandComponent}
                                expandColumnOptions={{
                                    expandColumnVisible: true,
                                    expandColumnComponent: this.expandColumnComponent,
                                    columnWidth: 30
                                }}

                >
                    <TableHeaderColumn isKey dataField='company_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Nazwa</TableHeaderColumn>
                    <TableHeaderColumn dataField='brand' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={
                                           (this.props.enableFilters) ?
                                               {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'}: false
                                       }>Branża</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' thStyle={(localStorage.getItem("current_usergroup") == '2')? tabgrid.tg3: tabgrid.tg2} tdStyle={(localStorage.getItem("current_usergroup") == '2')? tabgrid.tg3: tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' thStyle={(localStorage.getItem("current_usergroup") == '2')? tabgrid.tg3: tabgrid.tg2} tdStyle={(localStorage.getItem("current_usergroup") == '2')? tabgrid.tg3: tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Telefon</TableHeaderColumn>
                    <TableHeaderColumn dataField='city' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Miasto</TableHeaderColumn>
                    <TableHeaderColumn dataField='street' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Ulica</TableHeaderColumn>
                    <TableHeaderColumn dataField='place' thStyle={tabgrid.tg1} tdStyle={tabgrid.tg1}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Numer</TableHeaderColumn>
                    <TableHeaderColumn dataField='company_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}
                                       expandable={false} hidden={(localStorage.getItem("current_usergroup") == '2')}> Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
