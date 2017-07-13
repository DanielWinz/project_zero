<?php

    include("../includes/mdb_lib.inc.php");
	
	$id = intval($_GET['id']);
	
	if($id == 0){
		resetOrders();
	}
	
	if($id == 1){
		resetBins();
	}
	
	header("Location: http://192.168.1.117/project_zero/piro/en/html/auftragsuebersicht.piro.html");
	
?>