<?php
   require_once("securite.php");  
?>
<?php

    $code=$_POST['code'];
    $nom=$_POST['nom'];
    $email=$_POST['email'];
    $photo=$_FILES['photo']['name'];
    $photoTmp=$_FILES['photo']['tmp_name'];
    require_once("connexion.php");

if($photo==""){
        $req="UPDATE etudiants SET NOM=?, EMAIL=?  WHERE code=?";
        $ps=$pdo->prepare($req);
        $ps->execute(array($nom,$email,$code));

    }
else{

        move_uploaded_file($photoTmp,"./image/".$photo);
        echo $photoTmp;
        $req="UPDATE etudiants SET NOM=?, EMAIL=?, PHOTO=?  WHERE code=?";
        $ps=$pdo->prepare($req);
        $ps->execute(array($nom,$email,$photo,$code));
  }


  header("location:etudiants.php");
?>