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
	
	function change_regal($regal,$regalfach,$pfad){
		global $bins,$db;
		
		if($regal == 0){
			$bins->drop();
			$bins = $db -> regal;	
		}
		
		$document = array(
			"regal" => ($regal),
			"bildpfad" => $pfad,
			"anzahl" => $regalfach);
			
			for($a=0; $a < $regalfach; $a++){
				$document[chr(65+$a)] = array();	
			}
		
			$bins->insertOne($document);	
	
	}
	
	
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
	
	function getEinRegal($regalnummer){
		global $bins;
		
		$res = $bins->findOne(
		array('regal' => $regalnummer));
		
		return $res;
	}
	
	function getProdukteInRegalen(){
		global $bins;
		
		$result = $bins -> find();
		$li = array();
	 	$zaehler = 0;
		foreach($result as $regal){
			for ($a  = 0; $a < $regal['anzahl'] ; $a++){
					$zaehler += count($regal[chr(65 + $a)]);
				$li[$regal['regal']][chr(65 + $a)] = count($regal[chr(65 + $a)]); 
				
			}
		$li['summe'][] = $zaehler;
		$zaehler = 0;
		}
		return $li;
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