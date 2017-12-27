import React, {Component} from 'react';
import {Row, Col, ButtonToolbar, FormControl} from "react-bootstrap";
import If from "../../utilities/If";
import {ButtonAction, ButtonCancel, ButtonClose, ButtonEdit, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';


export default class CalendarCurrentEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNoteForm: false,
            new_note_content: '',
            addBtnClicked: false
        };
        this.onButtonClickClose = this.onButtonClickClose.bind(this);
        this.onButtonClickEdit = this.onButtonClickEdit.bind(this);
        this.onButtonClickAddNote = this.onButtonClickAddNote.bind(this);
        this.cancelAddNote = this.cancelAddNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.onChangeNoteContent = this.onChangeNoteContent.bind(this);
    }

    componentDidMount() {
    }

    onButtonClickClose() {
        this.props.handleCloseClick();
    }

    onButtonClickEdit() {
        this.props.handleEditClick();
    }

    onButtonClickAddNote() {
        this.setState({showNoteForm: true})
    }

    cancelAddNote() {
        this.setState({showNoteForm: false})
    }

    saveNote(){
        this.setState({addBtnClicked: true});
        if(this.state.new_note_content.length>0){
            let data = {
                leader_id: localStorage.getItem("current_userid"),
                student_id: this.props.event.student_id,
                post_id: this.props.event.post_id,
                note_content: this.state.new_note_content
            }
            this.props.handleAddNewNoteEvent(data);
            this.cancelAddNote();
        }
        else{
            this.refs.notificator.error("Błąd dodawania nowej uwagi.", "Nie uzupełniono poprawnie treści", 3000);
        }
    }

    onChangeNoteContent(e){
        this.setState({new_note_content: e.target.value})
    }

    render() {
        return (
            <div id={"CURRENT_EVENT"}>
                <ReactNotify ref='notificator'/>
                <Row>
                    <Col xs={12}>
                        <div className='application_legend_container'>
                            <div className='application_legend_title'>
                                <i className="fa fa-bars" style={{marginRight: '5px'}}></i>
                                Podgląd danego wpisu
                            </div>
                            <Row>
                                <Col xs={12} md={6} lg={2}>
                                    <div>
                                        <h5 className='subtitle'>Ramy czasowe</h5>
                                        <div>
                                            <label>Początek: </label> <span>{this.props.event.post_date_start}</span>
                                        </div>
                                        <div>
                                            <label>Koniec: </label> <span>{this.props.event.post_date_end}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} lg={2}>
                                    <div>
                                        <h5 className='subtitle'>Informacje o czasie dodania</h5>
                                        <div>
                                            <label>Dodano: </label> <span>{this.props.event.post_date_add}</span>
                                        </div>
                                        <div>
                                            <If isTrue={Boolean(this.props.event.post_date_edit)}>
                                                <label>Edytowano: </label> <span>{this.props.event.post_date_edit}</span>
                                            </If>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={12} lg={8}>
                                    <div>
                                        <h5 className='subtitle'>Notatki i uwagi</h5>
                                        <p>
                                            <label className='right3'>Notatka studenta:</label>
                                            <span>
                                             {this.props.event.post_description}
                                         </span>
                                        </p>
                                        <If isTrue={Boolean(this.props.note)}>
                                            <p>
                                                <label className='right3'>Uwaga leadera:</label>
                                                <span>
                                                 {
                                                     Boolean(this.props.note) ?
                                                         this.props.note.note_content
                                                         :
                                                         'Brak uwag'
                                                 }
                                             </span>
                                            </p>
                                        </If>
                                        <If isTrue={Boolean(!this.props.note) && localStorage.getItem('current_usergroup') == 3}>
                                            <p>
                                                <span className="right15">Brak uwag</span>
                                                <ButtonAction onClick={this.onButtonClickAddNote} iconType={'fa fa-plus'}
                                                              btnText={'Dodaj uwagę do wpisu'}/>
                                            </p>
                                        </If>
                                    </div>
                                </Col>
                                <If isTrue={this.state.showNoteForm}>
                                    <Col xs={12}>
                                        <h5 className='subtitle'>Treść uwagi dotyczącej tego wpisu</h5>
                                        <Row>
                                            <Col xs={12} md={12} lg={10} className={(this.state.new_note_content.length<1 && this.state.addBtnClicked)? 'has-error':''}>
                                                <FormControl type="text" onChange={this.onChangeNoteContent}/>
                                            </Col>
                                            <Col xs={12} md={12} lg={2}>
                                                <div className='pull-right'>
                                                    <ButtonToolbar>
                                                        <ButtonSave onClick={this.saveNote}/>
                                                        <ButtonCancel onClick={this.cancelAddNote}/>
                                                    </ButtonToolbar>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </If>
                                <If isTrue={!this.state.showNoteForm}>
                                    <Col xs={12}>
                                        <div className='pull-right'>
                                            <ButtonClose onClick={this.onButtonClickClose}/>
                                            <If isTrue={this.props.editableMode}>
                                                <ButtonEdit onClick={this.onButtonClickEdit}/>
                                            </If>
                                        </div>
                                    </Col>
                                </If>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
