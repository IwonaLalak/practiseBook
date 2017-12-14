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
            return false;
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
            return false;
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
            return false;
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
            return false;
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

    public function updateReport($currentReport)
    {

        $con = Connection::getInstance();
        $sql = "
                     UPDATE `raports`
                     SET `raport_grade` = :grade, `raport_description` = :description, `radiobox1` = :rb1, `radiobox2` = :rb2, `radiobox3` = :rb3, `radiobox4` = :rb4, `radiobox5` = :rb5, `radiobox6` = :rb6, `radiobox7` = :rb7
                     WHERE `raports`.`raport_id` =:id
                     ";

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentReport->getRaportId(), PDO::PARAM_INT);
        $stmt->bindParam(':grade', $currentReport->getRaportGrade(), PDO::PARAM_STR);
        $stmt->bindParam(':description', $currentReport->getRaportDescription(), PDO::PARAM_STR);
        $stmt->bindParam(':rb1', $currentReport->getRadiobox1(), PDO::PARAM_INT);
        $stmt->bindParam(':rb2', $currentReport->getRadiobox2(), PDO::PARAM_INT);
        $stmt->bindParam(':rb3', $currentReport->getRadiobox3(), PDO::PARAM_INT);
        $stmt->bindParam(':rb4', $currentReport->getRadiobox4(), PDO::PARAM_INT);
        $stmt->bindParam(':rb5', $currentReport->getRadiobox5(), PDO::PARAM_INT);
        $stmt->bindParam(':rb6', $currentReport->getRadiobox6(), PDO::PARAM_INT);
        $stmt->bindParam(':rb7', $currentReport->getRadiobox7(), PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "report updated"];
        } else {
            return [false, "error"];
        }
    }

    public function deleteReport($id)
    {
        $sql = "DELETE FROM raports WHERE raport_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "report deleted"];
        } else {
            return [false, "error"];
        }
    }
}