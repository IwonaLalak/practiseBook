import React, {Component} from 'react';
import ReactNotify from 'react-notify';

import Header from '../../components/header/Header';
import If from "../../utilities/If";
import GeneralTop from "../../components/generaltop/GeneralTop";
import NotesTable from "../../components/notes/NotesTable";
import NotesForm from "../../components/notes/NotesForm";
import StudentsService from "../Students/StudentsService";
import NotesService from "./NotesService";

export default class NotesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            filtersState: false,
            showNoteForm: false,
            editedNote: null,
            students: [],
        };
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewNote = this.handleClickAddNewNote.bind(this);
        this.handleClickEditNote = this.handleClickEditNote.bind(this);
        this.handleClickDeleteNote = this.handleClickDeleteNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.cancelSaving = this.cancelSaving.bind(this);

        this.getStudents = this.getStudents.bind(this);
        this.getNotes = this.getNotes.bind(this);
    }

    getStudents() {
        StudentsService.getStudentsByLeader(localStorage.getItem("current_userid")).then(function (response) {
            this.setState({students: response.data})
        }.bind(this))
    }

    getNotes(){
        NotesService.getNotesByLeader(localStorage.getItem("current_userid")).then(function (response) {
            this.setState({notes: response.data})
        }.bind(this))
    }

    componentDidMount() {
        this.getStudents();
        this.getNotes();
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewNote() {
        this.setState({showNoteForm: true})
    }

    handleClickEditNote(id) {
        let note = this.state.notes.find(note=> note.note_id == id);
        this.setState({showNoteForm: true, editedNote: note})
    }

    handleClickDeleteNote(id) {
        NotesService.deleteNote(id).then(function (response) {
            if(response.status == 200) {
                this.refs.notificator.success("Pomyślnie usunięto uwagę", "", 3000);
                this.getNotes();
            }
        }.bind(this))
    }

    saveNote(data,isEdition) {
        if(!isEdition){
            NotesService.addNewNote(data).then(function (response) {
                if(response.status == 200){
                    this.refs.notificator.success("Pomyślnie dodano uwagę", "", 3000);
                    this.getNotes();
                }
                else{
                    this.refs.notificator.error("Błąd dodawania nowej uwagi.", "Wystąpił bład w bazie danych", 3000);
                }
            }.bind(this))
        }
        else{
            NotesService.editNote(this.state.editedNote.note_id, data).then(function (response) {
                console.log(response)
                if(response.status == 200){
                    this.refs.notificator.success("Pomyślnie edytowano uwagę", "", 3000);
                    this.getNotes();
                }
                else{
                    this.refs.notificator.error("Błąd edycji uwagi.", "Wystąpił bład w bazie danych", 3000);
                }
            }.bind(this))
        }

        this.cancelSaving();
    }

    cancelSaving() {
        this.setState({showNoteForm: false, editedNote: null})
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'uwagi', text: 'uwagi'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_NOTES">
                    <div>
                        <If isTrue={!this.state.showReportForm}>
                            <GeneralTop handleClickAdd={this.handleClickAddNewNote}
                                        handleClickEnableSearch={this.handleClickEnableSearch}
                                        addBtnText="Dodaj nową uwagę"
                            />
                        </If>
                    </div>
                    <div id="NOTE_FORM">
                        <If isTrue={Boolean(this.state.showNoteForm)}>
                            <NotesForm handleAddClick={this.saveNote}
                                       handleCancelClick={this.cancelSaving}
                                       editedNote={this.state.editedNote}
                                       students={this.state.students}
                            />
                        </If>
                    </div>
                    <div style={{clear: 'both'}}>
                        <NotesTable
                            notes={this.state.notes}
                            enableFilters={this.state.filtersState}
                            handleEditClick={this.handleClickEditNote}
                            handleDeleteClick={this.handleClickDeleteNote}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
