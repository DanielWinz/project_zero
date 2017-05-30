<?php

	session_start();
	
    $name = $_POST["name"];
	$pw = $_POST["password"];
	
	if(!isset($name) OR empty($name) OR empty($pw) OR !isset($pw))
   	$name = "Gast";
		
	if( ($name === 'admin@komrob') && ($pw === 'roberto'))
		$_SESSION['username'] = 'admin'; //registrieren der Session
		
	header("Location: http://192.168.1.129/project_zero/html/index.html");
		

?>