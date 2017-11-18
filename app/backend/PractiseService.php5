<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'Practise.php5';


class PractiseService
{

    public function getAllPractises()
    {
        $practises = null;
        $lecturers = null;
        $leaders = null;
        $students = null;

        $sql = "select * from practises, companies where practises.company_id=companies.company_id";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            $practises = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // getting lecturers
        $sql = "select * from practises, users where practises.lecturer_id = users.user_id";
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            $lecturers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // getting students
        $sql = "select * from practises, users where practises.student_id = users.user_id";
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        //getting leaders
        $sql = "select * from practises, users where practises.leader_id = users.user_id";
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            $leaders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        if($practises != null)
            return array("practises" => $practises, "lecturers" => $lecturers, "leaders" => $leaders, "students" => $students);
        else
            return array(false, "error, cannot get data");
    }

    public function getPractise($id)
    {
        $practise = null;
        $lecturer = null;
        $leader = null;
        $student = null;

        $sql = "select * from practises, companies where practises.practise_id=:id and practises.company_id=companies.company_id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $practise = $stmt->fetch(PDO::FETCH_ASSOC);
        }

       $sql = "select firstname, lastname, login, phone, email from practises, users where practises.practise_id=:id and practises.lecturer_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $lecturer = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        $sql = "select firstname, lastname, login, phone, email, users.company_id from practises, users where practises.practise_id=:id and practises.leader_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $leader = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        $sql = "select firstname, lastname, login, phone, email, study, semester from practises, users where practises.practise_id=:id and practises.student_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $student = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        if($practise != null && $lecturer != null && $leader != null && $student != null)
            return array("practise" => $practise, "lecturer" => $lecturer, "leader" => $leader, "student" => $student);
        else
           return array(false, "error, cannot get data");

    }

    public function getPractiseByUserType($usertype,$id){
        $practises = null;
        $lecturers = null;
        $leaders = null;
        $students = null;

        // getting practise with company
        $sql = "select * from practises, companies where practises.".$usertype."=:id and practises.company_id=companies.company_id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $practises = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        // getting student
        $sql = "select user_id, firstname, lastname, login, phone, email from practises, users where practises.".$usertype."=:id and practises.student_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // getting lecturer

        $sql = "select user_id, firstname, lastname, login, phone, email from practises, users where practises.".$usertype."=:id and practises.lecturer_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $lecturers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        // getting leader
        $sql = "select user_id, firstname, lastname, login, phone, email from practises, users where practises.".$usertype."=:id and practises.leader_id=users.user_id";
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $leaders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        if($practises != null){
            return array("practises" => $practises, "students" => $students, "lecturers" =>$lecturers, "leaders" => $leaders);
        }else{
            return array(false, "error, cannot get data");
        }

    }

    public function addNewPractise($newPractise)
    {

        // TODO: brak zabezpieczen zwiazanych czy dana osoba ma status studenta, prowadzacego albo czy dana firma istnieje itd

        $sql = "INSERT INTO `practises` (`practise_id`, `student_id`, `lecturer_id`, `leader_id`, `company_id`, `date_start`, `date_end`, `total_time`) 
                VALUES (NULL, :student_id, :lecturer_id, :leader_id, :company_id, :date_start, :date_end, :total)";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':student_id', $newPractise->getStudentId(), PDO::PARAM_STR);
        $stmt->bindParam(':lecturer_id', $newPractise->getLecturerId(), PDO::PARAM_STR);
        $stmt->bindParam(':leader_id', $newPractise->getLeaderId(), PDO::PARAM_STR);
        $stmt->bindParam(':company_id', $newPractise->getCompanyId(), PDO::PARAM_STR);
        $stmt->bindParam(':date_start', $newPractise->getDateStart(), PDO::PARAM_STR);
        $stmt->bindParam(':date_end', $newPractise->getDateEnd(), PDO::PARAM_STR);
        $stmt->bindParam(':total', $newPractise->getTotalTime(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "practise added"];
        } else {
            return [false, "error"];
        }
    }

    public function updateUser($currentUser)
    {
        $sql = "SELECT * from users WHERE user_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentUser->getUserId(), PDO::PARAM_INT);
        $stmt->execute();
        if (!($stmt->rowCount() > 0)) {
            return [false, "user doesnt exist"];
        } else {
            $sql = "
                    UPDATE `users` 
                    SET `login` = :login, `password` = :password, `firstname` = :firstname, `lastname` = :lastname, 
                        `email` = :email, `phone` = :phone, `group_id`=:group_id, `study`=:study, `semester`=:semester, `company_id`=:company_id
                    WHERE `users`.`user_id` =:id
                    ";

            $stmt = $con->handle->prepare($sql);
            $stmt->bindParam(':id', $currentUser->getUserId(), PDO::PARAM_INT);
            $stmt->bindParam(':login', $currentUser->getLogin(), PDO::PARAM_STR);
            $stmt->bindParam(':password', $currentUser->getPassword(), PDO::PARAM_STR);
            $stmt->bindParam(':group_id', $currentUser->getGroupId(), PDO::PARAM_STR);
            $stmt->bindParam(':firstname', $currentUser->getFirstname(), PDO::PARAM_STR);
            $stmt->bindParam(':lastname', $currentUser->getLastname(), PDO::PARAM_STR);
            $stmt->bindParam(':email', $currentUser->getEmail(), PDO::PARAM_STR);
            $stmt->bindParam(':phone', $currentUser->getPhone(), PDO::PARAM_STR);
            $stmt->bindParam(':study', $currentUser->getStudy(), PDO::PARAM_STR);
            $stmt->bindParam(':semester', $currentUser->getSemester(), PDO::PARAM_STR);
            $stmt->bindParam(':company_id', $currentUser->getCompanyId(), PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [true, "user updated"];
            } else {
                return [false, "error"];
            }
        }
    }

    public function deletePractise($id)
    {
        $sql = "DELETE FROM practises WHERE practise_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "practise deleted"];
        } else {
            return [false, "error"];
        }
    }
}