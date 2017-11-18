<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 21.10.17
 * Time: 22:49
 */

class Practise{
    private $practise_id;
    private $student_id;
    private $lecturer_id;
    private $leader_id;
    private $company_id;
    private $date_start;
    private $date_end;
    private $total_time;

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
    public function getLeaderId()
    {
        return $this->leader_id;
    }

    /**
     * @param mixed $leader_id
     */
    public function setLeaderId($leader_id)
    {
        $this->leader_id = $leader_id;
    }

    /**
     * @return mixed
     */
    public function getCompanyId()
    {
        return $this->company_id;
    }

    /**
     * @param mixed $company_id
     */
    public function setCompanyId($company_id)
    {
        $this->company_id = $company_id;
    }

    /**
     * @return mixed
     */
    public function getDateStart()
    {
        return $this->date_start;
    }

    /**
     * @param mixed $date_start
     */
    public function setDateStart($date_start)
    {
        $this->date_start = $date_start;
    }

    /**
     * @return mixed
     */
    public function getDateEnd()
    {
        return $this->date_end;
    }

    /**
     * @param mixed $date_end
     */
    public function setDateEnd($date_end)
    {
        $this->date_end = $date_end;
    }

    /**
     * @return mixed
     */
    public function getTotalTime()
    {
        return $this->total_time;
    }

    /**
     * @param mixed $total_time
     */
    public function setTotalTime($total_time)
    {
        $this->total_time = $total_time;
    }

}