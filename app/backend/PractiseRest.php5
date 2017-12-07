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

require_once "PractiseService.php5";
require_once 'Practise.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['practise_id'])) {
            $id = intval($_GET['practise_id']);
            get_practises($id);
        } else if (!empty($_GET['student_id'])) {
            $id = intval($_GET['student_id']);
            get_practises_by_user("student_id", $id);
        } else if (!empty($_GET['lecturer_id'])) {
            $id = intval($_GET['lecturer_id']);
            get_practises_by_user("lecturer_id", $id);
        } else if (!empty($_GET['leader_id'])) {
            $id = intval($_GET['leader_id']);
            get_practises_by_user("leader_id", $id);
        } else {
            get_practises();
        }
        break;

    case 'POST':
        insert_practise();
        break;

    case 'PUT':
        if (intval($_GET['practise_id']))
            update_practise(intval($_GET['practise_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        $id = intval($_GET['practise_id']);
        delete_practise($id);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_practises($id = 0)
{
    $response = array();
    $service = new PractiseService();

    if ($id == 0) {
        $response = $service->getAllPractises();
    } else {
        $data = $service->getPractise($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_practise_by_student($id)
{
    $response = array();
    $service = new PractiseService();

    $response = $service->getPractiseByStudent($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_practises_by_user($user, $id)
{
    $response = array();
    $service = new PractiseService();

    $response = $service->getPractiseByUserType($user, $id);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function insert_practise()
{
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new PractiseService();
    $newPractise = new Practise();

    $newPractise->setStudentId($data->student_id);
    $newPractise->setLecturerId($data->lecturer_id);
    $newPractise->setLeaderId($data->leader_id);
    $newPractise->setCompanyId($data->company_id);
    $newPractise->setDateStart($data->date_start);
    $newPractise->setDateEnd($data->date_end);
    $newPractise->setTotalTime($data->total_time);

    $response = $service->addNewPractise($newPractise);


    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_practise($id)
{

    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new PractiseService();
    $currentPractise = new Practise();

    $currentPractise->setPractiseId($id);
    $currentPractise->setLeaderId($data->leader_id);
    $currentPractise->setCompanyId($data->company_id);
    $currentPractise->setDateStart($data->date_start);
    $currentPractise->setDateEnd($data->date_end);
    $currentPractise->setTotalTime($data->total_time);

    $response = $service->updatePractise($currentPractise);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_practise($id)
{
    $response = array();
    $service = new PractiseService();
    $response = $service->deletePractise($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}
