import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/UserRest.php5';

export default{

    getAllUsers(){
        return axios.get(URL);
    },


}