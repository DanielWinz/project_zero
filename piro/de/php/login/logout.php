<?php
    session_start();
	session_destroy();
	
	header("Location: http://192.168.1.117/project_zero/html/index.html");
?>