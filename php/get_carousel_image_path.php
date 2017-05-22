<?php

   include("../includes/mdb_lib.inc.php");
   
   global $orders;
   global $picture;
   
   $counter = 0;
   $in_progress = $orders->findOne(array('status' => 1));
   
   $data = array();
   			 
   foreach($in_progress['contents'] as $content_order){
   	  	
		$res = $picture->findOne(
		array('name' =>  new \MongoDB\BSON\Regex($content_order,'i')));
	    
		$data[$counter] = $res["pictures"][0];
		$counter++;
   }
   
   $result = json_encode($data);
   echo $result;
?>