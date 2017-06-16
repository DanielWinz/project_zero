<?php
    
    include ("../includes/mdb_lib.inc.php");
	
	$name = intval($_GET['name']);
	$data = $_GET['data'];
	$regalfach = intval($_GET['rf']);
	
	change_regal($name,$regalfach,$data);
    
?>