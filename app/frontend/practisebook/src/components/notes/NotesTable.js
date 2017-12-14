import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ButtonToolbar} from 'react-bootstrap';
import tabgrid from '../../utilities/TabGrid';
import {TableBtnEdit, TableBtnDelete, TableBtnSee} from '../../utilities/Buttons';
import ReactTooltip from 'react-tooltip'
import TextUtilities from "../../utilities/TextUtilities";


export default class NotesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
        this.renderNoteContent = this.renderNoteContent.bind(this);
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

    onSeeClick(id) {
        this.props.handleSeeClick(id);
    }

    renderActionButtons(cell, row) {
        return (
            <ButtonToolbar>
                <TableBtnEdit onClick={() => this.onEditClick(cell)}/>
                <TableBtnDelete onClick={() => this.onDeleteClick(cell)}/>
            </ButtonToolbar>
        )
    }

    renderStudent(cell, row) {
        return (
            <div>
                <p data-tip='' data-for={'student_data' + cell} data-place="bottom">{row.firstname} {row.lastname}</p>
                <ReactTooltip id={'student_data' + cell}>
                    <p>{row.phone}</p>
                    <p>{row.email}</p>
                    <p>{row.study}, {row.semester}</p>
                </ReactTooltip>
            </div>
        )
    }

    renderNoteContent(cell,row){
        return TextUtilities.formatShortenedText(cell,130);
    }

    expandComponent(row) {
        return (
            <div>
                <p>
                    <span className="label label-default">Notatka studenta:</span>
                    <p>{row.post_description}</p>
                </p>
                <p>
                    <span className="label label-default">Treść uwagi:</span>
                    <p>{row.note_content}</p>
                </p>
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
        return (true)
    }

    render() {

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25, expandBy: 'column'};
        return (
            <div>
                <BootstrapTable data={this.props.notes}
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
                    <TableHeaderColumn isKey dataField='note_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='note_date' thStyle={tabgrid.tg3} tdStyle={tabgrid.tg3}
                                       filter={(this.props.enableFilters) ? {type: 'TextFilter', delay: 500, placeholder: 'Szukaj'} : false}
                    >Data dodania uwagi</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastname' thStyle={tabgrid.tg4} tdStyle={tabgrid.tg4}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false} dataFormat={this.renderStudent}>Student</TableHeaderColumn>
                    <TableHeaderColumn dataField='note_content' thStyle={tabgrid.tg11} tdStyle={tabgrid.tg11}
                                       filter={(this.props.enableFilters) ? {
                                           type: 'TextFilter',
                                           delay: 500,
                                           placeholder: 'Szukaj'
                                       } : false} dataFormat={this.renderNoteContent}>Podgląd uwagi</TableHeaderColumn>
                    <TableHeaderColumn dataField='note_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}
                    > Akcje

                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
