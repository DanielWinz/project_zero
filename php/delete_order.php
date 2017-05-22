<?php
    include("../includes/mdb_lib.inc.php");
	
	$orderid = intval($_GET['orderid']);
	error_log($orderid,0);
	delete_order($orderid);
?>