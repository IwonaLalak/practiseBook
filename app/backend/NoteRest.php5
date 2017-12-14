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

require_once "NoteService.php5";
require_once 'Note.php5';

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['note_id'])) {
            get_note(intval($_GET['note_id']));
        }
        else if(!empty($_GET['leader_id'])){
            get_note_by_leader(($_GET['leader_id']));
        }
        else if(!empty($_GET['student_id'])){
            get_note_by_student(($_GET['student_id']));
        }
        else {
            get_note();
        }
        break;

    case 'POST':
        if (intval($_GET['note_id']))
            update_note(intval($_GET['note_id']));
        else
            insert_note();
        break;

    case 'PUT':
        if (intval($_GET['note_id']))
            update_note(intval($_GET['note_id']));
        break;

    case 'OPTIONS':

        break;

    case 'DELETE':
        delete_note(intval($_GET['note_id']));
        break;

    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_note($id = 0)
{

    $response = array();
    $service = new NoteService();

    if ($id == 0) {
        $response = $service->getAllNotes();
    } else {
        $data = $service->getNoteById($id);
        if ($data) {
            $response = $data;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_note_by_leader($id)
{
    $response = array();
    $service = new NoteService();
    $response = $service->getNotesByLeaderId($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_note_by_student($id)
{
    $response = array();
    $service = new NoteService();
    $response = $service->getNotesByStudentId($id);
    header('Content-Type: application/json');
    echo json_encode($response);
}



function insert_note()
{
    $data = json_decode(file_get_contents('php://input'));
    $response = array();
    $service = new NoteService();
    $newNote = new Note();

    $newNote->setLeaderId($data->leader_id);
    $newNote->setStudentId($data->student_id);
    $newNote->setPostId($data->post_id);
    $newNote->setNoteContent($data->note_content);

    $response = $service->addNewNote($newNote);

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_note($id)
{
    $data = json_decode(file_get_contents('php://input'));

    $response = array();
    $service = new NoteService();
    $currentNote = new Note();

    $currentNote->setNoteId($id);
    $currentNote->setPostId($data->post_id);
    $currentNote->setNoteContent($data->note_content);


    $response = $service->updateNote($currentNote);

    header('Content-Type: plain/text');
    echo json_encode($response);
}

function delete_note($id)
{
    $response = array();
    $service = new NoteService();
    $response = $service->deleteNote($id);

    header('Content-Type: application/json');
    echo json_encode($response);
}