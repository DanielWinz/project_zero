<?php
	/**
	 * Return: Inhalt eines Regalfachs
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	// Define Query, Save results in an associative array
	
	global $bins;
	
	$regal = strval($_GET['regal']);

	$cursor = $bins->findOne(array('bin_id' => $regal ));
	$data = array();

	foreach ($cursor['contents'] as $name){	
		$data[] = $name;
	}
	
	$output = json_encode($data);
	echo $output;
	
?>