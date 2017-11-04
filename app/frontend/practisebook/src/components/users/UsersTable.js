import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import tabgrid from '../../utilities/TabGrid';

export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderActionButtons = this.renderActionButtons.bind(this);
    }

    renderActionButtons(cell, row){
        return 'buttons';
    }

    render(){

        const options = {sizePerPageList: [10, 25, 50], sizePerPage: 25};

        return (
            <div>
                <BootstrapTable data={this.props.users}
                                hover
                                pagination
                                options={options}
                                bordered={false}>
                    <TableHeaderColumn isKey dataField='user_id' hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='login' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>
                        Login
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='group_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Grupa</TableHeaderColumn>
                    <TableHeaderColumn dataField='firstname' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Imię</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastname' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Nazwisko</TableHeaderColumn>
                    <TableHeaderColumn dataField='email' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='phone' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Telefon</TableHeaderColumn>
                    <TableHeaderColumn dataField='study' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Kierunek</TableHeaderColumn>
                    <TableHeaderColumn dataField='semester' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Semestr</TableHeaderColumn>
                    <TableHeaderColumn dataField='company_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2}>Firma</TableHeaderColumn>
                    <TableHeaderColumn dataField='user_id' thStyle={tabgrid.tg2} tdStyle={tabgrid.tg2} dataFormat={this.renderActionButtons}>Akcje</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
