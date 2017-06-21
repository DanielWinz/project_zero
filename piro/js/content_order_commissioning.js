/**
 * @author Daniel
 * In dieser .js wird das Modal zur Erstellung eines Kommissionierauftrags geladen.
 * Berücksichtigt werden lediglich Produkte, denen bereits ein festes Regal zugeordnet wurde.
 * Die dafür zuständigen .php-Dateien sind mdb_fetch_stored_products und create_order.php
 */

	var speicher = "";
	
	$.ajax({
		url: "../php/produkteKomAuftrag.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
            document.getElementById("content_order_commissioning").innerHTML =
            create_stored_products(myObj);
		}
	});	

/**
 * This function creates the HTML Output by combining HTML with the results from the AJAX-Request
 * @param {Object} obj: a multi-dimensional array[A-F] containing all products which are matched to a bin
 */
    function create_stored_products(obj){
    	
    	speicher += "<form id='create_corder' method='post'> <div class='form-group'><b> Bitte wählen Sie die zu kommissionierenden Produkte </b>";

        	for(a = 0; a < obj.length; a++){

	    		speicher += 
			  			"<div class='checkbox'> " +
			  			"<label> <input type='checkbox' name='product[]' id='product' value='" + obj[a] + "'>" + 
			  			obj[a] + "</label> </div>";

		}
		
		speicher +=
        "<label>Ablagefach wählen:</label>" + 
        "<select class='form-control' id='ablagefach' name='ablagefach'> " +
        "<option>A1</option>"  +
        "<option>1A5</option>" +
        "<option>1B2</option>" +
        "</select></div></form>";
        
	    return speicher;		
    }
    
	
	$(document).ready(function(){
		
		$("#submit_corder").click(function()
		
		{	 		
	    	$("#create_corder").attr('action', '../php/create_order.php');
	    	$("#create_corder").submit();	
    	});
    			
	});
   
    	