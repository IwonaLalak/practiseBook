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

require_once "ReportService.php5";
require_once 'Report.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['report_id'])) {
            get_report(intval($_GET['report_id']));
        }
        else if(!empty($_GET['leader_id'])){
            get_report_by_leader(($_GET['leader_id']));
        }
        else {
            get_report();
        }
        break;

    case 'POST':
        if (intval($_GET['report_id']))
            update_report(intval($_GET['report_id']));
        else
            insert_report();
        break;

    case 'PUT':
        if (intval($_GET['report_id']))
            update_report(intval($_GET['report_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        $post_id = intval($_GET['report_id']);
        delete_report($post_id);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_report($id = 0)
{

    $response = array();
    $service = new ReportService();

    if ($id == 0) {
        $response = $service->getAllReports();
    } else {
        $data = $service->getReportById($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_report_by_leader($id)
{
    $response = array();
    $service = new ReportService();
    $response = $service->getReportsByLeaderId($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}



function insert_report()
{
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new ReportService();
    $newReport = new Report();

    $newReport->setPractiseId($data->practise_id);
    $newReport->setLeaderId($data->leader_id);
    $newReport->setRaportGrade($data->raport_grade);
    $newReport->setRaportDescription($data->raport_description);
    $newReport->setRadiobox1($data->radiobox1);
    $newReport->setRadiobox2($data->radiobox2);
    $newReport->setRadiobox3($data->radiobox3);
    $newReport->setRadiobox4($data->radiobox4);
    $newReport->setRadiobox5($data->radiobox5);
    $newReport->setRadiobox6($data->radiobox6);
    $newReport->setRadiobox7($data->radiobox7);

    $response = $service->addNewReport($newReport);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_report($id)
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new ReportService();
    $currentReport = new Report();

    $currentReport->setRaportId($id);
    $currentReport->setRaportGrade($data->raport_grade);
    $currentReport->setRaportDescription($data->raport_description);
    $currentReport->setRadiobox1($data->radiobox1);
    $currentReport->setRadiobox2($data->radiobox2);
    $currentReport->setRadiobox3($data->radiobox3);
    $currentReport->setRadiobox4($data->radiobox4);
    $currentReport->setRadiobox5($data->radiobox5);
    $currentReport->setRadiobox6($data->radiobox6);
    $currentReport->setRadiobox7($data->radiobox7);

    $response = $service->updateReport($currentReport);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_report($id)
{
    $response = array();
    $service = new ReportService();
    $response = $service->deleteReport($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}