import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete} from '../../utilities/Buttons';

export default class PostsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.expandComponent = this.expandComponent.bind(this);
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
                <span className="label label-default">Notatka:</span>
                <p>{row.post_description}</p>
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
        return (row.study || row.company_id)
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25, expandBy: 'column'};
        return (
            <div>
                <BootstrapTable data={this.props.posts}
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
                                       expandable={false}> Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
