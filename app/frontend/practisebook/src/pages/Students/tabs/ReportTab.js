import React, {Component} from 'react';
import {Row, Col} from "react-bootstrap";
import ReportsService from "../../Reports/ReportsService";
import If from "../../../utilities/If";
import ReportView from "../../../components/reports/ReportView";
import ReportsForm from "../../../components/reports/ReportsForm";
import {ButtonAction} from "../../../utilities/Buttons";
import ReactNotify from 'react-notify';


export default class ReportTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: false,
            showReportForm: false
        };

        this.getReportData = this.getReportData.bind(this);
        this.onClickAddReport = this.onClickAddReport.bind(this);
        this.handleCancelSave = this.handleCancelSave.bind(this);
        this.handleSaveData = this.handleSaveData.bind(this);
    }

    getReportData(id) {
        ReportsService.getReportByPractise(id).then(function (response) {
            if (response.data) {
                this.setState({report: response.data})
            }
        }.bind(this))
    }

    componentWillReceiveProps(nextprops) {
        this.getReportData(nextprops.practise_id)
    }

    onClickAddReport() {
        this.setState({showReportForm: true});
    }

    handleCancelSave() {
        this.setState({showReportForm: false})
    }

    handleSaveData(data) {
        ReportsService.addNewReport(data).then(function (response) {
            if (response.status == 200) {
                this.refs.notificator.success("Pomyślnie wystawiono raport", "", 3000);
                this.getReportData(this.props.practise_id);
            }
            else {
                this.refs.notificator.error("Błąd zapisu raportu.", "Wystąpił błąd po stronie bazy danych", 3000);
            }
        }.bind(this))
    }

    render() {
        return (
            <div className={'top15'}>
                <ReactNotify ref='notificator'/>
                <Row>
                    <If isTrue={this.state.report}>
                        <Col xs={12} md={12} lg={12}>
                            <div>
                                <ReportView report={this.state.report} hideBackButton={true}/>
                            </div>
                        </Col>
                    </If>

                    <If isTrue={!this.state.report}>
                        <Col xs={12} md={10} lg={6}>
                            <div className="application_legend_container">
                                <div className="application_legend_title">
                                    <i className="fa fa-file-text-o" style={{marginRight: '5px'}}></i>
                                    Raport oceny praktyk
                                </div>
                                <Row>
                                    <Col xs={12} md={8}>
                                        <div className="application_error_text_alert">
                                            <i className="fa fa-exclamation-circle"></i>
                                            <span>Student nie posiada jeszcze wystawionego raportu</span>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <If isTrue={localStorage.getItem('current_usergroup') == 3 && !this.state.showReportForm}>
                                            <ButtonAction onClick={this.onClickAddReport} btnText={'Wystaw raport'} iconType={'fa fa-plus'}/>
                                        </If>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <If isTrue={localStorage.getItem('current_usergroup') == 3 && this.state.showReportForm}>
                                <div>
                                    <ReportsForm handleCancelClick={this.handleCancelSave} handleSaveClick={this.handleSaveData}
                                                 editionMode={true} report={this.state.report} practise_id={this.props.practise_id}
                                    />
                                </div>
                            </If>
                        </Col>
                    </If>
                </Row>
            </div>
        )
    }
}
