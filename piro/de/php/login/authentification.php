<?php
    session_start();

	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'roboter') ){
		echo "roboter";
	}
	
	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'piro') ){
		echo "piro";
	}
	
	else if( ($_SESSION['username'] === 'admin')){
		error_log("in erster",0);
		echo "computer";
	}
	
	else {
		echo FALSE;
	}
	

?>