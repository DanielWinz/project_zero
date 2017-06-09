/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal Produktübersicht in der Kategorie Produkt hinzufügen definiert.
 * Die dafür zuständige .php-Datei ist show_all_products.php
 */

	
	var text = "";
	
	$.ajax({
		url: "../php/show_all_products.php",
		type: 'GET',
		success: function(Obj){
		
			var myObj = JSON.parse(Obj);
            document.getElementById("content_all_products").innerHTML =
            show_all_products(myObj);
		
		}
	});	
	


	function show_all_products(myObj){
				
		text += "<div class='table-responsive'> <table class='table table-striped'> <thead>"
                   +  "<tr> <th>Produkt</th> <th>Regalfach</th> </tr> </thead>"
                   +  "<tbody>";
        
        for(var a = 0; a < myObj.produktname.length; a++){
        	
        	if(myObj.regal[a] == null)
        		myObj.regal[a] = "nicht zugewiesen";
        		
       	text += 
        			"<tr>" +
                    "<td>" + myObj.produktname[a] + "</td>" + 
                    "<td>" + myObj.regal[a] + "</td>" +  
                	"</tr>";
        } 	
        text+= "</tbody> </table> </div>";       
          
		return text;
	}
