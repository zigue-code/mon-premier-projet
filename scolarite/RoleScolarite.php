  <?php
  if(!($_SESSION['PROFILE']['ROLE']=="SCOLARITE"))
   {
       header("location:$_SERVER[HTTP_REFERER]");
   }
   ?>