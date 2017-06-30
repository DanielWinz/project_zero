/**
 * @author Daniel
 * In dieser .js wird das Modal zur Erstellung eines Kommissionierauftrags geladen.
 * Berücksichtigt werden lediglich Produkte, denen bereits ein festes Regal zugeordnet wurde.
 * Die dafür zuständigen .php-Dateien sind mdb_fetch_stored_products und create_order.php
 */

	var speicher = "";
	var sort_obj = [];
	var sort_obj_orders = [];
	
	$.ajax({
		url: "../php/produkteAusAuftrag.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
			var obj = sortAndCreateArray(myObj);
			
			console.log(obj);
            document.getElementById("content_order_commissioning").innerHTML =
            create_stored_products(obj);
		}
	});
	
	function sortAndCreateArray(myObj){
		
		for(var key in myObj[0]){
			for(var a = 0; a < myObj[0][key].length; a++){
					sort_obj.push(myObj[0][key][a]);
			}
		}
		
		for(var key in myObj[1]){
			for(var a = 0; a < myObj[1][key].length; a++){
					sort_obj_orders.push(myObj[1][key][a]);
			}
		}
		
		for(var a = 0; a < sort_obj_orders.length ; a++){
			var index = sort_obj.indexOf(sort_obj_orders[a]);
			if(index != -1)
			sort_obj.splice(index,1);
		}
		
		console.log(sort_obj_orders);
		return sort_obj.sort();
	
	}	

/**
 * This function creates the HTML Output by combining HTML with the results from the AJAX-Request
 * @param {Object} obj: a multi-dimensional array[A-F] containing all products which are matched to a bin
 */
    function create_stored_products(obj){
    	
    	speicher += "<form id='create_corder' method='post'> <div class='form-group'><b> Select the products for creating an order </b>";
			

				for(var a = 0; a < obj.length; a++){
	    		speicher += 
			  			"<div class='checkbox'> " +
			  			"<label> <input type='checkbox' name='product[]' id='product' value='" + obj[a] + "'>" + 
			  			obj[a] + "</label> </div>";
			}

		
		speicher +=
        "<label>Choose storage department:</label>" + 
        "<select class='form-control' id='ablagefach' name='ablagefach'> " +
        "<option>A1</option>"  +
        "<option>1A5</option>" +
        "<option>1B2</option>" +
        "<option>K3</option>" +
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
   
    	