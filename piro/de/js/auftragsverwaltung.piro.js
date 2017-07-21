/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite index.html geladen.
 * Die Darstellung erfolgt in den Kategorien: in Bearbeitung, in der Warteschlange, beendete Aufträge.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

var text_in_process = "";
var text_in_queue = "";
	
$(document).ready(function(){
	$("#stow").click(function(){
		$("#warteschlange").addClass('hidden');
		$("#row_in_queue").addClass("hidden");
		$("#carousel_content").addClass("hidden");
		$("#table_content").addClass("hidden");
	});
	$("#pick").click(function(){
		$("#warteschlange").removeClass('hidden');
		$("#row_in_queue").removeClass("hidden");
		$("#carousel_content").removeClass("hidden");
		$("#table_content").removeClass("hidden");
	});
});
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