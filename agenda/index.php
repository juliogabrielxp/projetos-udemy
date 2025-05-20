<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="app.js"></script>
</head>
<body>
    <main>
        <form id="searchContact" action="research.php">
            <input type="text" placeholder="Pesquisar por nome ou e-mail">
            <button type="submit">Search</button>
        </form>

        <div>
          <button onclick="showContactArea()">
            Add Contact
          </button>
        </div>
        <form id="contactArea" action="contactController.php" method="post">
            <input type="text" placeholder="name" name="name">
            <input type="text" placeholder="numero telefone" name="phoneNumber" >
            <input type="text" placeholder="email" name="email">
            <button type="submit">Send</button>
        </form>
        <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($_SESSION['contacts'] as $contacts => $contact) : ?>
      <tr>
        <td id="name"><?= $contact['name'] ?></td>
        <td id="phoneNumber"><?= $contact['phone_number'] ?></td>
        <td id='email'><?= $contact['email'] ?></td>
        <td><a onclick="edit()">Editar</a></td>
        <td><a href="#">Excluir</a></td>
      </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
    </main>
</body>
</html>