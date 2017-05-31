/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal "Produkte einbuchen" in der Kategorie "Produkt hinzufügen" definiert.
 * Die Darstellung erfolgt als Modal.
 * Die dafür zuständigen .php-Dateien sind mdb_fetch_empty_products.php und commit_to_bin.php
 */
	var leer = "";
	
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
    	
    	leer += "<form id='book_in' method='post'><div class ='form-group'> <b> Bitte wählen Sie die Produkte, die Sie in ein Regal einbuchen möchten </b>";
        for(i = 0; i < obj.length; i++){
		
	    leer += 
			  "<div class='checkbox'> " +
			  "<label><input type='checkbox' name='bin[]' id='bin' value='" + obj[i] + "'>" + obj[i] + "</label> </div>";
		
		}
		
		leer += 
		"<label>Regalfach wählen:</label>"+
		"<select class='form-control' id='regalfach' name='shelf'>" +
        "<option>A</option>"+
        "<option>B</option>"+
        "<option>C</option>"+
        "<option>D</option>"+
        "<option>E</option>"+
        "<option>F</option>"+
        "</select></div>";
        
        if(obj.length == 0)
		leer = "<b> Aktuell sind alle Produkte einem Regal zugeordnet </b>";
		
	    return leer;		
    }
    
    $(document).ready(function(){
    	$("#submit_product").click(function(){
    		$("#book_in").attr('action',"../php/commit_to_bin.php");
    		$("#book_in").submit();
    	});
    });
