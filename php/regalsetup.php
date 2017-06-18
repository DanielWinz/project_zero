<?php
    include("../includes/mdb_lib.inc.php");
	
	global $bins;
	
	$id = intval($_GET['id']);
	$info['info'] = getRegalSetup();
	$info['regal'] = getEinRegal($id); 
	error_log($info,0);
	echo json_encode($info);
?>