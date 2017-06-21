/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Carousel auf der verkürzten Ansicht html geladen.
 * Die Darstellung erfolgt in der Kategorie: in Bearbeitung
 * Die dafür zuständige .php-Datei ist carousel_image_path.php
 */

	var myObj;
	
	$.ajax({
		url: "../php/get_carousel_image_path.rob.php",
		success: function(Obj){
			myObj = JSON.parse(Obj);
			console.log();
		}
	});

	$(document).ready(function(){

	var i = 0;
	if(typeof(myObj) !== 'undefined'){
	  for(var keys in myObj) {
	  	
	    $('<div class="item"><img class="img-thumbnail" src="'+myObj[keys]+'"><div class="carousel-caption">' + keys + '</div>   </div>').appendTo('#inner_in_queue');
	    $('<li data-target="#carousel_in_queue" data-slide-to="'+i+'"></li>').appendTo('#indicator_in_queue');
		i++;
	  }
	  
	  $('#inner_in_queue .item').first().addClass('active');
	  $('#indicator_in_queue .carousel-indicators > li').first().addClass('active');
	}

	  $('#carousel_in_queue').carousel();
	  
	
	});