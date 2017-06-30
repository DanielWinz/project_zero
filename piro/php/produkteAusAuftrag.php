<?php
    
    include("../includes/mdb_lib.inc.php");
	
	$produkteRegale = getProdukteAusBins();
	$produkteOrder = getProdukteInAuftragOhneFach();
	
	$li[0] = $produkteRegale;
	$li[1] = $produkteOrder;
	
	
	echo json_encode($li);

?>