<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'User.php5';


class UserService
{
    public function saySomething()
    {
        echo "something";
    }

    public function getAllUsers()
    {
        $sql = "select * from users";
        $con = Connection::getInstance();
        $stmt = $con->handle->query($sql);
        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    public function getUserById($id)
    {
        $sql = "select * from users where user_id=:id";
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

/*
    public function loginOnAccount($obj){
        $sql = "select user_id, email, user_points from users where login=:login and password=:password";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':login', $obj->getUsername(), PDO::PARAM_STR);
        $stmt->bindParam(':password', $obj->getPassword(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $obj->setUserid($stmt->fetch()["user_id"]);
            $obj->setEmail($stmt->fetch()["email"]);
            $obj->setLastVisit(date("d-m-20y"));
            $obj->setToken($this->generateToken($obj));
            $this->updateLastVisit($obj);

            return true;
        } else {
            return false;
        }
    }

    public function updateLastVisit($obj){
        $sql = "UPDATE `users` SET `last_visit` = CURRENT_TIMESTAMP WHERE `users`.`user_id` = :id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $obj->getUserid() , PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
    }

    public function generateToken($obj){
        $token = base64_encode($obj->getUserid()."/".$obj->getUsername()."/");
        $token = base64_encode($token."/".$obj->getLastVisit());
        return $token;

    }

    public function decodeToken($token){
        $decoded =  base64_decode(substr(base64_decode($token),0,(strlen(base64_decode($token)))-11));
        echo $decoded."                          ";
        $array = explode("/",$decoded);
        echo $array[0].' '.$array[1];
        // TODO: return data

    }

    public function checkIfUserExist($obj)
    {
        $sql = "select * from users where login=:login";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':login', $obj->getUsername(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function register($obj)
    {
        $sql = "INSERT INTO `users` (`user_id`, `login`, `password`, `email`, `avatar_url`, `native_lang`, `foreign_lang`, `last_visit`, `user_points`)
                VALUES (NULL, :login, :password, :email, '/images/default_avatar.jpg', 'polish', 'english', CURRENT_TIMESTAMP, '0')";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':login', $obj->getUsername(), PDO::PARAM_STR);
        $stmt->bindParam(':password', $obj->getPassword(), PDO::PARAM_STR);
        $stmt->bindParam(':email', $obj->getEmail(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
    }

    public
    function updatePassword($id, $password)
    {
        $sql = "UPDATE `users` SET `password` = :password WHERE `users`.`user_id` = :id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
    }*/


}