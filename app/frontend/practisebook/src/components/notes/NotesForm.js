import React, {Component} from 'react';
import {Form, FormControl, FormGroup, ControlLabel, Col, Row, ButtonToolbar} from 'react-bootstrap';
import {ButtonCancel, ButtonSave} from "../../utilities/Buttons";
import ReactNotify from 'react-notify';
import Select from "react-select";
import If from "../../utilities/If";
import PostsService from "../../pages/Posts/PostsService";
import TextUtilities from "../../utilities/TextUtilities";

export default class NotesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note_content: '',
            selectedStudent: null,
            selectedPost: null,
            posts: [],

        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.getStudentPosts = this.getStudentPosts.bind(this);
        this.onChangeNoteContent = this.onChangeNoteContent.bind(this);
        this.onChangeStudent = this.onChangeStudent.bind(this);
        this.onChangePost = this.onChangePost.bind(this);
        this.renderPostOptions = this.renderPostOptions.bind(this);


    }

    onAddBtnClick() {

        this.setState({addBtnClicked: true})

        if(this.state.selectedPost && this.state.selectedStudent && this.state.note_content.length>0){

            let data = {
                leader_id: localStorage.getItem("current_userid"),
                student_id: this.state.selectedStudent.user_id,
                post_id: this.state.selectedPost.post_id,
                note_content: this.state.note_content
            };
            this.props.handleAddClick(data,Boolean(this.props.editedNote));
        }
        else{
            this.refs.notificator.error("Błąd dodawania nowej uwagi.", "Nie uzupełniono poprawnie danych", 3000);
        }
    }

    onCancelBtnClick() {
        this.props.handleCancelClick();
    }

    onChangeStudent(e) {
        this.setState({selectedStudent: e,selectedPost: null, posts:[]})
        if (e != null) {
            this.getStudentPosts(e.student_id)
        }
    }

    onChangePost(e) {
        this.setState({selectedPost: e})
    }

    onChangeNoteContent(e) {
        this.setState({note_content: e.target.value})
    }

    getStudentPosts(id) {
        PostsService.getPostByStudent(id).then(function (response) {
            if (response.data)
                this.setState({posts: response.data})
        }.bind(this))
    }

    componentDidMount() {
        if (this.props.editedNote) {
            console.log(this.props.editedNote)
        }
    }

    renderPostOptions(value) {
        return (
            <span>
                <span className="label label-default">{value.post_date_add}</span>
                <span style={{marginLeft: '5px'}}>{TextUtilities.formatShortenedText(value.post_description,80)}</span>
            </span>
        );
    }

    render() {

        return (
            <div>
                <ReactNotify ref='notificator'/>
                <Form horizontal>
                    <div>
                        <Col sm={12} md={12} lg={12}>
                            <FormGroup>
                                <h5>Wybór studenta i wpisu</h5>
                                <Row>
                                    <Col xs={12} md={4} lg={3} className={(this.state.addBtnClicked && !this.state.selectedStudent) ? 'has-error' : ''}>
                                        <ControlLabel>Wybór studenta</ControlLabel>
                                        <Select
                                            options={this.props.students}
                                            value={this.state.selectedStudent}
                                            name="StudentSelect"
                                            onChange={this.onChangeStudent}
                                            clearable={false}
                                            labelKey="lastname"
                                            valueKey="user_id"
                                            placeholder="Wybierz studenta"
                                        />

                                    </Col>
                                    <Col xs={12} md={4} lg={5} className={(this.state.addBtnClicked && !this.state.selectedPost) ? 'has-error' : ''}>
                                        <ControlLabel>Wybór wpisu</ControlLabel>
                                        <If isTrue={Boolean(this.state.selectedStudent && this.state.posts.length>0)}>
                                            <Select
                                                options={this.state.posts}
                                                value={this.state.selectedPost}
                                                name="PostSelect"
                                                onChange={this.onChangePost}
                                                clearable={false}
                                                labelKey="post_description"
                                                valueKey="post_id"
                                                placeholder="Wybierz wpis studenta"
                                                valueRenderer={this.renderPostOptions}
                                                optionRenderer={this.renderPostOptions}
                                            />
                                        </If>
                                        <If isTrue={Boolean(this.state.selectedStudent && !this.state.posts.length>0)}>
                                            <div id="noStudentPostsInformation">
                                                <i className="fa fa-exclamation-circle"></i>
                                                <span>Student nie posiada jeszcze wpisów</span>
                                            </div>
                                        </If>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <h5>Uwaga do wpisu</h5>
                                <Row>
                                    <Col xs={12} lg={12} className={(this.state.addBtnClicked && this.state.note_content.length<1) ? 'has-error' : ''}>
                                        <ControlLabel>Treść uwagi</ControlLabel>
                                        <textarea className="form-control" onChange={this.onChangeNoteContent}></textarea>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <div style={{clear: 'both'}}>
                                <FormGroup>
                                    <div className="pull-right">
                                        <ButtonToolbar>
                                            <ButtonCancel onClick={this.onCancelBtnClick}/>
                                            <ButtonSave onClick={this.onAddBtnClick}/>
                                        </ButtonToolbar>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>
                    </div>
                </Form>
            </div>
        )
    }
}
