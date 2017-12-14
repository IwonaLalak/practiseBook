<?php
/**
 * Created by IntelliJ IDEA.
 * User: iwona
 * Date: 30.11.17
 * Time: 14:21
 */

class Note
{
    private $note_id;
    private $leader_id;
    private $student_id;
    private $post_id;
    private $note_date;
    private $note_content;

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
    public function getNoteId()
    {
        return $this->note_id;
    }

    /**
     * @param mixed $note_id
     */
    public function setNoteId($note_id)
    {
        $this->note_id = $note_id;
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
    public function getNoteDate()
    {
        return $this->note_date;
    }

    /**
     * @param mixed $note_date
     */
    public function setNoteDate($note_date)
    {
        $this->note_date = $note_date;
    }

    /**
     * @return mixed
     */
    public function getNoteContent()
    {
        return $this->note_content;
    }

    /**
     * @param mixed $note_content
     */
    public function setNoteContent($note_content)
    {
        $this->note_content = $note_content;
    }


}