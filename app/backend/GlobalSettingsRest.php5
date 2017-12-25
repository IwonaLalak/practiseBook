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

require_once "GlobalSettingsService.php5";

switch ($request_method) {
    case 'GET':
            get_settings();
        break;

    case 'POST':
        update_settings();
        break;

    case 'PUT':
        break;

    case 'OPTIONS':
        break;

    case 'DELETE':
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_settings()
{
    $response = array();
    $service = new GlobalSettingsService();
    $response = $service->getSettings();

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_settings()
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new GlobalSettingsService();

    $min = $data->min_hour;
    $max = $data->max_hour;

    $response = $service->setSettings($min,$max);

    header('Content-Type: plain/text');
    echo json_encode($response);
}
