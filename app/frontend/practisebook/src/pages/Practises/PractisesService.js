import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/PractiseRest.php5';

export default{

    getPractiseByStudent(id){
        return axios.get(URL+'/?student_id='+id);
    },

    getPractiseByLecturer(id){
        return axios.get(URL+'/?lecturer_id='+id);
    },

    getPractiseByLeader(id){
        return axios.get(URL+'/?leader_id='+id);
    },

    getPractiseById(id){
        return axios.get(URL+'/?practise_id='+id);
    },

    getAllPractises(){
        return axios.get(URL);
    },

    addNewPractise(data){
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editPractise(id, data){
        return axios(
            {
                url: URL + '/?practise_id='+id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deletePractise(id) {
        return axios({
                url: URL + '/?practise_id=' + id,
                method: 'delete'
            }
        )
    }
}