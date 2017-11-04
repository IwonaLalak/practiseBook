<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 01.11.17
 * Time: 16:15
 */

class Config
{
    static $data;

    public static function read($name)
    {
        return self::$data[$name];
    }

    public static function write($name, $value)
    {
        self::$data[$name] = $value;
    }

}

Config::write("db_serv", "localhost");
Config::write("db_user", "root");
Config::write("db_pass", "7911");
Config::write("db_name", "practisebook");
Config::write("db_charset", "utf8");