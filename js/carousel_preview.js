/**
 * @author Daniel
 */

	var myObj;

	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    }
    
    else {    
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	myObj = JSON.parse(this.responseText);
       }
    };
    xhttp.open("GET", "../php/get_carousel_image_path.php", true);
    xhttp.send();

	$(document).ready(function(){  
	  for(var i=0 ; i < myObj.length ; i++) {
	    $('<div class="item"><img src="'+myObj[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
	    $('<li data-target="#carousel_preview" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
	
	  }
	  $('.item').first().addClass('active');
	  $('.carousel-indicators > li').first().addClass('active');
	  $('#carousel-example-generic').carousel();
	});