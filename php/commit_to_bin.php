<?php

 /**
 * @author: Daniel
 * commiting the selected products to the choosen bin for using them when creating an order.
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	if(isset($_POST['shelf']))
	$shelf = $_POST["shelf"];
	
	
   		foreach($_POST['bin'] as $productnames) {
			update_bin($shelf, $productnames);
		}
	
	// using header function in order to navigate to the Dashboard
 	header("Location: http://192.168.1.129/project_zero/html/index.html");

?>