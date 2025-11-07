<?php
   require_once("securite.php");  
   
?>
<?php
require_once("connexion.php");

$req="SELECT * FROM etudiants";
$ps=$pdo->prepare($req);
$ps->execute();
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
    <?php 
    require_once("entete.php") ?>
    <div class="col-md-3 col-xs-12 spacer ">
        <form action="etudiants.php" method="get">
            <div class="form-group">
                <label for="">Mot cle:</label>
                <input type="text" name="motcle" id="" class="form-control" placeholder="Mot cle" value="">
                <button type="submit">Rechercher</button>
            </div>
        </form>

    </div>
    <div class="col-md-12 col-xs-12 ">
        <div class="panel panel-info spacer">
            <div class="panel-heading bnt-success">LISTE DES ETUDIANTS </di>
            <div class="panel-body">
                <table class="table table-striped">
        <thead>
           <tr>
            <th>CODE</th>
            <th>NOM</th>
            <th>EMAIL</th>
            <th>PHOTO</th>
           </tr>
        </thead>
        <tbody>
            <?php while($etudiant=$ps->fetch()){ ?>
           <tr>
            <td><?php echo $etudiant['CODE'] ?></td>
            <td><?php echo $etudiant['NOM'] ?></td>
            <td><?php echo $etudiant['EMAIL'] ?></td>
            <td><img src="image/<?php echo $etudiant['PHOTO'] ?>" width="100" height="100"></td>
            <td><a href="editEtudiant.php?code=<?php echo $etudiant['CODE'] ?>">Edit</a></td>
            <td><a onclick="return confirm('etes vous sure de supprimer ?')" href="deleteEtudiant.php?code=<?php echo $etudiant['CODE'] ?>">Delete</a></td>

           </tr>
           <?php } ?>
        </tbody>
    </table>
            </div>
        </div>
    
            </div>
</body>
</html>