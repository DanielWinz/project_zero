/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Carousel auf der Hauptseite index.html geladen.
 * Die Darstellung erfolgt in der Kategorie: in Bearbeitung
 * Die dafür zuständige .php-Datei ist carousel_image_path.php
 */

	var myObj;
	
	$.ajax({
		url: "../php/get_carousel_image_path.php",
		success: function(Obj){
			myObj = JSON.parse(Obj);
		}
	});

	$(document).ready(function(){  
	  
	  for(var i=0 ; i < myObj.length ; i++) {
	  	
	    $('<div class="item"><img class="img-thumbnail" src="'+myObj[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
	    $('<li data-target="#carousel_preview" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
	
	  	}
	  	
	  $('.item').first().addClass('active');
	  $('.carousel-indicators > li').first().addClass('active');
	  $('#carousel_preview').carousel();
	
	});