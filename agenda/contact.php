<?php 
class Contact {

    private $id;
    private $name;
    private $phoneNumber;
    private $email;

    public function __set($attribute, $value) {
        $this->$attribute = $value;
    }

    public function __get($attribute) {
        return $this->$attribute;
    }

   
}