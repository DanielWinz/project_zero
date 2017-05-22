/**
 * @author Daniel
 */


if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    }
    
    else {    
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	console.log("in der Callback-Funktion");
        	var myObj = JSON.parse(this.responseText);
        	console.log("Darstellung des Objekts in drei Komponenten:" + myObj[0].auftragsnummer[0]);
            console.log("Darstellung des Objekts in drei Komponenten:" + myObj[1]);
            console.log("Darstellung des Objekts in drei Komponenten:" + myObj[2]);
            
            create_content(myObj);
       }
    };
    xhttp.open("GET", "../php/auftragsuebersicht.php", true);
    xhttp.send();


	function create_content(myObj){
		
		var text_in_process = "";
		var text_in_queue = "";
		var text_in_done = "";
		
		for(var a = 0; a < myObj[1].regal.length; a++){
			
		text_in_process +=  "<tr>" +
                    		"<td><a href='#product_info' data-toggle='modal' data-id='" + myObj[1].contents[a] + "'" + 
                    		"data-target='#product_info' class='product_info_content'>" + myObj[1].contents[a] + "</td>" + 
                    		"<td>" + myObj[1].regal[a] + "</td>" +  
                			"</tr>";
		}
		
		text_in_queue =	   "<div class='table-responsive'> <table class='table table-striped'> <thead>"
                   			+  "<tr> <th>Produkt</th> <th>Regal</th> </tr> </thead>"
                   			+  "<tbody>";
        
        for(var a = 0; a < myObj[0].auftragsnummer.length; a++){
        	
       	text_in_queue += 
        			"<tr>" +
                    "<td>" + myObj[0].contents[a]+ "</td>" + 
                    "<td>" + myObj[0].regal[a] + "</td>" +  
                	"</tr>";
        }
         	
        text_in_queue += "</tbody> </table> </div>";
        
        $("#in_process").html(text_in_process);
		$("#in_queue").append(text_in_queue);
	}
