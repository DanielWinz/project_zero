<?php

 /**
 * @author: Daniel
 * Produkt umbuchen
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	if(isset($_POST['regnummer']) && isset($_POST['regfach'])){
		$regal_neu = ($_POST["regnummer"]-1);
		$regfach_neu = ($_POST["regfach"]);	
	}
	
	
	$regal_alt = $_GET['regal'];
	$regfach_alt = $_GET['regalfach'];
	
	error_log("regal neu" . $regal_neu,0);
	error_log("regalfach neu" . $regfach_neu,0);
	error_log("regal alt" . $regal_alt,0);
	error_log("regalfach_alt" . $regfach_alt,0);
	
   	foreach($_POST['product_umbuchen'] as $product) {
			delete_from_one_bin($regal_alt,$regfach_alt,$product);
			update_bin($regal_neu,$regfach_neu,$product);
	}

?>