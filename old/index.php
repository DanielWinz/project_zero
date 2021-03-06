<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="Index Page showing a Dashboard containing the most important information">
    <meta name="author" content="Daniel Wenz">
    <link rel="icon" href="../../favicon.ico">

    <title>Dashboard KomRob Auftragsverwaltng</title>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js"></script>
    <script type="text/javascript" src="http://cdn.robotwebtools.org/roslibjs/current/roslib.min.js"></script>
	<script src="../js/error_handling.js"></script>
	
    <!-- Custom styles for this template -->
    <link href="../css/dashboard.css" rel="stylesheet">
    <link href="../css/login.css" rel="stylesheet">

  </head>
	
  <body>

	<!-- Navigation bar -->
	<!-- left hand-side: creating order -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
    	
      <div class="container-fluid" overflow="hidden">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          </button>
          <a class="navbar-brand" href="#" data-toggle="modal" data-target="#sp_decision">Auftrag anlegen</a>
        </div>
        
        
        
    <!-- right hand-side: Navigation elements -->   
      <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
          	
          	<!-- Dashboard, Login, Produkt einbuchen und Profil -->
            <li><a href="index.php">Dashboard</a></li>
            <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Login</b> <span class="caret"></span></a>
				<ul id="login-dp" class="dropdown-menu">
					<li>
					<div class="row">
					<div class="col-md-12">
					<p>Als Admin bitte anmelden:</p>
					<form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">
					<div class="form-group">
					<label class="sr-only" for="exampleInputEmail2">Email address</label>
					<input type="email" class="form-control" id="exampleInputEmail2" placeholder="Benutzername" required>
					</div>
					<div class="form-group">
					<label class="sr-only" for="exampleInputPassword2">Password</label>
					<input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
	                <div class="help-block text-right"><a href="">Passwort vergessen?</a></div>
					</div>
					<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block">Einloggen</button>
					</div>
					</form>
					</div>
					</li>
				</ul>
	        </li>
            <li><a href="#">Profil</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </nav>

	<!-- Here, we start defining the Navigation Sidebar located on the left-hand side of the page -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li class="active"><a href="#">
            	<span class="glyphicon glyphicon-home"></span> Dashboard
            	<span class="sr-only">(current)</span></a>  	 
            </li>
            <li><a href="../html/formular_auftrag.html"><span class="glyphicon glyphicon-plus"></span> Produkte</a></li>
            <li><a href="../html/produktoverview.html"><span class="glyphicon glyphicon-list"></span> Produktübersicht</a></li>
            <li><a href="../html/regalbelegung.html"><span class="glyphicon glyphicon-stats"></span> Regalbelegung</a></li>
          </ul>
        </div>
	
        
     <!-- Content of the Dashboard is set by the called scripts -->
     <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Dashboard</h1>
          
        <div class="row placeholders" id="preview_dashboard">	
 		<!-- Content of the last pickings is fetched by javascript. -->
 		<script src ="../js/preview_dashboard.js"></script>
          </div>
         
	  <!-- Defining the table which has to be filled dynamically -->
          <h2 class="sub-header">neueste Produkte</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produktname</th>
                  <th>Gewicht (g)</th>
                  <th>Höhe (cm)</th>
                  <th>Breite (cm)</th>
                  <th>Länge (cm)</th>
                  <th>Regal</th>
                </tr>
              </thead>
              <tbody id="content_table">
              <!-- content is generated by content_table.js -->	
              <script src ="../js/content_table.js"></script>
              </tbody>
            </table>
          </div>
        </div>
	 </div>
   </div>
   
    <!-- Modal for creating commissioning order -->
    <div id="sp_decision" class="modal fade" role="dialog">
      <div class="modal-dialog">			
  		<!-- modal content is set by .js -->
  	        <div class="modal-content">	
  			    <div class="modal-header">
    			  <button type="button" class="close" data-dismiss="modal">&times;</button>
    			  <h4 class="modal-title">Order anlegen</h4>
    			</div>
    		<div class="modal-body" id="content_order_commissioning">
    			<script src="../js/content_order_commissioning.js"></script>
    		</div>
    		<div class="modal-footer">
    			 <button type="button" class="btn btn-success" id="submit_corder">Auftrag anlegen</button>
    			 <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
    		</div>
    		</div>
      </div>
    </div>
    	
    	
    <!-- modal for showing errors occuring and triggered by the robot -->
    <div id="error_handling" class="modal fade" role"dialog">
      <div class="modal-dialog">		
        <!-- modal content is set by .js -->
            <div class="modal-content">
    		    <div class="modal-header">
    			  <button type="button" class="close" data-dismiss="modal">&times;</button>
    			  <h4 class="modal-title">Fehlermeldung</h4>
    			</div>
    		<div class="modal-body" id="content_empty_products">
    		    Ein Fehler wurde erkannt.
    		</div>
    		<div class="modal-footer">
    			<button type="button" class="btn btn-success" id="submit_product">Produkte einbuchen</button>
    		    <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
    		</div>
    		</div>
    		</div>
    	</div>
    	
    <!-- modal for showing order details and the state -->
    <div id="order_details" class="modal fade" role="dialog">
      <div class="modal-dialog">		
        <!-- modal content is set by .js -->
            <div class="modal-content">
    		    <div class="modal-header">
    			  <button type="button" class="close" data-dismiss="modal">&times;</button>
    			  <h4 class="modal-title">Auftragsübersicht </h4>
    			</div>
    		<div class="modal-body" id="content_order_details">
    		    <!-- content is set dynamically when the trigger is fired -->
    		</div>
    		<div class="modal-footer">
    			<button type="button" class="btn btn-danger" id="del_order_button">Auftrag löschen</button>
    		    <button type="button" class="btn btn-default" data-dismiss="modal" id="close_order_button">Schließen</button>
    		</div>
    		</div>
    		</div>
    	</div>
    	
    <!-- modal for showing order details and the state -->
    <div id="error_obstacle" class="modal fade" role="dialog">
      <div class="modal-dialog">		
        <!-- modal content is set by .js -->
            <div class="modal-content">
    		    <div class="modal-header">
    			  <button type="button" class="close" data-dismiss="modal">&times;</button>
    			  <h4 class="modal-title">Objekt im Weg<span class="glyphicon glyphicon-road"></span></h4>
    			</div>
    		<div class="modal-body" id="content_error_obstacle">
    		    <!-- content is set dynamically when the trigger is fired -->
    		</div>
    		<div class="modal-footer">
    		    <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
    		</div>
    		</div>
    		</div>
    	</div>
    	   	   	   	   	
    <!-- modal for showing order details and the state -->
    <div id="error_grasp_seen" class="modal fade" role="dialog">
      <div class="modal-dialog">		
        <!-- modal content is set by .js -->
            <div class="modal-content">
    		    <div class="modal-header" id="error_header">
    			  <button type="button" class="close" data-dismiss="modal">&times;</button>
    			</div>
    		<div class="modal-body" id="content_error_gs">
    		    <!-- content is set dynamically when the trigger is fired -->
    		</div>
    		<div class="modal-footer">
    			<button type="button" class="btn btn-success">Manuell kommissioniert</button>
    		    <button type="button" class="btn btn-default" data-dismiss="modal">Schließen</button>
    		</div>
    		</div>
    		</div>
    	</div>  
  	 </div>
	</div>
  </body>
</html>