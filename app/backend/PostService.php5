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

    public function getPostsByStudentId($id)
    {
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

    public function addNewPost($newPost)
    {

        $sql = "INSERT INTO `posts` (`post_id`, `practise_id`, `student_id`, `post_date_start`, `post_date_end`, `post_date_add`, `post_date_edit`, `post_description`)
                VALUES (NULL, :practiseid, :studentid, :postdatestart, :postdateend, CURRENT_TIMESTAMP, NULL, :postdescription)";
        $con = Connection::getInstance();

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':practiseid', $newPost->getPractiseId(), PDO::PARAM_STR);
        $stmt->bindParam(':studentid', $newPost->getStudentId(), PDO::PARAM_STR);
        $stmt->bindParam(':postdatestart', $newPost->getPostDateStart(), PDO::PARAM_STR);
        $stmt->bindParam(':postdateend', $newPost->getPostDateEnd(), PDO::PARAM_STR);
        $stmt->bindParam(':postdescription', $newPost->getPostDescription(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "post added"];
        } else {
            return [false, "error"];
        }
    }

    public function updatePost($currentPost)
    {

        $con = Connection::getInstance();
        $sql = "
                    UPDATE `posts` 
                    SET `post_date_start` = :postdatestart, `post_date_end` = :postdateend, `post_date_edit` = CURRENT_TIMESTAMP, `post_description` = :postdescription
                    WHERE `posts`.`post_id` =:id
                    ";

        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $currentPost->getPostId(), PDO::PARAM_INT);
        $stmt->bindParam(':postdatestart', $currentPost->getPostDateStart(), PDO::PARAM_STR);
        $stmt->bindParam(':postdateend', $currentPost->getPostDateEnd(), PDO::PARAM_STR);
        $stmt->bindParam(':postdescription', $currentPost->getPostDescription(), PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "post updated"];
        } else {
            return [false, "error"];
        }
    }

    public function deletePost($id)
    {
        $sql = "DELETE FROM posts WHERE post_id=:id";
        $con = Connection::getInstance();
        $stmt = $con->handle->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return [true, "post deleted"];
        } else {
            return [false, "error"];
        }
    }
}