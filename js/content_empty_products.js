/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal "Produkte einbuchen" in der Kategorie "Produkt hinzufügen" definiert.
 * Die Darstellung erfolgt als Modal.
 * Die dafür zuständigen .php-Dateien sind mdb_fetch_empty_products.php und commit_to_bin.php
 */
	var leer = "";
	var myObj;
	
	$.ajax({
		url: "../php/mdb_fetch_empty_products.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			document.getElementById("content_empty_products").innerHTML = 
			create_empty_products(myObj);
		}
	});


/**
 * This function creates the HTML Output by combining HTML with the results from the AJAX-Request
 * @param {Object} obj: an array containing all products which are not stored in a bin yet.
 */    
    function create_empty_products(obj){
    	console.log(obj);
    	myObj = obj;
    	leer += "<form id='book_in' method='post'><div class ='form-group'> <b> Bitte wählen Sie die Produkte, die Sie in ein Regalfach einbuchen möchten </b>";
      	var length = 0;
      	
      	for(key in obj){
      		length++;
      	}
       
        for(i = 0; i < (length-1); i++){
		
	    leer += 
			  "<div class='checkbox'> " +
			  "<label><input type='checkbox' name='produktnamen[]' id='produktnamen' value='" + obj[i] + "'>" + obj[i] + "</label> </div>";
		
		}
		
		leer += 
		"<label>Regal wählen:</label>"+
		"<select class='form-control' id='regalnummer' name='regalnummer'>";
		
		var regalfach = obj['info'];
		
		for(a=0; a < regalfach.length ; a++){
			leer+= "<option>" + (a+1) + "</option>";
		}
		
		leer += "</select>";
		
		leer += 
		"<label>Regalfach wählen:</label>";
		
		leer += "<select class='form-control' id='regalfach' name='regalfach'>";
			
			for(i = 0; i < regalfach[0] ; i++)
				leer+= "<option>" + String.fromCharCode(65 + i) + "</option>";
		
		leer += "</select></div></div>";	
		
        
        if(obj.length == 0)
		leer = "<b> Aktuell sind alle Produkte einem Regalfach zugeordnet </b>";
		
	    return leer;		
    }
    
    $(document).ready(function(){
    	
    	$("#regalnummer").on('change', function(){
    		var inhalt = "";
    		var pos = $(this)[0].value;
    		
    		for(var a = 0; a < myObj['info'][pos-1]; a++){
    			inhalt += "<option>" + String.fromCharCode(65 + a) + "</option>";
    		}
    		
    		$("#regalfach")[0].innerHTML = inhalt;
    	
    	});
    		
    	$("#submit_product").click(function(){
    		$("#book_in").attr('action',"../php/commit_to_bin.php");
    		$("#book_in").submit();
    	});
    });
