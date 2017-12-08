import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete, TableBtnSee} from '../../utilities/Buttons';

export default class ReportsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onSeeClick = this.onSeeClick.bind(this);
    }

    onEditClick(id) {
        this.props.handleEditClick(id);
    }

    onDeleteClick(id) {
        this.props.handleDeleteClick(id);
    }

    onSeeClick(id){
        this.props.handleSeeClick(id);
    }

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <TableBtnSee onClick={() => this.onSeeClick(cell)}/>
                <TableBtnEdit onClick={() => this.onEditClick(cell)}/>
                <TableBtnDelete onClick={() => this.onDeleteClick(cell)}/>
            </ButtonToolbar>
        )
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25, expandBy: 'column'};
        return (
            <div>
                <BootstrapTable data={[{post_id: 1}]}
                                hover
                                pagination
                                options={options}
                                bordered={false}
                >
                    <TableHeaderColumn isKey dataField='post_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='post_date_start' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Początek</TableHeaderColumn>
                    <TableHeaderColumn dataField='post_date_end' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Koniec</TableHeaderColumn>
                    <TableHeaderColumn dataField='post_date_add' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Dodano</TableHeaderColumn>
                    <TableHeaderColumn dataField='post_date_edit' thStyle={tabgrid.tg5} tdStyle={tabgrid.tg5}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false}>Edytowano</TableHeaderColumn>
                    <TableHeaderColumn dataField='post_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}
                                       > Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
