import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/GradeRest.php5';

export default {

    getGrade(id) {
        return axios.get(URL + '/?grade_id=' + id);
    },

    getGradesByLecturer(lecturer_id) {
        return axios.get(URL + '/?lecturer_id=' + lecturer_id);
    },

    getGradesByPractise(practise_id) {
        return axios.get(URL + '/?practise_id=' + practise_id);
    },

    getAllGrades() {
        return axios.get(URL);
    },

    addNewGrade(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editGrade(id, data) {
        return axios(
            {
                url: URL + '/?grade_id=' + id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deleteGrade(id) {
        return axios({
                url: URL + '/?grade_id=' + id,
                method: 'delete'
            }
        )
    },

}