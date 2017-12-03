<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 30.11.17
 * Time: 14:21
 */

class Post{
    private $post_id;
    private $practise_id;
    private $student_id;
    private $post_date_start;
    private $post_date_end;
    private $post_date_add;
    private $post_date_edit;
    private $post_description;

    /**
     * @return mixed
     */
    public function getPostId()
    {
        return $this->post_id;
    }

    /**
     * @param mixed $post_id
     */
    public function setPostId($post_id)
    {
        $this->post_id = $post_id;
    }

    /**
     * @return mixed
     */
    public function getPractiseId()
    {
        return $this->practise_id;
    }

    /**
     * @param mixed $practise_id
     */
    public function setPractiseId($practise_id)
    {
        $this->practise_id = $practise_id;
    }

    /**
     * @return mixed
     */
    public function getStudentId()
    {
        return $this->student_id;
    }

    /**
     * @param mixed $student_id
     */
    public function setStudentId($student_id)
    {
        $this->student_id = $student_id;
    }

    /**
     * @return mixed
     */
    public function getPostDateStart()
    {
        return $this->post_date_start;
    }

    /**
     * @param mixed $post_date_start
     */
    public function setPostDateStart($post_date_start)
    {
        $this->post_date_start = $post_date_start;
    }

    /**
     * @return mixed
     */
    public function getPostDateEnd()
    {
        return $this->post_date_end;
    }

    /**
     * @param mixed $post_date_end
     */
    public function setPostDateEnd($post_date_end)
    {
        $this->post_date_end = $post_date_end;
    }

    /**
     * @return mixed
     */
    public function getPostDateAdd()
    {
        return $this->post_date_add;
    }

    /**
     * @param mixed $post_date_add
     */
    public function setPostDateAdd($post_date_add)
    {
        $this->post_date_add = $post_date_add;
    }

    /**
     * @return mixed
     */
    public function getPostDateEdit()
    {
        return $this->post_date_edit;
    }

    /**
     * @param mixed $post_date_edit
     */
    public function setPostDateEdit($post_date_edit)
    {
        $this->post_date_edit = $post_date_edit;
    }

    /**
     * @return mixed
     */
    public function getPostDescription()
    {
        return $this->post_description;
    }

    /**
     * @param mixed $post_description
     */
    public function setPostDescription($post_description)
    {
        $this->post_description = $post_description;
    }

}