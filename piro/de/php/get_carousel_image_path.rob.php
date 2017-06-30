<?php

   include("../includes/mdb_lib.inc.php");
   
   global $orders;
   global $picture;

		$result = $orders -> find();
		
		foreach($result as $auftrag){
				foreach($auftrag['contents'] as $produkt){
					$res = $picture->findOne(
					array('name' =>  new \MongoDB\BSON\Regex($produkt,'i')));
					
					$data[$produkt][] = $res["pictures"][0];
				}	
		}
		
		echo json_encode($data);
	    
  
?>