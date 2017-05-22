<?php

 /**
 * @author: Daniel
 * creating a commissioning order by sending the choosen items to the database.
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	if(isset($_POST['ablagefach']))
	$ablagefach = $_POST["ablagefach"];
	
	$contents = array();
	
   		foreach($_POST['product'] as $product) {
			$contents[] = $product;
		}
	
	create_order($ablagefach,0, $contents);
	
	// using header function in order to navigate to the Dashboard
 	header("Location: http://192.168.1.129/project_zero/php/index.php");

?>