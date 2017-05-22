<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $test_collection;
	
	// cursor variable is defined by using the find()-method of the collection. Result: cursor with the last 10 results sorted descendent
	$cursor = $test_collection->find(
	array()
	);
	
	$data = array('produktname' => array(),
				  'regal' => array(),
				  );
	
	//storing cursor values in the just created array, matching keywords to column values		
	foreach ($cursor as $document){ 			

		$data['produktname'][] = $document["name"];
		$result = $bins->findOne(
		array('contents' => $document["name"]),
		array()
		);
		
		$data['regal'][] = $result["bin_id"];
		
	}

	$output = json_encode($data);
	echo $output;
	
	
?>