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
		
		$data[$document['bin_id']]['produkt'] = $document['contents'];
		
		foreach($document['contents'] as $name){
				
			$res = $picture->findOne(
			array('name' =>  new \MongoDB\BSON\Regex($name,'i')));
			$data[$document['bin_id']]['bildpfad'][] = $res["pictures"][0];
		
		}
		
	}
	
	
	$output = json_encode($data);
	echo $output;
	
?>