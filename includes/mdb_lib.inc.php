<?php
    
    /**
    * This is the MongoDB Library Class containing all necessary functions
    */
    require ("mongodb/vendor/autoload.php"); 
    
    $m = new MongoDB\Client();
    
    $db = $m->piro_test;
    
    $collection = $db->counters;
    $test_collection = $db->amazon_info;
    $bins = $db->regal;
    $orders = $db->orders;
	$picture = $db->picture_info;
	
	function change_regal($regal,$regalfach){
		global $bins,$db;
		$counter = 0;
		$bins->drop();
		$bins = $db -> regal;
		
		while($counter < $regal){
			$document = array(
			"regal" => ($counter + 1));
			
			for($a=0; $a < $regalfach; $a++){
				$document[chr(65+$a)] = array();	
			}
		
			$bins->insertOne($document);
			$counter++;	
		}
		
	}
	
	function getRegalSetup(){
		global $bins;
		
		$info = array();
		$info['regal'] = $bins->count();
		$res = $bins->findOne(
		array('regal' => 1));
		$counter = 0;
		foreach($res as $doc){
			$counter++;
		}
		$info['regalfach'] = $counter-2;
		return $info;
	}
	
	function getProdukteInRegalen(){
		global $bins;
		$info = getRegalSetup();
		$result = $bins -> find();
		
		foreach($result as $regal){
			foreach($regal['regalfach'] as $regalfach){
			$produktliste[] = ($regal[$regalfach]);
			}	
		}
		return $produktliste;
	}
    
    function getNextSequence($name){
    	global $collection;
		
    	$retval = $collection->findOneAndUpdate(
		array('_id' => $name),
		array('$inc' => array("sequence_value" => 1))
		);
		
		return $retval['sequence_value'];
	}
	
    function insert_document($collection,$produktname,$weight,$length,$width,$height,$description){
		
		$dimensions = array();
		$dimensions[0] = $length;
		$dimensions[1] = $width;
		$dimensions[2] = $height;
		
	    $document = array(

	    "_id" => getNextSequence("productid"),
        "name" => $produktname,
        "weight" => $weight, 
        "dimensions" => $dimensions,
        "description" => $description
        );
	 
      $collection->insertOne($document);
	}
    
    function update_bin($regal,$regalfach,$produktname){
    	global $bins;
		error_log($regal,0);
    	error_log($regalfach,0);
		error_log(is_string($regalfach),0);
    	$bins->updateOne(
    	array('regal' => intval($regal)),
    	array('$addToSet' => array($regalfach => $produktname
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
		 $test_collection->deleteOne(array("name"=>$produktname));
	 }
	 
	 function delete_order($orderid){
	 	global $orders;
		$orders ->deleteOne(array('auftragsnummer' => $orderid));
	 }

?>