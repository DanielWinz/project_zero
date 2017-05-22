 /**
 * Testscript, um Inhalt dynamisch zu generieren 
 */

	
	var text = "";
	var xhttp;
	
	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	var myObj = JSON.parse(this.responseText);
            document.getElementById("content_all_products").innerHTML =
            show_all_products(myObj);
       }
    };
    xhttp.open("GET", "../php/show_all_products.php", true);
    xhttp.send();
    

	function show_all_products(myObj){
				
		text += "<div class='table-responsive'> <table class='table table-striped'> <thead>"
                   +  "<tr> <th>Produkt</th> <th>Regal</th> </tr> </thead>"
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
