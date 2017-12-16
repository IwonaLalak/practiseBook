<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'Grade.php5';


class GradeService
{

    public function getAllGrades()
    {
        $sql = "select * from grades";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function getGradeById($id)
    {
        $sql = "select * from grades, practises where grades.practise_id = practises.practise_id and grades.grade_id=:id";
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

    public function getGradesByLecturer($id)
    {
        $sql = "select * from grades, practises, users where grades.practise_id = practises.practise_id and practises.student_id = users.user_id and grades.lecturer_id=:id";
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

    public function getGradeByPractiseId($id)
    {
        $sql = "select * from grades, practises where grades.practise_id = practises.practise_id and grades.practise_id=:id";
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

    public function addNewGrade($newGrade)
    {

        $sql = "INSERT INTO `grades` (`grade_id`, `practise_id`, `lecturer_id`, `grade_date`, `grade`)
                                VALUES (NULL, :practiseid, :lecturerid, CURRENT_TIMESTAMP, :grade)";

        $con = Connection::getInstance();

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':practiseid', $newGrade->getPractiseId(), PDO::PARAM_INT);
        $stmt->bindParam(':lecturerid', $newGrade->getLecturerId(), PDO::PARAM_INT);
        $stmt->bindParam(':grade', $newGrade->getGrade(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "grade added"];
        } else {
            return [false, "error"];
        }
    }

    public function updateGrade($currentGrade)
    {

        $con = Connection::getInstance();
        $sql = "
                     UPDATE `grades`
                     SET `grade` = :grade
                     WHERE `grades`.`grade_id` =:id
                     ";

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentGrade->getGradeId(), PDO::PARAM_STR);
        $stmt->bindParam(':grade', $currentGrade->getGrade(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "grade updated"];
        } else {
            return [false, "error"];
        }
    }

    public function deleteGrade($id)
    {
        $sql = "DELETE FROM grades WHERE grade_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "grade deleted"];
        } else {
            return [false, "error"];
        }
    }
}