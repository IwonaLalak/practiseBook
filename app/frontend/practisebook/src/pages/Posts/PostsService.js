import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/PostRest.php5';

export default {

    getPost(id) {
        return axios.get(URL + '/?post_id=' + id);
    },

    getPostByStudent(student_id) {
        return axios.get(URL + '/?student_id=' + student_id);
    },

    getAllPosts() {
        return axios.get(URL);
    },

    addNewPost(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editPost(id, data) {
        return axios(
            {
                url: URL + '/?post_id=' + id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deletePost(id) {
        return axios({
                url: URL + '/?post_id=' + id,
                method: 'delete'
            }
        )
    },

}