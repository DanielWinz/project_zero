<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $test_collection;
	global $bins;
	$count = 0;
	

	$data = array();
	
	$cursor = $test_collection->find();
	
	foreach($cursor as $document){
		
		$result = $bins->findOne(
		array('contents' => $document['name'])
		);
		
		if($result == null)
		array_unshift($data, $document['name']); 
	}
	
	$output = json_encode($data);
	echo $output;
	
	
?>