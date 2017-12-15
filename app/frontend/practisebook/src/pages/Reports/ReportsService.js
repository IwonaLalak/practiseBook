import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/ReportRest.php5';

export default {

    getReportByLeader(id) {
        return axios.get(URL + '/?leader_id=' + id);
    },

    getReportByPractise(id) {
        return axios.get(URL + '/?practise_id=' + id);
    },

    getReportById(id) {
        return axios.get(URL + '/?report_id=' + id);
    },

    getAllReports() {
        return axios.get(URL);
    },

    addNewReport(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editReport(id, data) {
        return axios(
            {
                url: URL + '/?report_id=' + id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deleteReport(id) {
        return axios({
                url: URL + '/?report_id=' + id,
                method: 'delete'
            }
        )
    }
}