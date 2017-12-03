import React, {Component} from 'react';

import Header from '../../components/header/Header';
import PostsTable from "../../components/posts/PostsTable";
import GeneralTop from "../../components/generaltop/GeneralTop";
import If from "../../utilities/If";
import PostsService from "./PostsService";
import PostsForm from "../../components/posts/PostsForm";

export default class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filtersState: false,
            postForEdition: false,
            postsFormVisibility: false,
        };
        this.getData = this.getData.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewPost = this.handleClickAddNewPost.bind(this);
        this.handleClickEditPost = this.handleClickEditPost.bind(this);
        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
        this.cancelSaving = this.cancelSaving.bind(this);
        this.savePost = this.savePost.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        PostsService.getAllPosts().then(function (response) {
            this.setState({posts: response.data})
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
         console.log(data);
        if(isEdition){
            console.log('edit')
            // todo: rest edit
        }
        else{
            console.log('add')
            // todo: rest add
        }

        this.cancelSaving();
     }

     cancelSaving(){
         this.setState({postForEdition: false, postsFormVisibility: false});
     }

    handleClickDeletePost(id) {
        // todo: rest
        console.log('delete post');
    }

    render() {
        return (
            <div>
                <div>
                    <Header url={[{url: 'wpisy', text: 'wpisy'}, {url: '', text: 'przegląd'}]}/>
                </div>
                <div id="ALL_POSTS">
                    <div>
                        <GeneralTop
                            handleClickAdd={this.handleClickAddNewPost}
                            handleClickEnableSearch={this.handleClickEnableSearch}
                            addBtnText="Dodaj nowy wpis"
                        />
                    </div>
                    <If isTrue={Boolean(this.state.postsFormVisibility)}>
                        <div id="EDIT_POST">
                            <PostsForm handleAddClick={this.savePost} handleCancelClick={this.cancelSaving}
                                       editedPost={this.state.postForEdition} />
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
