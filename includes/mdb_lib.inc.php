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
	
	function addImage($name,$link){
		global $picture;
		$bilder = array();
		$bilder[0] = $link;
		
		$picture -> findOneAndUpdate(
		array("name" => $name),
		array('$set' => array("pictures" => $link))
		);
		
		if($picture == null){
			$document = array(
			"name" => $name,
			"pictures" => $link);
			
		$picture ->insertOne($document);
		}
	}
	
	function change_regal($regal,$regalfach,$pfad){
		global $bins,$db;
		
		$bins->findOne(array(
		"regal" => $regal));
		
		if($bins != null){
			$bins->deleteOne(array("regal" => $regal));
			
			$document = array(
			"regal" => ($regal),
			"bildpfad" => $pfad,
			"anzahl" => $regalfach);
			
			for($a=0; $a < $regalfach; $a++){
				$document[chr(65+$a)] = array();	
			}
		
			$bins->insertOne($document);
		}
		
		else{
			
			$document = array(
			"regal" => ($regal),
			"bildpfad" => $pfad,
			"anzahl" => $regalfach);
			
			for($a=0; $a < $regalfach; $a++){
				$document[chr(65+$a)] = array();	
			}
		
			$bins->insertOne($document);
		}	
	
	}
	
	function deleteRegalSettings(){
		global $bins,$db;
		
			$bins->drop();

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
		
		foreach($result as $regal){
			for($a=0; $a < $regal['anzahl']; $a++){
				foreach($regal[chr(65 + $a)] as $name){
						$li[$regal['regal'] . chr(65 + $a)][] = $name;

				}
			}
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
	
    function insert_document($collection,$produktname,$weight,$length,$width,$height,$barcode,$description){
		
		$dimensions = array();
		$dimensions[0] = $length;
		$dimensions[1] = $width;
		$dimensions[2] = $height;
		
	    $document = array(

	    "_id" => getNextSequence("productid"),
        "name" => $produktname,
        "weight" => $weight, 
        "dimensions" => $dimensions,
        "barcode" => $barcode,
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
	
	function update_barcode($produktname,$barcode){
		global $test_collection;
		
		$result = $test_collection->findOneAndUpdate(
		array("name" => $produktname),
		array('$set' => array("barcode" => $barcode)));
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
   
    function create_order($size_id,$status,$contents,$regalfach){
      	
		global $orders;
			
      	$document = array(
      	"auftragsnummer" => getNextSequence("auftragsid"),
		"size_id" => $size_id,
		"status" => $status,
		"contents" => $contents,
		"regalfach" => $regalfach
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