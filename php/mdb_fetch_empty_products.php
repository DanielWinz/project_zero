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
	
	$cursor = $test_collection->find(
	array(),
	array(
	'sort' => array('name' => -1))
	);
	
	foreach($cursor as $document){
		
		$list = getProdukteInRegalen();
		if(!(in_array($document['name'], $list)))
			array_unshift($data, $document['name']); 
	}
	
	$info = getRegalSetup();
	$data['info'] = $info;
	
	$output = json_encode($data);
	echo $output;
	
	
?>