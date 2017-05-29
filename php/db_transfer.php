<?php

 /**
 * @author: Daniel
 * the content of the order administration/formula is saved to the database, whereas the Dashboard is displayed.
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular

	$mitarbeiter = $_POST["ma"];
	$produktname = $_POST["pn"];
	$weight = $_POST["weight"];
	$length = $_POST["length"];
	$width = $_POST["width"];
	$height = $_POST["height"];
	$description = $_POST["description"];
	$bin_id = $_POST["sel_r"];
	$status = $_GET["s"];
	$decider = $_GET["d"];
	
	
	// using the insert_document function for inserting a document into a collection
	
	if($status == 0)
	insert_document($test_collection,$mitarbeiter,$produktname,$weight,$length,$width,$height,$description);
	
	if($status != 0 || $decider == 1 )
	update_bin($bin_id, $produktname);
	
	if($status == 1 && $decider == 2){
	delete_from_bin($produktname);
	update_bin($bin_id, $produktname);
	}
	// using header function in order to navigate to the Dashboard
 	header("Location: http://192.168.1.129/project_zero/html/index.html");

?>