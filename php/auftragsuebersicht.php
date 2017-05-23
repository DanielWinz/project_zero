<?php

   include("../includes/mdb_lib.inc.php");
   
   global $orders;
   global $bins;
   
   $in_queue = $orders->find(array('status' => 0));
   $in_progress = $orders->find(array('status' => 1));
   $in_done = $orders->find(array('status' => 2));
   
   $data = array();
   			 
   foreach($in_queue as $doc){
   	   $data[0]['auftragsnummer'][] = $doc['auftragsnummer'];
	   $data[0]['size_id'][] = $doc['size_id'];
	   $data[0]['contents'][] = $doc['contents'];
	   
	   		foreach($doc['contents'] as $name){
	   			$res = $bins->findOne(array('contents' => $name));
				$data[0]['regal'][] = $res['bin_id'];
	   		}
	    
   }

   foreach($in_progress as $doc){
   	   $data[1]['auftragsnummer'] = $doc['auftragsnummer'];
	   $data[1]['size_id'] = $doc['size_id'];
	   $data[1]['contents'] = $doc['contents'];
	   
	  		foreach($doc['contents'] as $name){
	   			$res = $bins->findOne(array('contents' => $name));
				$data[1]['regal'][] = $res['bin_id'];
	   		}
	    
   }
   
   foreach($in_done as $doc){
   	   $data[2]['auftragsnummer'][] = $doc['auftragsnummer'];
	   $data[2]['size_id'][] = $doc['size_id'];
	   $data[2]['contents'][] = $doc['contents'];
	    
   }
   
   $result = json_encode($data);
   echo $result;
?>