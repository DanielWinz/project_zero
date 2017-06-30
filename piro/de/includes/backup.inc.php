<?php

   require ("mongodb/vendor/autoload.php"); 
   $m = new MongoDB\Client();
   
   $m->copyDatabase( "piro", "piro2", "http://192.168.1.129" );
?>