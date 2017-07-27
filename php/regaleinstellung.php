<?php
    
    include ("../includes/mdb_lib.inc.php");
	$id = intval($_GET['id']);
	$name = intval($_GET['name']);
	$data = $_GET['data'];
	$regalfach = intval($_GET['rf']);
	
	error_log($id,0);
	if($id == 0)
	deleteRegalSettings();
	
	if($id == 1)
	change_regal($name,$regalfach,$data);
    
?>