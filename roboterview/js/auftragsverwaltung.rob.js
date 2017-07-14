/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite index.html geladen.
 * Die Darstellung erfolgt in den Kategorien: in Bearbeitung, in der Warteschlange, beendete Aufträge.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

var text_in_process = "";
var text_in_queue = "";

	$.ajax({
		url: "../../php/auftragsuebersicht.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
			create_in_process(myObj);
			create_in_queue(myObj);
		
		}
	});
	
	function create_in_process(myObj){

	  if(typeof(myObj[1]) !== 'undefined' && typeof(myObj[1].regal != 'undefined')){	
		for(var a = 0; a < myObj[1].regalfach.length; a++){
			
		text_in_process +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[1].contents[a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[1].contents[a] + "</td>" + 
                    		"<td>" + myObj[1].regalfach[a] + "</td>" +  
                			"</tr>";
		}
		
		$("#ablage").html("Der Auftrag befindet sich in Bearbeitung. Die Produkte werden in Ablagefach <strong>" + myObj[1].size_id   + "</strong> abgelegt.");		
		$("#in_process").html(text_in_process);
	  }
	  
	  else{
	  	$("#row_in_progress").html("<div class='alert alert-info'> Aktuell befindet sich kein Auftrag in Bearbeitung."
	  							  +" Aufträge können im Computermodus über den Button <strong>Auftrag anlegen</strong> erstellt werden. </div>");
		$("#row_in_progress").attr('style','padding-left:15px');	  
	  }
	}
	
	function create_in_queue(myObj){
	
	  if(typeof(myObj[0]) !== 'undefined' && typeof(myObj[0].regal != 'undefined')){	
		for(var a = 0; a < myObj[0].contents[0].length; a++){
			
		text_in_queue +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[0].contents[0][a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[0].contents[0][a] + "</td>" + 
                    		"<td>" + myObj[0].regalfach[0][a] + "</td>" +  
                			"</tr>";
		}
		
		$("#ablage_in_queue").html("Der Auftrag befindet sich in Bearbeitung. Die Produkte werden in Ablagefach <strong>" + myObj[0].size_id[0]   + "</strong> abgelegt.");		
		$("#in_queue").html(text_in_queue);
	  }
	  
	  else{
	  	$("#row_in_queue").html("<div class='alert alert-info'> Aktuell befinden sich keine Aufträge in der Warteschlange."
	  							  +" Aufträge können im Computermodus über den Button <strong>Auftrag anlegen</strong> erstellt werden. </div>");
		$("#row_in_queue").attr('style','padding-left:15px');	  
	  }	
	}