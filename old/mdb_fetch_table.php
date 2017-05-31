<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $test_collection;
	global $bins;
	
	
	// cursor variable is defined by using the find()-method of the collection. Result: cursor with the last 10 results sorted descendent
	$cursor = $test_collection->find(
	array(),
	array(
	'limit' => 10,
	'sort' => array('_id' => -1))
	);
	
	$data = array('auftragsnummer' => array(),
				  'produktname' => array(),
				  'weight' => array(),
				  'height' => array(),
				  'width' => array(),
				  'length' => array(),
				  'regal' => array(),
				  );
	
	//storing cursor values in the just created array, matching keywords to column values		
	foreach ($cursor as $document){ 			
		
		$data['auftragsnummer'][] = $document["_id"];
		$data['produktname'][] = $document["name"];
		$data['weight'][] = $document["weight"];
		$data['height'][] = $document["dimensions"][0];
		$data['width'][] = $document["dimensions"][1];
		$data['length'][] = $document["dimensions"][2];
		
		$result = $bins->findOne(
		array('contents' => $document["name"]),
		array()
		);
		
		$data['regal'][] = $result["bin_id"];
		
	}

	$output = json_encode($data);
	echo $output;
	
	
?>