import React, {Component} from 'react';

import Header from '../../components/header/Header';
import ReportsService from "./ReportsService";
import ReportView from "../../components/reports/ReportView";

export default class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null,
            users: []
        };
        this.getReportData = this.getReportData.bind(this);
    }

    componentDidMount(){
        this.getReportData();
    }

    getReportData(){
        //todo: walidacja czy dany id w url jest dobry
        ReportsService.getReportById(this.props.match.params.id).then(function (response) {
            this.setState({report:response.data});
        }.bind(this))
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'raporty',text:'raporty'},{url:'',text:'raport nr '+this.props.match.params.id}]}/>
                </div>
                <div id="CURRENT_REPORT">
                    <ReportView report={this.state.report}/>
                </div>
            </div>
        )
    }
}
