<?php
   require_once("securite.php");  
   require_once("RoleScolarite.php"); 
 
?>
<?php
require_once("connexion.php");
$code=$_GET['code'];
$req="SELECT * FROM etudiants WHERE CODE=?";
// preparation de la requete
$ps=$pdo->prepare($req);
$ps->execute(array($code));
// il n'y a qu'un seul etudiant
$etudiant=$ps->fetch(); 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
     <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <?php require_once("entete.php") ?>
    
    <div class=" container col-md-6 col-xs-12 spacer offset-md-3">
        <div class="panel panel-info spacer">
            <div class="panel-heading">SAISIE DES ETUDIANTS </di>
            <div class="panel-body">
                <form method="post" action="UpdateEtudiant.php" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="nom">Code</label>
                        <input type="text" name="code" value="<?php echo($etudiant['CODE'])  ?>" class="form-control" placeholder="Nom" id="nom" hidden>
                    </div>
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <input type="text" name="nom" value="<?php echo($etudiant['NOM'])  ?>" class="form-control" placeholder="Nom" id="nom">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" value="<?php echo($etudiant['EMAIL'])  ?>" class="form-control" placeholder="Email" id="email">
                    </div>
                    <div class="form-group">
                        <label for="photo">Photo</label>
                        <input type="file" name="photo"  class="form-control" placeholder="Photo" id="photo">
                        <img src="image/<?php echo($etudiant['PHOTO'])?> " width="100" height="100"/>
                    </div>
                    <button type="submit" class="btn btn-success">Enregistrer</button>
                </form>
            </div>
        </div>
    
        </div>
</body>
</html>