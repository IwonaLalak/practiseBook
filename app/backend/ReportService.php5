<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'Report.php5';


class ReportService
{

    public function getAllReports()
    {
        $sql = "select * from raports";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function getReportById($id)
    {
        $sql = "select * from raports, practises where raports.practise_id = practises.practise_id and raports.raport_id=:id";
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

    public function getReportsByLeaderId($id)
    {
        $sql = "select * from raports, practises, users where raports.practise_id = practises.practise_id and practises.student_id = users.user_id and raports.leader_id=:id";
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

    public function addNewReport($newReport)
    {

        $sql = "INSERT INTO `raports` (`raport_id`, `practise_id`, `leader_id`, `raport_date`, `raport_grade`, `raport_description`, `radiobox1`, `radiobox2`, `radiobox3`, `radiobox4`, `radiobox5`, `radiobox6`, `radiobox7`)
                                
                                  VALUES (NULL, :practiseid, :leaderid, CURRENT_TIMESTAMP, :grade, :description, :rb1, :rb2, :rb3, :rb4, :rb5, :rb6, :rb7)";

        $con = Connection::getInstance();

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':practiseid', $newReport->getPractiseId(), PDO::PARAM_INT);
        $stmt->bindParam(':leaderid', $newReport->getLeaderId(), PDO::PARAM_INT);
        $stmt->bindParam(':grade', $newReport->getRaportGrade(), PDO::PARAM_STR);
        $stmt->bindParam(':description', $newReport->getRaportDescription(), PDO::PARAM_STR);
        $stmt->bindParam(':rb1', $newReport->getRadiobox1(), PDO::PARAM_INT);
        $stmt->bindParam(':rb2', $newReport->getRadiobox2(), PDO::PARAM_INT);
        $stmt->bindParam(':rb3', $newReport->getRadiobox3(), PDO::PARAM_INT);
        $stmt->bindParam(':rb4', $newReport->getRadiobox4(), PDO::PARAM_INT);
        $stmt->bindParam(':rb5', $newReport->getRadiobox5(), PDO::PARAM_INT);
        $stmt->bindParam(':rb6', $newReport->getRadiobox6(), PDO::PARAM_INT);
        $stmt->bindParam(':rb7', $newReport->getRadiobox7(), PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "report added"];
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