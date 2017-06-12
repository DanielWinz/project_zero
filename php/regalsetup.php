<?php
    include("../includes/mdb_lib.inc.php");
		
	if(isset($_POST['anzahl_regal']) && isset($_POST['anzahl_regalfach'])){
		change_regal($_POST['anzahl_regal'], $_POST['anzahl_regalfach']);
	}
?>