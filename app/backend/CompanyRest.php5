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

require_once "CompanyService.php5";
require_once 'Company.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['company_id'])) {
            $company_id = intval($_GET['company_id']);
            get_companies($company_id);
        } else {
            get_companies();
        }
        break;

    case 'POST':
        if (intval($_GET['company_id']))
            update_company(intval($_GET['company_id']));
        else
            insert_company();
        break;

    case 'PUT':
        if (intval($_GET['company_id']))
            update_company(intval($_GET['company_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        $company_id = intval($_GET['company_id']);
        delete_company($company_id);
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_companies($id = 0){



    $response = array();
    $service = new CompanyService();

    if($id == 0){
        $response = $service->getAllCompanies();
    }
    else{
        $data = $service->getCompanyById($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function insert_company(){
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new CompanyService();
    $newCompany = new Company();
    $newCompany->setName($data->name);
    $newCompany->setBrand($data->brand);
    $newCompany->setEmail($data->email);
    $newCompany->setPhone($data->phone);
    $newCompany->setCity($data->city);
    $newCompany->setStreet($data->street);
    $newCompany->setPlace($data->place);
    $newCompany->setDescription($data->description);

    $response = $service->addNewCompany($newCompany);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_company($id)
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new CompanyService();
    $currentCompany = new Company();
    $currentCompany->setCompanyId($id);
    $currentCompany->setName($data->name);
    $currentCompany->setBrand($data->brand);
    $currentCompany->setDescription($data->description);
    $currentCompany->setEmail($data->email);
    $currentCompany->setPhone($data->phone);
    $currentCompany->setCity($data->city);
    $currentCompany->setStreet($data->street);
    $currentCompany->setPlace($data->place);

    $response = $service->updateCompany($currentCompany);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_company($id)
{
    $response = array();
    $service = new CompanyService();
    $response = $service->deleteCompany($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}