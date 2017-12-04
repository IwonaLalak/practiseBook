<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:17
 */

require_once 'Connection.php5';
require_once 'User.php5';


class LoginService
{
    public function login($user){
        $sql = "select * from users where users.login=:login and users.password=:password";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':login', $user->getLogin(), PDO::PARAM_STR);
        $stmt->bindParam(':password', $user->getPassword(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, $stmt->fetch(PDO::FETCH_ASSOC)];
        } else {
            return [false,'bad login or password'];
        }
    }
}