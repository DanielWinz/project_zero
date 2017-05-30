/**
 * @author Daniel
 */

var counter_in_queue = 3;
var counter_in_done = 5;
var text_in_process = "";
var text_in_queue = "";
var text_in_done = "";

	$.ajax({
		url: "../php/auftragsuebersicht.php",
		success: function(Obj){
			create_content(JSON.parse(Obj));
		}
	});

	function create_content(Obj){
		var myObj = Obj;
		for(var a = 0; a < myObj[1].regal.length; a++){
			
		text_in_process +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[1].contents[a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[1].contents[a] + "</td>" + 
                    		"<td>" + myObj[1].regal[a] + "</td>" +  
                			"</tr>";
		}
		
		$("#ablage").html("Der Auftrag befindet sich in Bearbeitung. Die Produkte werden in Ablagefach <strong>" + myObj[1].size_id   + "</strong> abgelegt.");
		

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
			
		}
		);
		
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
         	
        $("#in_queue").append(text_in_queue);
        $("#in_process").html(text_in_process);
		$("#in_done").append(text_in_done);
	
}	
	/**
	 * Erweiterung der Ansicht, sobald das Label "Mehr Anzeigen" gedrückt wurde.
	 */
	
	$(document).ready(function(){
		
		// Erweiterung der Ansicht für "in Warteschlange" von drei weiteren Produkten pro Klick.
		
		$("#mehr_in_queue").click(function(){
			
			if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
		    }
		    
		    else {    
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			//Erweiterung der Ansicht durch Anhängen von weiteren Ergebnissen
			
			 xhttp.onreadystatechange = function() {
		        if (this.readyState == 4 && this.status == 200) {
		        	console.log("in der Callback-Funktion");
		        	var myObj = JSON.parse(this.responseText);
		       
		       var max = counter_in_queue + 3;
		       text_in_queue = "";
		       
		       $("#in_queue").append("<div class='row' id='in_queue" + counter_in_queue + "'></div>");
		       
		       for(var a = counter_in_queue ; a < max; a++){
		       	
		       text_in_queue += "<div class='col-xs-6 col-sm-4 placeholder'> " +
			   "<img src='../img/ur5.jpg' " +
			   "width='150' height='150' class='img-responsive' alt='Generic placeholder thumbnail'> " +
               "<h4> Auftrag Nr. " + myObj[0].auftragsnummer[a] + "</h4>" +
               "<a data-toggle='modal' class='order_details' data-target='#order_details' href='#order_details' data-id='" +
               myObj[0].auftragsnummer[a] + "'><span class='text-muted'>Details</span></a></div>";
		       	}
		      
		      for(var a = counter_in_queue; a < max; a++){
        
       			text_in_queue += "<div class='table-responsive col-sm-4 col-xs-3'> <table class='table table-striped'> <thead>"
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
        	   
        	   counter_in_queue = counter_in_queue + 3;
        	   $("#in_queue").append(text_in_queue);
		       }
		    };
		    xhttp.open("GET", "../php/auftragsuebersicht.php", true);
		    xhttp.send();
		});
		
		
		
		// Erweiterung der Tabelle, um zehn weitere Ergebnisse.
		
		$("#mehr_in_done").click(function(){
			$.ajax({url: "../php/auftragsuebersicht.php", success: function(myObj){

		        var myObj = JSON.parse(myObj);
		        	
		       var max = counter_in_done + 5;
		       text_in_done= "";
		       
		       for(var a = counter_in_done; a < max ; a++){
		       	
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
				
				text_in_done += "</tr>";
				$('#beendet > tbody:last-child').append(text_in_done);


			}});
		
		});
		
	});

