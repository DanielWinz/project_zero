/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal zur Produktumbuchung geladen.
 * Die Darstellung erfolgt in der Regalbelegung.html. Nach Klick auf das EDIT Symbol,
 * können Produkte aus dem Regal umgebucht werden.
 * Die dafür zuständigen .php-Dateien sind fetch_one_product und delete_one_product.
 */
	
	var text;
	var regalfach;
	var queryString;
	
	$(document).on('click', ".glyphicon-edit", function() {
		
		regalfach = $(this).data('id');
		queryString = "?regal=" + regalfach;
		$("#button_umbuchen").attr('data-id',regalfach);
		
		$.ajax({
		url: "../php/fetch_ein_regal_content.php" + queryString,
		type: 'GET',
		success: function(Obj){
			var myObj = JSON.parse(Obj);
	        modal_produkt_umbuchen(myObj);
		
			}
		});
	});

	function modal_produkt_umbuchen(myObj){
        
    	text = "<form id='form_produkt_umbuchen' method='post'> <div class='form-group'>"
    			+ "<b> Bitte wählen Sie die Produkte, die umgebucht werden sollen. </b>";
        
        for(i = 0; i < myObj.length; i++){

	   		text += 
			  			"<div class='checkbox'> " +
			  			"<label> <input type='checkbox' name='product_umbuchen[]' id='product_umbuchen' value='" + myObj[i] + "'>" + 
			  			myObj[i] + "</label> </div>";
		}
		
		text +=
        "<label>neues Regal wählen:</label>" + 
        "<select class='form-control' id='neues_regal' name='neues_regal'> " +
        "<option>1</option>"  +
        "<option>A</option>" +
        "<option>B</option>" +
        "<option>C</option>" +
        "<option>D</option>" +
        "</select></div></form>";

	    $("#content_produkt_umbuchen").html(text);	
            
	}
	
	$(document).ready(function(){
	
	$("#button_umbuchen").click(function() {
		
		 $.ajax({
           type: "POST",
           url: "../php/produkt_umbuchen.php" + queryString,
           data: $("#form_produkt_umbuchen").serialize(), // serializes the form's elements.
           success: function(data)
           {	
           		$("#content_produkt_umbuchen").append("<div class='alert alert-success'> <strong>Produkt erfolgreich umgebucht </strong><i class='glyphicon glyphicon-ok'></i> <br> Auf Schließen drücken.  </div>");
                $("#button_close_umbuchen").on('click',function(){
	        		location.reload();
	        	});
           }
         });	
	 });	
	});