<?php
    session_start();

	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'roboter') ){
		error_log("in zweiter",0);
		echo 2;
	}
	
	else if( ($_SESSION['username'] === 'admin')){
		error_log("in erster",0);
		echo 1;
	}
	
	else {
		echo FALSE;
	}
	

?>