<?php

    class Connection {

        private $host = 'localhost';
        private $dbname = 'agenda';
        private $user = 'root';
        private $password = '';

        public function connect() {
            try {
                $connect = new PDO (
                    "mysql:host=$this->host;dbname=$this->dbname;",
                    "$this->user",
                    "$this->password"
                );

                return $connect;
            
            } catch (PDOException $e) {
                echo '<p>'.$e->getMessage().'</p>';
            }
        }
    }

?>