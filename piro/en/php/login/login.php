<?php

	session_start();
	
    $name = $_POST["name"];
	$pw = $_POST["password"];
	$modus = $_POST["modus"];
	
	if(!isset($name) OR empty($name) OR empty($pw) OR !isset($pw))
   	$name = "Gast";
	
		
	if( ($name === 'admin@komrob') && ($pw === 'roberto'))
		$_SESSION['username'] = 'admin'; //registrieren der Session
	
	error_log($modus,0);
	if(isset($modus) && $modus === 'roboter'){
		$_SESSION['modus'] = 'roboter';
	}
	error_log("Im MODUS" . $modus,0);
	if(isset($modus) && $modus === 'piro'){
		$_SESSION['modus'] = 'piro';
	}
		
	header("Location: http://192.168.1.117/project_zero/html/index.html");
		

?>