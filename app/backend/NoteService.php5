<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'Note.php5';


class NoteService
{

    public function getAllNotes()
    {
        $sql = "select * from notes";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }

    public function getNoteById($id)
    {
        $sql = "select * from notes, posts, users where notes.post_id = posts.post_id and users.user_id = notes.leader_id and notes.note_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }

    public function getNotesByLeaderId($id)
    {
        $sql = "select * from notes, posts, users where notes.post_id = posts.post_id and users.user_id = posts.student_id and notes.leader_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }

    public function getNotesByStudentId($id)
    {
        $sql = "select * from notes where notes.student_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return [];
        }
    }

    public function addNewNote($newNote)
    {

        $sql = "INSERT INTO `notes` (`note_id`, `leader_id`, `student_id`, `post_id`, `note_date`, `note_content`)
                                VALUES (NULL, :leaderid, :studentid, :postid, CURRENT_TIMESTAMP, :notecontent)";

        $con = Connection::getInstance();

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':leaderid', $newNote->getLeaderId(), PDO::PARAM_INT);
        $stmt->bindParam(':studentid', $newNote->getStudentId(), PDO::PARAM_INT);
        $stmt->bindParam(':postid', $newNote->getPostId(), PDO::PARAM_INT);
        $stmt->bindParam(':notecontent', $newNote->getNoteContent(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "note added"];
        } else {
            return [false, "error"];
        }
    }

    public function updateNote($currentNote)
    {

        $con = Connection::getInstance();
        $sql = "
                     UPDATE `notes`
                     SET `post_id` = :postid, `note_content` = :notecontent
                     WHERE `notes`.`note_id` =:id
                     ";

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentNote->getNoteId(), PDO::PARAM_INT);
        $stmt->bindParam(':postid', $currentNote->getPostId(), PDO::PARAM_INT);
        $stmt->bindParam(':notecontent', $currentNote->getNoteContent(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "note updated"];
        } else {
            return [false, "error"];
        }
    }

    public function deleteNote($id)
    {
        $sql = "DELETE FROM notes WHERE note_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "note deleted"];
        } else {
            return [false, "error"];
        }
    }
}