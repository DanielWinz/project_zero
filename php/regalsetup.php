<?php
    include("../includes/mdb_lib.inc.php");
	
	global $bins;
	
	$id = intval($_GET['id']);
	$info['info'] = getRegalSetup();
	$info['regal'] = getEinRegal($id);
	$info['produkte'] = getProdukteInRegalen();
	
	for($a = 0; $a < $info['regal']['anzahl'] ; $a++){
		foreach($info['regal'][chr(65+$a)] as $name){

			$res = $picture->findOne(
			array('name' =>  new \MongoDB\BSON\Regex($name,'i')));
			
			$info['bildpfad'][chr(65+$a)][] = $res["pictures"][0];
			
		}
	}
		 
	error_log($info,0);
	echo json_encode($info);
?>