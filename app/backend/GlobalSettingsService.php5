<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';


class GlobalSettingsService
{

    public function getSettings()
    {
        $sql = "select * from settings";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function setSettings($min,$max)
    {

        $con = Connection::getInstance();
        $sql = "
                    UPDATE `settings` 
                    SET `min_hour` = :mintime, `max_hour` = :maxtime";

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':mintime', $min, PDO::PARAM_STR);
        $stmt->bindParam(':maxtime', $max, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "settings updated"];
        } else {
            return [false, "error"];
        }
    }

}