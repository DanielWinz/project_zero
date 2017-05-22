<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	
	global $bins;
		
	$cursor = $bins->find(
	array(),
	array('sort' => array('bin_id' => 1))
	);
	
	$data = array();

	foreach ($cursor as $document){
		$data[$document['bin_id']] = $document['contents'];
	}
	
	$output = json_encode($data);
	echo $output;
	
?>