<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $orders;
	global $bins;
	
	$nr = intval($_GET['nr']);
	
	if(isset($_GET['del'])){
		update_status($nr);	
	}
	
	$auftrag = $orders->findOne(
	array("auftragsnummer" => $nr)
	);
	
	$data = array(
			"status" => $auftrag['status'],
			"ablage" => $auftrag["size_id"],
			"contents" => $auftrag["contents"],
			);
			
	$length = sizeof($auftrag["contents"]);
		
	for($a = 0 ; $a < $length ; $a++){
		
		$res = $bins->findOne(
			array('contents' => $auftrag["contents"][intval($a)])
			);
			
		$data["regal"][] = 	$res["bin_id"];
		
			if(isset($_GET['del'])){
				delete_from_one_bin($auftrag["contents"][intval($a)],$res["bin_id"]);
			}
		
	}	

	$output = json_encode($data);
	echo $output;
	
	
?>