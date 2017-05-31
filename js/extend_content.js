/**
 * @author Daniel
 * In dieser .js wird der erweiterte Inhalt für die Hauptseite index.html geladen.
 * Die Kategorie "in der Warteschlange", sowie "beendete Aufträge" lassen eine Erweiterung der Ergebnisse zu.
 * Die dafür zuständige .php-Datei ist ebenso auftragsuebersicht.php
 */

var counter_in_queue = 3;
var counter_in_done = 5;

	$(document).ready(function(){
			
		$("#mehr_in_queue").click(function(){
			
			$.ajax({
				url: "../php/auftragsuebersicht.php",
				success: function(Obj){
					
					var myObj = JSON.parse(Obj);
					extend_in_queue(myObj);
				
				}
			});
		});
		
		$("#mehr_in_done").click(function(){
			
			$.ajax({
				url: "../php/auftragsuebersicht.php",
				success: function(Obj){
					
					var myObj = JSON.parse(Obj);
					extend_in_done(myObj);
				
				}
			});
		});
		
	});
	
		
	function extend_in_queue(myObj){
		
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
	
	function extend_in_done(myObj){
		
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
	}		