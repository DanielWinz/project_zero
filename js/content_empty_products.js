/**
 * @author Daniel
 * This .js uses an AJAX-Request for fetching all products which are not matched to a certain bin.
 * They are displayed as checkbox values. 
 * The user can select them and choose the bin in which the products should be found.
 */
	var leer = "";
	var xhttp;
	
	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    }
    
    else {    
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	console.log("arrived in state");
        	var myObj = JSON.parse(this.responseText);
        	console.log(myObj);
            document.getElementById("content_empty_products").innerHTML = create_empty_products(myObj);
       }
    };
    xhttp.open("GET", "../php/mdb_fetch_empty_products.php", true);
    xhttp.send();

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
