<?php
    
    /**
    * This is the MongoDB Library Class containing all necessary functions
    */
    require ("mongodb/vendor/autoload.php"); 
    
    $m = new MongoDB\Client();
    
    $db = $m->piro;
    $regal = $db -> bins;
    $collection = $db->counters;
    $test_collection = $db->amazon_info;
    $orders = $db->orders;
	$picture = $db->picture_info;
	$bins_backup = $db->bins_backup;
	$add_item_info = $db->item_additional_info;
	
	
	function getRegalSetup(){
		global $bins;
		
		$info = array();

		$res = $bins->find();
		$counter = 0;
		
		foreach($res as $doc){
			$info[] = $doc['anzahl'];
		}

		return $info;
	}
	
	function getItemAmount(){
		global $bins_backup;
		
		$result = $bins_backup->find();
		
		foreach($result as $bin_collection){
			$zahl += count($bin_collection['contents']);
		}
		return $zahl;
	}
	
	function getEinRegal($regalnummer){
		global $bins;
		
		$res = $bins->findOne(
		array('regal' => $regalnummer));
		
		return $res;
	}
	
	
	function getProdukteInRegalen(){
		global $test_collection;
		
		$result = $test_collection -> find(
		array(),
		array('sort' => array('name' => 1)));
		
		foreach($result as $produkt){
		$li[] = $produkt['name'];	
		}
		return $li;
	}
	
	function getProdukteInAuftrag(){
		global $orders;
		
		$result = $orders -> find();
		
		foreach($result as $auftrag){
			$liste[$auftrag['size_id']] = $auftrag['contents'];	
		}
		
		return $liste;
	}
	
	function getProdukteInAuftragOhneFach(){
		global $orders;
		
		$result = $orders -> find();
		
		foreach($result as $auftrag){
			$liste[] = $auftrag['contents'];
		}
		
		return $liste;
	}
    
	function getProdukteAusBins(){
		global $regal;
		
		$result = $regal -> find(
		array(),
		array('sort' => array('name' => 1)));
		
		foreach($result as $produkt){
			$liste[] = $produkt['contents']; 
		}
		return $liste;
		
	}
    function getNextSequence($name){
    	global $collection;
		
    	$retval = $collection->findOneAndUpdate(
		array('_id' => $name),
		array('$inc' => array("sequence_value" => 1))
		);
		
		return $retval['sequence_value'];
	}
	
	function isInAuftrag($size_id,$name){
		global $orders;
		
		$res = $orders ->findOne(
		array('size_id' => $size_id));
		
		foreach($res['contents'] as $produktname){
			
			if($produktname == $name)
			return true;
		}
		return false;
	}
	
	function isNew($item){
		global $add_item_info;
		
		$produkt = $add_item_info ->findOne(
		array("name" => $item));
		
		if($produkt['new'] == 1)
			return 1;
		
		else
			return 0;
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

	function delete_from_one_bin($regal,$regalfach,$name){
		
		global $bins;

		error_log("Aus Regal: " . $regal,0);
		error_log("Aus Regalfach: " . $regalfach,0);
		
		$bins->updateOne(
			array('regal' => intval($regal)),
			array('$pull' => array($regalfach => $name)),
			array('multiple' => true));	
		
		
	}
	
	function add_to_bin($bin_id,$name){
		global $regal;
		
		$regal->updateOne(
			array('bin_id' => $bin_id),
			array('$set' => array('contents' => $name)));	
	}
   
    function create_order($size_id,$contents){
      	
		global $orders;
		
		$orders -> updateOne(
		array('size_id' => $size_id),
		array('$set' => array('contents' => $contents)));	

      }
      
	 function delete_product($produktname){
	 	global $test_collection;
		 $test_collection->deleteOne(array("name"=>$produktname));
	 }
	 
	 function delete_order($orderid){
	 	global $orders;
		$orders ->deleteOne(array('auftragsnummer' => $orderid));
	 }
	 
	 function resetBins(){
	 	global $regal;
		
		$result = $regal -> updateMany(
		array(),
		array('$set' => array('contents' => array())));

	 }
	 
	 function resetOrders(){
	 	global $orders;
		
		$orders = $orders -> updateMany(
		array(),
		array('$set' => array('contents' => array())));
	 }

?>