<?php
    /**
	 * This File is for validating if the productname is already stored in database
	 */
	 
	include ("../includes/mdb_lib.inc.php");
	
	

	$pn = $_GET['name'];
	
	//check if document is found, where produktname = entered produktname
	$cursor = $test_collection->findOne(
	array('name' => $pn),
	array()
	);
	
	//falls der Cursor Null ist, wurde der Produktname nicht in der DB gefunden oder nicht korrekt geschrieben
	if($cursor == null){
		echo json_encode(0);
	}
	
	// falls Produkt gefunden wurde, schaue, ob Produkt bereits in einem bin liegt
	else{

		$result = $bins->findOne(
		array('contents' => $pn),
		array()
		);
		
			if ($result == null){ //Produkt wurde zwar gefunden, ist aber noch keinem Regal/Bin zugeordnet
			echo json_encode(1);
			}
			
			else
			echo json_encode(2);
			
	}

?>