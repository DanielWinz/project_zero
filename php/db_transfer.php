<?php

 /**
 * @author: Daniel
 * the content of the order administration/formula is saved to the database, whereas the Dashboard is displayed.
 */

	include("../includes/mdb_lib.inc.php");

	// fetching data from the formular
	$produktname = strtolower($_POST["pn"]);
	$weight = $_POST["weight"];
	$length = $_POST["length"];
	$width = $_POST["width"];
	$height = $_POST["height"];
	$description = $_POST["description"];
	$regal = $_POST["wahlRegal"]-1;
	$bin_id = $_POST["sel_r"];
	$barcode = isset(intval($_POST['barcode']));
	$status = $_GET["s"];
	$decider = isset($_GET["d"]);
	
	error_log("aus transfer: regal" . $regal,0);
	error_log("aus transfer: regalfach" . $bin_id,0);
	error_log("status: " . $status);
	
	
	// using the insert_document function for inserting a document into a collection
	if($status == 0){
		insert_document($test_collection,$produktname,$weight,$length,$width,$height,$barcode,$description);	
		if($bin_id !== 'keines' && $regal !== 'keines')
			update_bin($regal,$bin_id,$produktname);
	}
	
	if($status == 1)
		update_bin($regal,$bin_id, $produktname);
	
	if($status == 1 && $decider == 2){
		delete_from_bin($produktname);
		update_bin($regal,$bin_id, $produktname);
	}
	
	// using header function in order to navigate to the Dashboard
 	//header("Location: http://192.168.1.129/project_zero/html/formular_auftrag.html");

?>