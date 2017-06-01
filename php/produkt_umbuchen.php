<?php

 /**
 * @author: Daniel
 * Produkt umbuchen
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	if(isset($_POST['neues_regal']))
	$regal = $_POST["neues_regal"];
	
	$regal_id = $_GET['regal'];
	
   	foreach($_POST['product_umbuchen'] as $product) {
			delete_from_one_bin($product,$regal_id);
			update_bin($regal,$product);
	}

?>