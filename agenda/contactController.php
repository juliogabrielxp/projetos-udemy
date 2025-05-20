<?php 
    require_once 'contact.php';
    require_once 'connection.php';
    require_once 'contactService.php';
    require_once 'validator.php';

    session_start();
    
    /*$name = trim($_POST['name'] ?? '');
    $phoneNumber = trim($_POST['phoneNumber'] ?? '');
    $email = trim($_POST['email'] ?? '');  */
    

    $connection = new Connection();

    $contact = new Contact();

    
    $contact->__set('name', $_POST['name']);
    $contact->__set('phoneNumber',  $_POST['phoneNumber']);
    $contact->__set('email', $_POST['email']);

    $contactService = new ContactService($connection, $contact);


    
   $contactService->addContact();

    header('Location: index.php');

    $contacts = $contactService->recoverAllContacts();

    $_SESSION['contacts'] = [];

    $_SESSION['contacts'] = $contacts;

    
?>