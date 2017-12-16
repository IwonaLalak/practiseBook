<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 30.11.17
 * Time: 14:21
 */

class Grade
{
    private $grade_id;
    private $practise_id;
    private $lecturer_id;
    private $grade_date;
    private $grade;

    /**
     * @return mixed
     */
    public function getGradeId()
    {
        return $this->grade_id;
    }

    /**
     * @param mixed $grade_id
     */
    public function setGradeId($grade_id)
    {
        $this->grade_id = $grade_id;
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
    public function getLecturerId()
    {
        return $this->lecturer_id;
    }

    /**
     * @param mixed $lecturer_id
     */
    public function setLecturerId($lecturer_id)
    {
        $this->lecturer_id = $lecturer_id;
    }

    /**
     * @return mixed
     */
    public function getGradeDate()
    {
        return $this->grade_date;
    }

    /**
     * @param mixed $grade_date
     */
    public function setGradeDate($grade_date)
    {
        $this->grade_date = $grade_date;
    }

    /**
     * @return mixed
     */
    public function getGrade()
    {
        return $this->grade;
    }

    /**
     * @param mixed $grade
     */
    public function setGrade($grade)
    {
        $this->grade = $grade;
    }


}