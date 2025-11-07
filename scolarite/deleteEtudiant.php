<?php
   require_once("securite.php");  
   require_once("RoleScolarite.php"); 
?>
<?php
$code=$_GET['code'];
require_once("connexion.php");
$req="DELETE FROM etudiants WHERE CODE=?";
$ps=$pdo->prepare($req);    
$ps->execute(array($code));
header("location:etudiants.php");
?>