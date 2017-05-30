$(document).on("click", ".order_details", function () {
    	
        auftragsid= $(this).data('id');
     	var queryString = "?nr=" + auftragsid;
     
	    if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		 xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	
	        	var myObj = JSON.parse(this.responseText);
	            document.getElementById("content_order_details").innerHTML =
	            create_order_content(myObj);          
	       }
	    };
	    xhttp.open("GET", "../php/fetch_order_content.php" + queryString, true);
	    xhttp.send();
  	
});

	$(document).ready(function(){
		$("#del_order_button").click(function(){
		queryString = "?orderid=" + auftragsid;
		
		if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		 xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	$("#change_content").attr('class','alert alert-success');
	        	$("#change_content").html("<strong>Der Auftrag wurde erfolgreich gelöscht</strong>");
	            
		            $("#close_order_button").click(function(){
		            	location.reload();
		            });	            	
	       }
	    };
	    xhttp.open("GET", "../php/delete_order.php" + queryString, true);
	    xhttp.send();
	});
	});

	function create_order_content(myObj){
		
		text_order = "";
		
		text_order += "<div class='container-fluid'>" 
				   +  "<div class='table-responsive'> <table class='table table-striped'> <thead>"
                   +  "<tr> <th>Produkt</th> <th>Regal</th> </tr> </thead>"
                   +  "<tbody>";
        
        for(var a = 0; a < myObj.contents.length; a++){
        	
       	text_order += 
        			"<tr>" +
                    "<td>" + myObj.contents[a] + "</td>" + 
                    "<td>" + myObj.regal[a] + "</td>" +  
                	"</tr>";
        } 	
        text_order += "</tbody> </table> </div>";
		
		switch (myObj.status){
			
			case 0:
			text_order += "<div class='alert alert-info' id='change_content'>"
  						 + "Der Auftrag befindet sich in der Warteschleife. <br>"
  						 + "Die Items werden in Box <strong>" + myObj.ablage + "</strong> abgelegt." 
						 + "</div></div>";
						 break;
			case 1:
			text_order += "<div class='alert alert-info' id='change_content'>"
  						 + "Der Auftrag wird gerade bearbeitet."
  						 + "Die Items werden in Box <strong>" + myObj.ablage + "</strong> abgelegt."
						 + "</div></div>";
						 break;

			case 2:
			text_order += "<div class='alert alert-success' id='change_content'>"
  						 + "Der Auftrag wurde erfolgreich kommissioniert."
  						 + "Die Items wurden in Box <strong>" + myObj.ablage + "</strong> abgelegt."
						 + "</div></div>";
						 break;
		
		}	
        
          
		return text_order;
	}