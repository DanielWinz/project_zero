<?php
	/**
	 * Return: Inhalt eines Regalfachs
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	
	global $bins;
	
	$regal = intval($_GET['regal']);
	$regalfach = strval($_GET['regalfach']);

	$cursor = $bins->findOne(
	array('regal' => $regal));
	
	$data = array();
	
	foreach ($cursor[$regalfach] as $name){	
		$data['produkte'][] = $name;
	}
	
	$data['info'] = getRegalSetup();
	
	$output = json_encode($data);
	echo $output;
	
?>