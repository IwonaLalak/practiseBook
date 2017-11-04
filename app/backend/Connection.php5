<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:16
 */

require_once "Config.php5";

class Connection
{
    public $handle;
    private static $instance;

    private function __construct()
    {
        $dsn =
            'mysql:host=' . Config::read("db_serv") .
            '; dbname=' . Config::read("db_name") .
            '; charset=' . Config::read("db_charset");

        $user = Config::read("db_user");
        $pass = Config::read("db_pass");

        try {
            $this->handle = new PDO($dsn, $user, $pass);
            $this->handle->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //  echo '<p style="color:green">nazwiano</p>';
        } catch (PDOException $e) {
              echo '<p style="color:red">nie nawiazano' . $e->getMessage().'</p>';
        }

    }

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            $object = __CLASS__;
            self::$instance = new $object;
        }
        return self::$instance;
    }
}