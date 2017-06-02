<?php
    
    /**
    * This is the MongoDB Library Class containing all necessary functions
    */
    require ("mongodb/vendor/autoload.php"); 
    
    $m = new MongoDB\Client();
    
    $db = $m->piro2;
    
    $collection = $db->counters;
    $test_collection = $db->amazon_info;
    $bins = $db->bins;
    $orders = $db->orders;
	$picture = $db->picture_info;
    
    function getNextSequence($name){
    	global $collection;
		
    	$retval = $collection->findOneAndUpdate(
		array('_id' => $name),
		array('$inc' => array("sequence_value" => 1))
		);
		
		return $retval['sequence_value'];
	}
	
    function insert_document($collection,$mitarbeiter,$produktname,$weight,$length,$width,$height,$description){

	    $document = array(

	    "_id" => getNextSequence("productid"),
        "mitarbeiter" => $mitarbeiter, 
        "produktname" => $produktname,
        "weight" => $weight, 
        "dimension" => array(
		"length" => $length,
		"width" => $width,
		"height" => $height
		),
        "description" => $description
        );
	 
      $collection->insertOne($document);
	}
    
    function update_bin($bin_id,$produktname){
    	global $bins;
    
    	$bins->updateOne(
    	array('bin_id' => $bin_id),
    	array('$addToSet' => array('contents' => $produktname
		)));
    }
	
	function update_status($order_id){
		global $orders;
		
		$orders->updateOne(
		array("auftragsnummer" => $order_id),
		array('$set' => array('status' => 2)
		));
	}
	
	function delete_from_bin($name){
		
		global $bins;
		
		$del = $bins->find(
		array('contents' => $name)
		);
		
		foreach($del as $doc){
			$bins->updateOne(
			array('bin_id' => $doc["bin_id"]),
			array('$pull' => array('contents' => $name)),
			array('multiple' => true));	
		}
		
	}

	function delete_from_one_bin($name,$bin_id){
		
		global $bins;
		
		$del = $bins->findOne(
		array('contents' => $name,
			 'bin_id' => $bin_id)
		);
		
		$bins->updateOne(
			array('bin_id' => $bin_id),
			array('$pull' => array('contents' => $name)),
			array('multiple' => true));	
		
		
	}
   
    function create_order($size_id,$status,$contents){
      	
		global $orders;
			
      	$document = array(
      	"auftragsnummer" => getNextSequence("auftragsid"),
		"size_id" => $size_id,
		"status" => $status,
		"contents" => $contents
		);
      	$orders -> insertOne($document);
      }
      
	 function delete_product($produktname){
	 	global $test_collection;
		 $test_collection->deleteOne(array("produktname"=>$produktname));
	 }
	 
	 function delete_order($orderid){
	 	global $orders;
		$orders ->deleteOne(array('auftragsnummer' => $orderid));
	 }

?>