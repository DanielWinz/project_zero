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
		}
	});

	$(document).ready(function(){

	if(typeof(myObj) != 'undefined' && typeof(myObj.in_progress) != 'undefined'){

	  for(var i=0 ; i < myObj.in_progress.length ; i++) {
	  	
	    $('<div class="item"><img class="img-thumbnail" src="'+myObj.in_progress[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('#inner_in_progress');
	    $('<li data-target="#carousel_in_progress" data-slide-to="'+i+'"></li>').appendTo('#indicator_in_progress');
	
	  	}
	  	
	  $("#inner_in_progress .item").first().addClass('active');
	  $('#indicator_in_progress .carousel-indicators > li').first().addClass('active');
	}
	
	if(typeof(myObj) !== 'undefined' && typeof(myObj.in_queue) !== 'undefined'){
	  for(var i=0 ; i < myObj.in_queue.length ; i++) {
	  	
	    $('<div class="item"><img class="img-thumbnail" src="'+myObj.in_queue[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('#inner_in_queue');
	    $('<li data-target="#carousel_in_queue" data-slide-to="'+i+'"></li>').appendTo('#indicator_in_queue');
	
	  }
	  
	  $('#inner_in_queue .item').first().addClass('active');
	  $('#indicator_in_queue .carousel-indicators > li').first().addClass('active');
	}
	  $('#carousel_in_progress').carousel();
	  $('#carousel_in_queue').carousel();
	  
	
	});