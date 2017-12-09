import React, {Component} from 'react';

import Header from '../../components/header/Header';
import GeneralTop from "../../components/generaltop/GeneralTop";
import ReportsTable from "../../components/reports/ReportsTable";
import ReportsForm from "../../components/reports/ReportsForm";
import If from "../../utilities/If";
import ReportsService from "./ReportsService";

export default class ReportsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            filtersState: false,
            showReportForm: false,
            editionMode: false,
            report: null,
        };
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewReport = this.handleClickAddNewReport.bind(this);
        this.handleClickEditReport = this.handleClickEditReport.bind(this);
        this.handleClickDeleteReport = this.handleClickDeleteReport.bind(this);
        this.handleClickSeeReport = this.handleClickSeeReport.bind(this);
        this.handleSaveData = this.handleSaveData.bind(this);
        this.handleCancelSave = this.handleCancelSave.bind(this);

        this.getReports = this.getReports.bind(this);
        this.getPractises = this.getPractises.bind(this);

    }

    componentDidMount(){
        this.getReports();
    }

    getReports(){
        ReportsService.getReportByLeader(localStorage.getItem("current_userid")).then(function (response) {
            this.setState({reports: response.data})
        }.bind(this))
    }

    getPractises(){

    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewReport() {
        this.setState({showReportForm: true, editionMode: true})
    }

    handleClickEditReport(id) {
        let report = this.state.reports.find(report => report.raport_id == id);
        this.setState({showReportForm: true, report: report, editionMode: true})
    }

    handleClickDeleteReport(id) {
    }

    handleClickSeeReport(id){
        let report = this.state.reports.find(report => report.raport_id == id);
        this.setState({showReportForm: true, report: report, editionMode: false})
    }

    handleSaveData(data, editionMode) {
        console.log(data)
        console.log(editionMode)
    }

    handleCancelSave() {
        this.setState({showReportForm: false, report: null})
    }

    render() {
        return (
            <div>
                <div>
                    <Header url={[{url: 'raporty', text: 'raporty'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_REPORTS">
                    <div>
                        <If isTrue={!this.state.showReportForm}>
                            <GeneralTop handleClickAdd={this.handleClickAddNewReport}
                                        handleClickEnableSearch={this.handleClickEnableSearch}
                                        addBtnText="Dodaj nowy raport"
                            />
                        </If>
                    </div>
                    <div style={{clear: 'both'}}>
                        <If isTrue={this.state.showReportForm}>
                            <ReportsForm handleCancelClick={this.handleCancelSave} handleSaveClick={this.handleSaveData}
                                         editionMode={this.state.editionMode} report={this.state.report}
                            />
                        </If>
                    </div>
                    <div style={{clear: 'both'}}>
                        <ReportsTable
                            reports={this.state.reports}
                            enableFilters={this.state.filtersState}
                            handleEditClick={this.handleClickEditReport}
                            handleDeleteClick={this.handleClickDeleteReport}
                            handleSeeClick = {this.handleClickSeeReport}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
