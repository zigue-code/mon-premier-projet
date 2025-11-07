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
    <div class=" containercol-md-6 col-xs-12 spacer offset-md-3">
        <div class="panel panel-info spacer">
            <div class="panel-heading">Authentification </di>
            <div class="panel-body">
                <form method="post" action="Authentifier.php" >
                    <div class="form-group">
                        <label for="nom">LOGIN</label>
                        <input type="text" name="login" class="form-control" placeholder="LOGIN" id="login">
                    </div>
                    <div class="form-group">
                        <label for="email">PASSWORD</label>
                        <input type="password" name="password" class="form-control" placeholder="Password" id="pwd">
                    </div>
                    
                    <button type="submit" class="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    
        </div>
</body>
</html>