<?php

 /**
 * @author: Daniel
 * commiting the selected products to the choosen bin for using them when creating an order.
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	if(isset($_POST['regalnummer']) && isset($_POST['regalfach'])){
		$regal = $_POST["regalnummer"]-1;
		$regalfach = $_POST["regalfach"];	
	}
	
   		foreach($_POST['produktnamen'] as $productnames) {
   			error_log("in foreach-Schleife",0);
			update_bin($regal, $regalfach, $productnames);
		}
	
	// using header function in order to navigate to the Dashboard
 	header("Location: http://192.168.1.129/project_zero/html/index.html");

?>