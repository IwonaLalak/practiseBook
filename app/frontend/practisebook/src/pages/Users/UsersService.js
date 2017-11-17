import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/UserRest.php5';

export default{

    getUser(id){
        return axios.get(URL+'/?user_id='+id);
    },

    getAllUsers(){
        return axios.get(URL);
    },

    addNewUser(data){
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editUser(id, data){
        return axios(
            {
                url: URL + '/?user_id='+id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deleteUser(id){
        return axios({
                url: URL+'/?user_id='+id,
                method: 'delete'
            }
        )
    }

}