<?php
   require_once("securite.php");  
?>

<?php
try{
    $strconnexion = 'mysql:host=localhost; dbname=scolarite';
    $pdo = new PDO ($strconnexion , 'root','');
 }
catch (PDOException $e){
    $msg ="ERREUR DE CONNEXION : " . $e->getMessage();
    die($msg);
    }

?>