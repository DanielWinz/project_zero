$(document).on('click', ".product_info_content", function() {
		
		var produktname = $(this).data('id');
		var queryString = "?name=" + produktname;
		
	$.ajax({
		url: "../php/fetch_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
	        document.getElementById("content_product_info").innerHTML =
	        create_modal_content(myObj);
		}
	});
	
	function create_modal_content(myObj){
        console.log(myObj);
        $("#del_button").attr('data-id', myObj.produktname);
        text_order =  "<div class='container-fluid'>" +
                      "<div class='row' id='row_placeholder'></div>" +
                      "<div class='row'>" +
                      "<div class='col-sm-6'> <img src='" + myObj.bildpfad + "' width='150' height='150' class='img-responsive'> </div>"+ 
                      "<div class='col-sm-6'> <strong> Produkt: </strong>" + myObj.produktname  + "<br><br>" +
        			  "<strong> Dimension: </strong>" + myObj.length + " x " + myObj.width + " x " + myObj.height  + "<br><br>" +
        			  "<strong> Gewicht: </strong>" + myObj.weight + "<br><br>" +
        			  "<strong> lagert in: </strong>" + myObj.regal + "<br></div></div>" + 
        			  "<div class='row placeholder'></div><div class='well'> <strong> Beschreibung: </strong>" + myObj.description + "</div></div>";
        
        return text_order;
	}
	
	$("#del_button").click(function() {
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
	        	$("#row_placeholder").append("<div class='alert alert-success'> <strong>Produkt erfolgreich gelöscht</strong><span class='glyphicon glyphicon-ok'></span> </div>");
	        	$("#close_button").on('click',function(){
	        		location.reload();
	        	});
	        	
	       }
	    };
	    xhttp.open("GET", "../php/delete_one_product.php" + queryString, true);
	    xhttp.send();
	});