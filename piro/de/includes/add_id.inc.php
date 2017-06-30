<?php
    require ("mongodb/vendor/autoload.php");
	
	$m = new MongoDB\Client();
    
    $db = $m->piro2;
	
	$amazon_info = $db ->amazon_info;
	
	$cursor = $amazon_info->find(array(), array('sort' => array('name' => 1)));
	
	foreach($cursor as $doc){
		echo $doc['name'];
	}
	$data = json_encode($cursor);
	
	echo $data;
?>