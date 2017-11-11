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

require_once "UserService.php5";
require_once 'User.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['user_id'])) {
            $user_id = intval($_GET['user_id']);
            get_users($user_id);
        } else {
            get_users();
        }
        break;

    case 'POST':
        if (intval($_GET['user_id']))
            update_user(intval($_GET['user_id']));
        else
            insert_user();
        break;

    case 'PUT':
        if (intval($_GET['user_id']))
            update_user(intval($_GET['user_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        $user_id = intval($_GET['user_id']);
        delete_user($user_id);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_users($user_id = 0){
    $response = array();
    $service = new UserService();

    if($user_id == 0){
        $response = $service->getAllUsers();
    }
    else{
        $data = $service->getUserById($user_id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function insert_user(){
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new UserService();
    $newUser = new User();
    $newUser->setLogin($data->login);
    $newUser->setPassword($data->password);
    $newUser->setGroupId($data->group_id);
    $newUser->setFirstname($data->firstname);
    $newUser->setLastname($data->lastname);
    $newUser->setEmail($data->email);
    $newUser->setPhone($data->phone);
    $newUser->setStudy($data->study);
    $newUser->setSemester($data->semester);
    $newUser->setCompanyId($data->company_id);

    $response = $service->addNewUser($newUser);

    header('Content-Type: application/json');
    echo json_encode($response);
}