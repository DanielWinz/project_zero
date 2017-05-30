<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
		
	$cursor = $orders->find(
	array(),
	array(
	'limit' => 4,
	'sort' => array('_id' => -1))
	);
	
	$data = array(
			"auftragsnummer" => array(),
			"status" => array()
			);
			
	foreach ($cursor as $document){ 			

		$data['auftragsnummer'][] = $document["auftragsnummer"];
		$data['status'][] = $document["status"];
	}
	
	$output = json_encode($data);
	echo $output;
	
?>