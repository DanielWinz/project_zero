<?php
    
    include ("../includes/mdb_lib.inc.php");
	
	$name = $_GET['name'];
	$data = $_GET['data'];
	
	echo $name . $data;
    
?>