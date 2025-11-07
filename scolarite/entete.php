
     <div class="nav navbar-fixed-top navbar navbar-dark bg-dark">
        <ul class="nav">
            <li class=" nav-item "><a class="nav-link Etudiant" href="etudiants.php">Etudiants</a></li>
            <li class=" nav-item "><a class="nav-link Saisie" href="saisieEtudiant.php">Saisie</a></li>
            <li class=" nav-item "><a class="nav-link logOut" href="logOut.php"> logOut[<?php echo((isset($_SESSION['PROFILE']))?($_SESSION['PROFILE']['LOGIN']):"") ?>] </a> </li>
        </ul>
    </div>
 
  
   