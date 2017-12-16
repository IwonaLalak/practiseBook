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

require_once "GradeService.php5";
require_once 'Grade.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['grade_id'])) {
            get_grade(intval($_GET['grade_id']));
        }
        else if(!empty($_GET['lecturer_id'])){
            get_grades_by_lecturer(($_GET['lecturer_id']));
        }
        else if(!empty($_GET['practise_id'])){
            get_grade_by_practise(($_GET['practise_id']));
        }
        else {
            get_grade();
        }
        break;

    case 'POST':
        if (intval($_GET['grade_id']))
            update_grade(intval($_GET['grade_id']));
        else
            insert_grade();
        break;

    case 'PUT':
        if (intval($_GET['grade_id']))
            update_grade(intval($_GET['grade_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        if (intval($_GET['grade_id']))
            delete_grade(intval($_GET['grade_id']));
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_grade($id = 0)
{

    $response = array();
    $service = new GradeService();

    if ($id == 0) {
        $response = $service->getAllGrades();
    } else {
        $data = $service->getGradeById($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_grades_by_lecturer($id)
{
    $response = array();
    $service = new GradeService();
    $response = $service->getGradesByLecturer($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_grade_by_practise($id)
{
    $response = array();
    $service = new GradeService();
    $response = $service->getGradeByPractiseId($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}

function insert_grade()
{
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new GradeService();
    $newGrade = new Grade();

    $newGrade->setPractiseId($data->practise_id);
    $newGrade->setLecturerId($data->lecturer_id);
    $newGrade->setGrade($data->grade);

    $response = $service->addNewGrade($newGrade);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_grade($id)
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new GradeService();
    $currentGrade = new Grade();

    $currentGrade->setGradeId($id);
    $currentGrade->setGrade($data->grade);

    $response = $service->updateGrade($currentGrade);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_grade($id)
{
    $response = array();
    $service = new GradeService();
    $response = $service->deleteGrade($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}