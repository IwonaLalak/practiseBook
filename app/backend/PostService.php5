<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'Post.php5';


class PostService
{

    public function getAllPosts()
    {
        $sql = "select * from posts, practises where posts.practise_id = practises.practise_id";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function getPostById($id)
    {
        $sql = "select * from posts, practises where posts.practise_id = practises.practise_id and posts.post_id=:id";
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

    public function getPostsByStudentId($id){
        $sql = "select * from posts, practises where posts.practise_id = practises.practise_id and posts.student_id=:id";
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

    public function addNewCompany($newCompany)
    {
        $sql = "SELECT * from companies WHERE name=:name";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':name', $newCompany->getName(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [false,"company exist"];
        }
        else{
            $sql = "INSERT INTO `companies` (`company_id`, `name`, `brand`, `description`, `email`, `phone`, `city`, `street`, `place`)
                VALUES (NULL, :name, :brand, :description, :email, :phone, :city, :street, :place)";
            $stmt = $con->handle->prepare($sql);
            $stmt->bindParam(':name', $newCompany->getName(), PDO::PARAM_STR);
            $stmt->bindParam(':brand', $newCompany->getBrand(), PDO::PARAM_STR);
            $stmt->bindParam(':description', $newCompany->getDescription(), PDO::PARAM_STR);
            $stmt->bindParam(':email', $newCompany->getEmail(), PDO::PARAM_STR);
            $stmt->bindParam(':phone', $newCompany->getPhone(), PDO::PARAM_STR);
            $stmt->bindParam(':city', $newCompany->getCity(), PDO::PARAM_STR);
            $stmt->bindParam(':street', $newCompany->getStreet(), PDO::PARAM_STR);
            $stmt->bindParam(':place', $newCompany->getPlace(), PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [true,"company added"];
            }
            else{
                return [false,"error"];
            }
        }
    }

    public function updateCompany($currentCompany)
    {
        $sql = "SELECT * from companies WHERE company_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentCompany->getCompanyId(), PDO::PARAM_INT);
        $stmt->execute();
        if (!($stmt->rowCount() > 0)) {
            return [false,"company doesnt exist"];
        }
        else{
            $sql = "
                    UPDATE `companies` 
                    SET `name` = :name, `brand` = :brand, `description` = :description, `email` = :email, 
                        `phone` = :phone, `city` = :city, `street`=:street, `place`=:place
                    WHERE `companies`.`company_id` =:id
                    ";

            $stmt = $con->handle->prepare($sql);
            $stmt->bindParam(':id', $currentCompany->getCompanyId(), PDO::PARAM_INT);
            $stmt->bindParam(':name', $currentCompany->getName(), PDO::PARAM_STR);
            $stmt->bindParam(':brand', $currentCompany->getBrand(), PDO::PARAM_STR);
            $stmt->bindParam(':description', $currentCompany->getDescription(), PDO::PARAM_STR);
            $stmt->bindParam(':email', $currentCompany->getEmail(), PDO::PARAM_STR);
            $stmt->bindParam(':phone', $currentCompany->getPhone(), PDO::PARAM_STR);
            $stmt->bindParam(':city', $currentCompany->getCity(), PDO::PARAM_STR);
            $stmt->bindParam(':street', $currentCompany->getStreet(), PDO::PARAM_STR);
            $stmt->bindParam(':place', $currentCompany->getPlace(), PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [true,"company updated"];
            }
            else{
                return [false,"error"];
            }
        }
    }

    public function deleteCompany($id){
        $sql = "DELETE FROM companies WHERE company_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true,"company deleted"];
        }
        else{
            return [false, "error"];
        }
    }
}