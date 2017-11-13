import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/CompanyRest.php5';

export default{

    getAllCompanies(){
        return axios.get(URL);
    },

    addNewCompany(data){
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editCompany(id, data){
        return axios(
            {
                url: URL + '/?company_id='+id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deleteCompany(id){
        return axios({
                url: URL+'/?company_id='+id,
                method: 'delete'
            }
        )
    }

}