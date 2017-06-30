/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite index.html geladen.
 * Die Darstellung erfolgt in den Kategorien: in Bearbeitung, in der Warteschlange, beendete Aufträge.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

var text_in_process = "";
var text_in_queue = "";

	$.ajax({
		url: "../php/produkteInAuftrag.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
			create_in_queue(myObj);
		
		}
	});
	
	
	function create_in_queue(myObj){
	
		
		for(var keys in myObj){
			for(var a = 0; a < myObj[keys].length; a++){
			text_in_queue +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[keys][a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[keys][a] + "</td>" + 
                    		"<td>" + keys + "</td>" +  
                			"</tr>";
          }
		}
		
		$("#in_queue").html(text_in_queue);
	  

	}