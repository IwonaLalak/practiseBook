import React, {Component} from 'react';

import Header from '../../components/header/Header';
import PostsTable from "../../components/posts/PostsTable";
import GeneralTop from "../../components/generaltop/GeneralTop";
import If from "../../utilities/If";
import PostsService from "./PostsService";

export default class PostsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            filtersState: false,
            postForEdition: false
        };
        this.getData = this.getData.bind(this);
        this.handleClickEnableSearch = this.handleClickEnableSearch.bind(this);
        this.handleClickAddNewPost = this.handleClickAddNewPost.bind(this);
        this.handleClickEditPost = this.handleClickEditPost.bind(this);
        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
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
        this.props.history.push("/wpisy/dodaj");
    }

    handleClickEditPost(id) {
        this.setState({postForEdition: this.state.posts.find(post => post.post_id === id)});
    }

   /* savePost(data) {
        // todo: rest edit
       console.log('saving...')
    }

    cancelEdition(){
        this.setState({postForEdition: false});
    }
*/
    handleClickDeletePost(id) {
        // todo: rest
       console.log('delete post');
    }

    render(){
        return (
            <div>
                <div>
                    <Header url={[{url:'wpisy',text:'wpisy'},{url:'',text:'przegląd'}]}/>
                </div>
                <div id="ALL_POSTS">
                    <div>
                        <GeneralTop
                            handleClickAdd={this.handleClickAddNewPost}
                            handleClickEnableSearch={this.handleClickEnableSearch}
                            addBtnText = "Dodaj nowy wpis"
                        />
                    </div>
                    <If isTrue={Boolean(this.state.postForEdition)}>
                        <div id="EDIT_POST">
                            edit
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
