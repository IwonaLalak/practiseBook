import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/StudentsRest.php5';

export default {

    getStudentsByLeader(leader_id) {
        return axios.get(URL + '/?leader_id=' + leader_id);
    },

    getStudentsByLecturer(lecturer_id) {
        return axios.get(URL + '/?lecturer_id=' + lecturer_id);
    },

    getAllStudents() {
        return axios.get(URL);
    },

}