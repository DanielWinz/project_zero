<?php
      
      require ("mongodb/vendor/autoload.php"); 
   
 
   // connect to mongodb
       $m = new MongoDB\Client();
	   
	   
   // create daniels database
       $db = $m->piro2;
	   
   // create collections   
	   $collection = $db->counters;
	   $orders = $db -> orders;
	   $bins = $db ->bins;
	   
   // create empty collections
	   create_counter();
   
   function create_bin(){
   	
	for($x = "A"; $x <= "F"; $x++){
		
	global $bins;
			
	$document = array(
   	"bin_id" => $x,
   	"contents" => array()
	);
	
	$bins -> insertOne($document);
    }
   }
   
   function create_counter(){
   	global $collection;
	
	$document = array(
	"_id" => "productid",
	"sequence_value" => 0
	);
	
	$collection ->insertOne($document);
	
	$document = array(
	"_id" => "auftragsid",
	"sequence_value" => 0
	);
	
	$collection -> insertOne($document);
   }
   
?>