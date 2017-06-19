/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal zur Produktumbuchung geladen.
 * Die Darstellung erfolgt in der Regalbelegung.html. Nach Klick auf das EDIT Symbol,
 * können Produkte aus dem Regal umgebucht werden.
 * Die dafür zuständigen .php-Dateien sind fetch_one_product und delete_one_product.
 */
	
	var text;
	var info;
	var queryString;
	var queryParam;
	
	$(document).on('click', ".glyphicon-edit", function() {
		
		info = $(this).data('id');
		queryParam = info.split(",");
		queryString = "?regal=" + queryParam[0] + "&regalfach=" + queryParam[1];
		$("#button_umbuchen").attr('data-id',queryString);
		console.log(queryString);
		
		$.ajax({
		url: "../php/fetch_ein_regal_content.php" + queryString,
		type: 'GET',
		success: function(Obj){
			var myObj = JSON.parse(Obj);
			console.log(myObj);
	        modal_produkt_umbuchen(myObj);
		
			}
		});
	});

	function modal_produkt_umbuchen(myObj){
        
    	text = "<form id='form_produkt_umbuchen' method='post'> <div class='form-group'>"
    			+ "<b> Bitte wählen Sie die Produkte, die umgebucht werden sollen. </b>";
        
        for(i = 0; i < myObj['produkte'].length; i++){

	   		text += 
			  			"<div class='checkbox'> " +
			  			"<label> <input type='checkbox' name='product_umbuchen[]' id='product_umbuchen' value='" + myObj['produkte'][i] + "'>" + 
			  			myObj['produkte'][i] + "</label> </div>";
		}
		
		text += 
		"<label>Regal wählen:</label>"+
		"<select class='form-control' id='regnummer' name='regnummer'>";
		
		var regalfach = myObj['info'];
		
		for(a=0; a < regalfach.length ; a++){
			text+= "<option>" + (a+1) + "</option>";
		}
		
		text += "</select>";
		
		text += 
		"<label>Regalfach wählen:</label>";
		
		text += "<select class='form-control' id='regfach' name='regfach'>";
			
			for(i = 0; i < regalfach[0] ; i++)
				text+= "<option>" + String.fromCharCode(65 + i) + "</option>";
		
		text += "</select></div></div>";	
		

	    $("#content_produkt_umbuchen").html(text);

	    $("#regnummer").on('change', function(){
			console.log("in FKT");
    		var inhalt = "";
    		var pos = $(this)[0].value;
    		
    		for(var a = 0; a < myObj['info'][pos-1]; a++){
    			inhalt += "<option>" + String.fromCharCode(65 + a) + "</option>";
    		}
    		
    		$("#regfach")[0].innerHTML = inhalt;
    	
    	});
            
	}
		
$(document).ready(function(){
	
	$("#button_umbuchen").click(function() {
		 console.log(queryString);
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