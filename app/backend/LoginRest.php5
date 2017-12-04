<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:18
 */

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

$request_method = $_SERVER["REQUEST_METHOD"];

require_once "LoginService.php5";
require_once 'User.php5';

switch ($request_method) {
    case 'POST':
        login_user();
        break;

    case 'OPTIONS':
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function login_user(){
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new LoginService();
    $user = new User();
    $user->setLogin($data->login);
    $user->setPassword($data->password);

    $response = $service->login($user);

    header('Content-Type: application/json');
    echo json_encode($response);
}
