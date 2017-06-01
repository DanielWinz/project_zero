/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite index.html geladen.
 * Die Darstellung erfolgt in den Kategorien: in Bearbeitung, in der Warteschlange, beendete Aufträge.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

var text_in_process = "";
var text_in_queue = "";
var text_in_done = "";

	$.ajax({
		url: "../php/auftragsuebersicht.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			create_in_process(myObj);
			create_in_queue(myObj);
			create_in_done(myObj);
		
		}
	});
	
	function create_in_process(myObj){
		
		for(var a = 0; a < myObj[1].regal.length; a++){
			
		text_in_process +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[1].contents[a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[1].contents[a] + "</td>" + 
                    		"<td><a href='../html/regalbelegung.html'>" + myObj[1].regal[a] + "</td>" +  
                			"</tr>";
		}
		
		$("#ablage").html("Der Auftrag befindet sich in Bearbeitung. Die Produkte werden in Ablagefach <strong>" + myObj[1].size_id   + "</strong> abgelegt.");		
		$("#in_process").html(text_in_process);
	}
	
	function create_in_queue(myObj){
	
		$.get("../txt/preview_dashboard.txt", function(template){
		
		var rendered= "";
		for (var a = 0; a < 3; a++){

			rendered += Mustache.render(template,
				{
				 auftragsnummer_header: myObj[0].auftragsnummer[a],
				 auftragsnummer_id: myObj[0].auftragsnummer[a]
				 });
			}
			text_in_queue = rendered;
			$("#in_queue").prepend(text_in_queue);
			
		});
		
		for(var a = 0; a < 3; a++){
        
        text_in_queue +=	   "<div class='table-responsive col-sm-4 col-xs-3'> <table class='table table-striped'> <thead>"
                   			+  "<tr> <th>Produkte</th> </tr> </thead>"
                   			+  "<tbody>";
                   			
        	for(var key in myObj[0].contents[a]){
			text_in_queue += 
        			"<tr>" +
                    "<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[0].contents[a][key] + "'" + 
                    "data-target='#product_info' class='product_info_content'>" + myObj[0].contents[a][key]+ "</td>" +  
                	"</tr>";        		
        	}       
              	
        text_in_queue += "</tbody> </table> </div>";
        
        }
        
        $("#in_queue").append(text_in_queue);		
	}
	
	function create_in_done(myObj){

		text_in_done +=  "<div class='table-responsive'> <table class='table table-striped' id='beendet'> <thead>"
                   		+  "<tr> <th>Auftragsnummer</th> <th>Produkte</th> <th>Ablagefach</th> </tr> </thead>"
                   		+  "<tbody>";
        
        for(var a = 0; a < 5; a++){
        
        text_in_done +=
        		"<tr>" +
        		"<td>" + myObj[2].auftragsnummer[a] + "</td>" +
        		"<td>";
        		
        		for(var key in myObj[2].contents[a]){
        			
        				if(key == ((myObj[2].contents[a].length)-1))
        				text_in_done += "<a href='#product_info' data-toggle='modal' data-id='"
        								+ myObj[2].contents[a][key] + "'data-target='#product_info' class='product_info_content'>"
        								+ myObj[2].contents[a][key];
        				
        				else
        				text_in_done += "<a href='#product_info' data-toggle='modal' data-id='"
        								+ myObj[2].contents[a][key] + "'data-target='#product_info' class='product_info_content'>"
        								+ myObj[2].contents[a][key] + ", ";
        		}
        		
        text_in_done += "</td> <td>" + myObj[2].size_id[a] + "</td>";
        
        }
        
        text_in_done += "</tr></thead></tbody>";
        $("#in_done").append(text_in_done);		
	}