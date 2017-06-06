<?php

   $data = array();
   
   if(isset($_GET['produkt']))
    error_log("drinnen",0);
   	$data[0] = $_GET['produkt'];
   
   if(isset($_GET['regal']))
   	$data[1] = $_GET['regal'];
   
   if(isset($_GET['produkt']))
   	$data[2] = $_GET['ablage'];
   
   echo json_encode($data);
   
   if(isset($_GET['code']) && intval($_GET['code']) === 1)
   Header("Location: http://192.168.1.129/project_zero/roboterview/html/object_not_detected.rob.html");
?>