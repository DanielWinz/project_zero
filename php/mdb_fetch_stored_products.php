<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $bins;
	$count = 0;
	
	// cursor variable is defined by using the find()-method of the collection. Result: cursor with the last 10 results sorted descendent
	$cursor = $bins->find(
	array(),
	array()
	);
	
	$data = array();
	
	//storing cursor values in the just created array, matching keywords to column values		
	foreach ($cursor as $document){
		//tbd
		$data[$count] = $document['contents'];
		$count++;
	}
	
	$output = json_encode($data);
	echo $output;
	
	
?>