<?php
    require_once('connexion.php');
    $username=$_POST['login'];
    $password=md5($_POST['password']);
    $ps=$pdo->prepare("SELECT * FROM users WHERE LOGIN=? AND PASSWORD=?");
    $req=array($username,$password);
    $ps->execute($req);
    if($user=$ps->fetch()){
        session_start();
        $_SESSION['PROFILE']=$user;

        header("location:etudiants.php");
    }else{
        header("location:login.php?error=true");

    }

    
?>