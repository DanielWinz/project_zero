<?php
    session_start();

	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'roboter') ){
		echo "roboter";
	}
	
	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'piro') ){
		echo "piro";
	}
	
	if( ($_SESSION['username'] === 'admin') && ($_SESSION['modus'] === 'computer') ){
		echo "computer";
	}
	

?>