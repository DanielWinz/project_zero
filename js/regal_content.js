 /**
 * Testscript, um Inhalt dynamisch zu generieren 
 */

	
	var text = "";
	var text_order ="";
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
            create_preview(myObj);
       }
    };
    xhttp.open("GET", "../php/fetch_regal_content.php", true);
    xhttp.send();
    
  	function create_preview(myObj){
  		
  		for(var key in myObj){
  		
  		var text = '<ul>';
  	
  			jQuery('<h3/>', {
  				class: 'sub-header',
		    	id: key,
		    	text: 'Regalfach ' + key,
			}).appendTo('#script_content');
			
			jQuery('<ul/>', {
  				class: 'list-group',
		    	id: 'lg' + key,
			}).appendTo('#script_content');
			
		var inside = myObj[key];
		var counter = 0;
		
			for(var con in inside){	
				text += "<li class='list-group-item'><a class='info_content' href='#product_info_regal' data-toggle='modal' data-target='#product_info_regal'"
						+ "data-id='" + inside[counter] + "'</a>" + inside[counter] + "</li>";
				counter++;
			}
		text += '</ul>';
		$('#lg' + key).append(text);
			
  		}
  		
  	}
  	
  	$(document).on("click", ".info_content", function () {
    	
     var auftragsid= $(this).data('id');
     console.log(auftragsid);
     var queryString = "?name=" + auftragsid;
		
		 if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		 xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	
	        	var myObj = JSON.parse(this.responseText);
	        	console.log(myObj);
	            document.getElementById("product_info_regal_content").innerHTML =
	            create_modal_content(myObj);
	       }
	    };
	    xhttp.open("GET", "../php/fetch_one_product.php" + queryString, true);
	    xhttp.send();
	});
	
	function create_modal_content(myObj){
		console.log("in Funktion" + myObj);
		text_order = "";
		
		text_order += 
				      "<div class='table-responsive'> <table class='table table-striped'> <thead>"
                   +  "<tr> <th>Produkt</th> <th>Regal</th> </tr> </thead>"
                   +  "<tbody>";
        
       	text_order += 
        			"<tr>" +
                    "<td>" + myObj.produktname + "</td>" + 
                    "<td>" + myObj.regal + "</td>" +  
                	"</tr>";
         	
        text_order += "</tbody> </table> </div>";
        
        text_order =  "<div class='container-fluid'>" +
                      "<div class='row'>" +
                      "<div class='col-sm-6'> <img src='../img/ur5.jpg' width='150' height='150' class='img-responsive'> </div>"+ 
                      "<div class='col-sm-6'> <strong> Produkt: </strong>" + myObj.produktname  + "<br><br>" +
        			  "<strong> Dimension: </strong>" + myObj.length + " x " + myObj.width + " x " + myObj.height  + "<br><br>" +
        			  "<strong> Gewicht: </strong>" + myObj.weight + "<br><br>" +
        			  "<strong> lagert in: </strong>" + myObj.regal + "<br></div></div>" + 
        			  "<div class='row placeholder'></div><div class='well'> <strong> Beschreibung: </strong>" + myObj.description + "</div></div>";
        
        return text_order;
	}

		$("#del_button_regal").click(function() {
		var del = $(this).data('id');
		console.log("Namen aus Button" + del);
		var queryString = "?name=" + del;
		
			 if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		 xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	$("#row_placeholder").append("<div class='alert alert-success'> <strong>Produkt erfolgreich gelöscht </strong><span class='glyphicon glyphicon-ok'></span> </div>");
	        	$("#close_button_regal").on('click',function(){
	        		location.reload();
	        	});
	        	
	       }
	    };
	    xhttp.open("GET", "../php/delete_one_product.php" + queryString, true);
	    xhttp.send();
	});
