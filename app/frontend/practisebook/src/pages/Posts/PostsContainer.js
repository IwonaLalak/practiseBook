import React, {Component} from 'react';

import Header from '../../components/header/Header';
import PostsTable from "../../components/posts/PostsTable";
import GeneralTop from "../../components/generaltop/GeneralTop";
import If from "../../utilities/If";
import PostsService from "./PostsService";
import PostsForm from "../../components/posts/PostsForm";
import PractisesService from "../Practises/PractisesService";
import ReactNotify from 'react-notify';

export default class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            practise_id: null,
            filtersState: false,
            postForEdition: false,
            postsFormVisibility: false,
        };
        this.getData = this.getData.bind(this);
        this.getPractiseId = this.getPractiseId.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewPost = this.handleClickAddNewPost.bind(this);
        this.handleClickEditPost = this.handleClickEditPost.bind(this);
        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
        this.cancelSaving = this.cancelSaving.bind(this);
        this.savePost = this.savePost.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.getPractiseId();
    }

    getData() {
        PostsService.getPostByStudent(localStorage.getItem("current_userid")).then(function (response) {
            if (response.data) {
                this.setState({posts: response.data});
            }
        }.bind(this))
    }

    getPractiseId() {
        PractisesService.getPractiseByStudent(localStorage.getItem("current_userid")).then(function (response) {
            if (response.data[0] != false) {
                this.setState({practise_id: response.data.practises[0].practise_id});
            }
        }.bind(this))
    }

    handleClickEnableSearch() {
        this.setState({filtersState: !this.state.filtersState});
    }

    handleClickAddNewPost() {
        this.setState({
            postsFormVisibility: true
        })
    }

    handleClickEditPost(id) {
        this.setState({postForEdition: this.state.posts.find(post => post.post_id === id), postsFormVisibility: true});
    }

    savePost(data, isEdition) {
        if (isEdition) {
            PostsService.editPost(this.state.postForEdition.post_id, data).then(function (response) {

                if(response.status == 200){
                    this.refs.notificator.success("Pomyślnie edytowano wpis", "", 3000)
                }
                else{
                    this.refs.notificator.error("Błąd edycji wpisu.", "Nastąpił błąd po stronie bazy danych", 3000)
                }
                this.getData();
            }.bind(this))
        }
        else {
             PostsService.addNewPost(data).then(function (response) {
                 if(response.status == 200){
                     this.refs.notificator.success("Pomyślnie dodano nowy wpis", "", 3000)
                 }
                 else{
                     this.refs.notificator.error("Błąd dodawania nowego wpisu.", "Nastąpił błąd po stronie bazy danych", 3000)
                 }
                 this.getData();
             }.bind(this))
        }

        this.cancelSaving();
    }

    cancelSaving() {
        this.setState({postForEdition: false, postsFormVisibility: false});
    }

    handleClickDeletePost(id) {
        // todo: rest
        console.log('delete post');
        PostsService.deletePost(id).then(function (response) {
            if(response.status == 200){
                this.refs.notificator.success("Pomyślnie usunięto wpis", "", 3000)
            }
            else{
                this.refs.notificator.error("Błąd usuwania wpisu.", "Nastąpił błąd po stronie bazy danych", 3000)
            }

            this.getData();
        }.bind(this))
    }

    render() {
        return (
            <div>
                <ReactNotify ref='notificator'/>
                <div>
                    <Header url={[{url: 'wpisy', text: 'wpisy'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_POSTS">
                    <If isTrue={this.state.practise_id != null}>
                        <div>
                            <GeneralTop
                                handleClickAdd={this.handleClickAddNewPost}
                                handleClickEnableSearch={this.handleClickEnableSearch}
                                addBtnText="Dodaj nowy wpis"
                            />
                        </div>
                    </If>
                    <If isTrue={Boolean(this.state.postsFormVisibility)}>
                        <div id="EDIT_POST">
                            <PostsForm handleAddClick={this.savePost} handleCancelClick={this.cancelSaving}
                                       editedPost={this.state.postForEdition} practise_id={this.state.practise_id}/>
                        </div>
                    </If>
                    <div style={{clear: 'both'}}>
                        <PostsTable
                            posts={this.state.posts}
                            enableFilters={this.state.filtersState}
                            handleEditClick={this.handleClickEditPost}
                            handleDeleteClick={this.handleClickDeletePost}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
