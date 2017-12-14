<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:18
 */

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

$request_method = $_SERVER["REQUEST_METHOD"];

require_once "StudentsService.php5";

switch ($request_method) {
    case 'GET':
        /*if(!empty($_GET['student_id'])) {
            get_all_student_data(intval($_GET['student_id']));
        }
        else */
        if (!empty($_GET['lecturer_id'])) {
            get_students_by_lecturer(intval($_GET['lecturer_id']));
        }
        else if(!empty($_GET['leader_id'])){
            get_students_by_leader(($_GET['leader_id']));
        }
        else {
            get_students();
        }
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_all_student_data($id){

}

function get_students()
{

    $response = array();
    $service = new StudentsService();

    $response = $service->getAllStudents();

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_students_by_lecturer($id)
{
    $response = array();
    $service = new StudentsService();
    $response = $service->getAllStudentsByLecturer($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_students_by_leader($id)
{
    $response = array();
    $service = new StudentsService();
    $response = $service->getAllStudentsByLeader($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}
