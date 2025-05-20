<?php

    class ContactService {

        private $connection;
        private $contact;

        public function __construct(Connection $connection, Contact $contact) {
            $this->connection = $connection->connect();
            $this->contact = $contact;
        }

        public function addContact() {
            $query = '
                INSERT INTO 
                    `contatos`( name, `phone_number`, `email`)
                VALUES (:name, :phoneNumber, :email)
            ';

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':name', $this->contact->__get('name'));
            $stmt->bindValue(':phoneNumber', $this->contact->__get('phoneNumber'));
            $stmt->bindValue(':email', $this->contact->__get('email'));
            $stmt->execute();
        }

        public function recoverAllContacts() {
            $query = '
                SELECT * FROM contatos
            ';

            $stmt = $this->connection->prepare($query);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function updateContact() {
            $query = '
                UPDATE 
                    `contatos` 
                SET 
                    name=:name, phone_number =:phone_number, email=:email
                WHERE 
                    id = :id
            ';

            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':name', $this->__get());
            $stmt->bindValue(':phone_number', $this->__get());
            $stmt->bindValue(':email', $this->__get());
            $stmt->bindValue(':id', $this->__get());
            return $stmt->execute();
        }
    }

?>