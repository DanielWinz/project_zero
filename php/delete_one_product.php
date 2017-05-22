<?php

    include("../includes/mdb_lib.inc.php");
	
	$del = $_GET['name'];
	delete_product($del);
	delete_from_bin($del);
?>