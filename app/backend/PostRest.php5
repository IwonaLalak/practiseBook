<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:18
 */

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

$request_method = $_SERVER["REQUEST_METHOD"];

require_once "PostService.php5";
require_once 'Post.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['post_id'])) {
            $post_id = intval($_GET['post_id']);
            get_posts($post_id);
        } else if (!empty($_GET['student_id'])) {
            get_posts_by_student(intval($_GET['student_id']));
        } else {
            get_posts();
        }
        break;

    case 'POST':
        if (intval($_GET['post_id']))
            update_post(intval($_GET['post_id']));
        else
            insert_post();
        break;

    case 'PUT':
        if (intval($_GET['post_id']))
            update_post(intval($_GET['post_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        $post_id = intval($_GET['post_id']);
        delete_post($post_id);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_posts($id = 0)
{

    $response = array();
    $service = new PostService();

    if ($id == 0) {
        $response = $service->getAllPosts();
    } else {
        $data = $service->getPostById($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_posts_by_student($id)
{
    $response = array();
    $service = new PostService();
    $response = $service->getPostsByStudentId($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}



function insert_post()
{
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new PostService();
    $newPost = new Post();

    $newPost->setStudentId($data->student_id);
    $newPost->setPractiseId($data->practise_id);
    $newPost->setPostDateStart($data->post_date_start);
    $newPost->setPostDateEnd($data->post_date_end);
    $newPost->setPostDescription($data->post_description);

    $response = $service->addNewPost($newPost);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_post($id)
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new PostService();
    $currentPost = new Post();
    $currentPost->setPostId($id);
    $currentPost->setPostDateStart($data->post_date_start);
    $currentPost->setPostDateEnd($data->post_date_end);
    $currentPost->setPostDescription($data->post_description);

    $response = $service->updatePost($currentPost);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_post($id)
{
    $response = array();
    $service = new PostService();
    $response = $service->deletePost($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}