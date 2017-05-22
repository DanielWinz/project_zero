<?php
	/**
	 * This File is for fetching data from the database and filling a pre-defined template
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	global $test_collection;
	global $bins;
	global $picture;
	
	$produktname = $_GET['name'];
	
	// cursor variable is defined by using the find()-method of the collection. Result: cursor with the last 10 results sorted descendent
	$cursor = $test_collection->findOne(
	array("name" => $produktname));
	
	$data = array(
		"auftragsnummer" => $cursor['_id'],
		"produktname" => $produktname,
		"weight" => $cursor['weight'],
		"height" => $cursor["dimensions"][0],
		"width" => $cursor["dimensions"][1],
		"length" => $cursor["dimensions"][2],
		"description" => $cursor['description']);
		
		$result = $bins->findOne(
		array('contents' => $produktname),
		array()
		);
	
	$data['regal'] = $result["bin_id"];
	
		$result2 = $picture->findOne(
		array('name' =>  new \MongoDB\BSON\Regex($produktname,'i')));
		
		$data['bildpfad'] = $result2["pictures"][0];
	
	$output = json_encode($data);
	echo $output;
	
	
?>