import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/GlobalSettingsRest.php5';

export default{

    getSettings(){
        return axios.get(URL);
    },

    setSettings(data){
        return axios(
            {
                url: URL,
                method: 'post',
                data: JSON.stringify(data)
            }
        )
    },
}