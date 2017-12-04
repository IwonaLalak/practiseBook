import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/LoginRest.php5';

export default{

    login(data){
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },
    setUserdata(data){
        localStorage.setItem("current_userid", data.user_id);
        localStorage.setItem("current_username", data.login);
        localStorage.setItem("current_userdata", JSON.stringify(data));
    },
    logout(){
        localStorage.removeItem("current_userid");
        localStorage.removeItem("current_username");
        localStorage.removeItem("current_userdata");
    }


}