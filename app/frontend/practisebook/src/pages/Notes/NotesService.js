import axios from 'axios';

let URL = 'http://localhost/practiseBook/app/backend/NoteRest.php5';

export default {

    getNote(id) {
        return axios.get(URL + '/?note_id=' + id);
    },

    getNotesByLeader(leader_id) {
        return axios.get(URL + '/?leader_id=' + leader_id);
    },

    getNotesByStudent(student_id) {
        return axios.get(URL + '/?student_id=' + student_id);
    },

    getAllNotes() {
        return axios.get(URL);
    },

    addNewNote(data) {
        return axios({
            method: 'post',
            url: URL,
            data: JSON.stringify(data)
        })
    },

    editNote(id, data) {
        return axios(
            {
                url: URL + '/?note_id=' + id,
                method: 'put',
                data: JSON.stringify(data)
            }
        )
    },

    deleteNote(id) {
        return axios({
                url: URL + '/?note_id=' + id,
                method: 'delete'
            }
        )
    },

}