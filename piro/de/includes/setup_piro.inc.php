<?php
      
      require ("mongodb/vendor/autoload.php"); 
   
 
   // connect to mongodb
       $m = new MongoDB\Client();
	   
	   
   // create daniels database
       $db = $m->piro_test;
	   
   // create collections   
	   $collection = $db->counters;
	   $orders = $db -> piro_orders;
	   $bins = $db ->bins;
	   
   // create empty collections
	   create_orders();
	   create_counter();
   
   function create_orders(){
   	global $orders;
   	$document1 = array(
	"size_id" => "A1",
	"contents" => array());
	
	$document2 = array(
	"size_id" => "1A5",
	"contents" => array());
	
	$document3 = array(
	"size_id" => "1B2",
	"contents" => array());
	
	$orders -> insertOne($document1);
	$orders -> insertOne($document2);
	$orders -> insertOne($document3);  
   
   }
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