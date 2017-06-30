/**
 * @author Daniel
 * In dieser .js wird das Modal zur Erstellung eines Kommissionierauftrags geladen.
 * Berücksichtigt werden lediglich Produkte, denen bereits ein festes Regal zugeordnet wurde.
 * Die dafür zuständigen .php-Dateien sind mdb_fetch_stored_products und create_order.php
 */

	var content = "";
	
	$.ajax({
		url: "../php/produkteKomAuftrag.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
            document.getElementById("content_produkte_einbuchen").innerHTML =
            create_produkte_einbuchen(myObj);
		}
	});	

/**
 * This function creates the HTML Output by combining HTML with the results from the AJAX-Request
 * @param {Object} obj: a multi-dimensional array[A-F] containing all products which are matched to a bin
 */
    function create_produkte_einbuchen(obj){
    	
    	content += "<form id='create_produkte' method='post'> <div class='form-group'><b> Bitte wählen Sie die zu kommissionierenden Produkte </b>";

        	for(a = 0; a < obj.length; a++){

	    		content += 
			  			"<div class='checkbox'> " +
			  			"<label> <input type='checkbox' name='product[]' id='product' value='" + obj[a] + "'>" + 
			  			obj[a] + "</label> </div>";

		}
		
		content +=
        "<label>Ablagefach wählen:</label>" + 
        "<select class='form-control' id='regalfach' name='regalfach'> " +
        "<option>A</option>"  +
        "<option>B</option>" +
        "<option>C</option>" +
        "<option>D</option>" +
        "</select></div></form>";
        
	    return content;		
    }
    
	
	$(document).ready(function(){
		
		$("#submit_produkte").click(function()
		
		{	 		
	    	$("#create_produkte").attr('action', '../php/create_regalbuchen.php');
	    	$("#create_produkte").submit();	
    	});
    			
	});
   
    	