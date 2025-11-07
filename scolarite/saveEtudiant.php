<?php
   require_once("securite.php");  
   require_once("RoleScolarite.php"); 
?>
<?php
$nom=$_POST['nom'];
$email=$_POST['email'];
$photo=$_FILES['photo']['name'];
$photoTmp=$_FILES['photo']['tmp_name'];
move_uploaded_file($photoTmp,"./image/".$photo);
echo $photoTmp;
require_once("connexion.php");
$req="INSERT INTO etudiants (NOM,EMAIL,PHOTO) VALUES (?,?,?)";
$ps=$pdo->prepare($req);
$ps->execute(array($nom,$email,$photo));

header("location:etudiants.php");
?>