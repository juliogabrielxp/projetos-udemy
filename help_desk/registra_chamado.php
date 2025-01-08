<?php

    session_start();

    $arquivo = fopen('../../help_desk/arquivo.txt', 'a');

    $resultado = array();

    foreach($_POST as $itens) {
        $resultado[] = str_replace('#', '-', $itens);
    }

    $resultado = array_merge([$_SESSION['id']], $resultado);
    $texto = implode('#', $resultado).PHP_EOL;

    fwrite($arquivo, $texto);

    fclose($arquivo);

    header('Location: abrir_chamado.php');

?>