<?php

    function validateName(string $name): bool {

        if(!isset($name) || $name === '') {
            return false;
        }
        return true;
    }

    function cleanPhoneNumber(string $phoneNumber): bool {

        return $cleanNumber = preg_replace('/\D/','', $phoneNumber);
    }

    function isValidBrazilianPhoneNumber(string $cleanNumber): bool {

        if (strlen($cleanNumber) !== 11) {
            return false;
        }

        $startsWithNine = $cleanNumber[2] === '9';

        return true;
    }

    function isValidEmail(string $email) {
       
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    function isPost(): bool {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }

    

?>