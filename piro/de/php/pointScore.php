<?php
    include ("../includes/mdb_lib.inc.php");
	
	$id = $_GET['id'];
	
	if($id == 1){
		$amount = getItemAmount();
		echo $amount;
	}
	
	if($id == 2){
		$zahl = isNew();
		echo $zahl;
	}
?>