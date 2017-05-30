<?php
    session_start();

	if( ($_SESSION['username'] === 'admin')){
		echo TRUE;
	}
	
	else {
		echo FALSE;
	}
	

?>