/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite regalbelegung.html geladen.
 * Die Darstellung erfolgt über eine Regalübersicht und eine Itemlist.
 * Die dafür zuständige .php-Datei ist fetch_regal_content.php
 */
	var aktuelles_regal = 0;
	var text = "";
	var text_order ="";
	var counter;
	var keys = [];
	
	$.ajax({
		url: "../php/regalsetup.php?id=" + aktuelles_regal,
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			console.log(myObj);
			createStandardView(myObj);
			create_preview(myObj);
			append_images(myObj);

		}
	});
	
	$(document).ready(function () {
		
		$(".nav-tabs > li").click(function (e) {
			 $(".nav-tabs > li.active").removeClass('active');
   			 $(this).addClass('active');
   			 console.log($(this).attr('id'));
   			 aktuelles_regal = $(this).attr('id');
   			 
   			$.ajax({
					url: "../php/regalsetup.php?id=" + aktuelles_regal,
					success: function(Obj){
						
						var myObj = JSON.parse(Obj);
						console.log(myObj);
						createView(myObj);
						create_preview(myObj);
						append_images(myObj);

					}
			}); 
   				 
		});
		
	});
	
	function createStandardView(myObj){
			
			var inhalt = "";
			var gesamtzahl = 0;
			
			for (var a = 0; a < myObj['info'].length ; a++){
				inhalt += "<li id='" + a + "' value='" + a + "'><a href='#'>Regal " + (a+1) + "</a></li>";
			};
			
			$("#regalbild").html( myObj['regal']['bildpfad']);
			$("#anzahl_regal").html(inhalt);
			$("#anzahl_regal").children().first().attr("class","active");
			
			for(var i = 0; i < myObj['regal']['anzahl']; i++){
				gesamtzahl += myObj['regal'][String.fromCharCode(65 + i)].length;
			}
			$.get("../templates/regalInfo.txt", function(template) {
			
			var rendered = Mustache.render(template,
				 {
				 regalnummer: myObj['regal']['regal'] + 1,
				 regalfächer: myObj['regal']['anzahl'],
				 anzahlProdukte: gesamtzahl
				 });
				 
			$("#regalinfo").html(rendered);
				
			console.log("in der TEMPLATES");
			console.log("das ist mein Objekt: " + myObj);
	    	console.log("in der DAZU");
			var dazu = ""; 
				for(var a  = 0; a < myObj['regal']['anzahl'] ; a++){
					dazu += "<li> Regalfach " + String.fromCharCode(65 + a) + ": " + myObj['produkte'][aktuelles_regal + String.fromCharCode(65 + a)].length +" Produkt(e) </li>";
				}	
			
			$("#add").append(dazu);
					 
			});
					
			
	}
	
	function createView(myObj){
			var gesamtzahl = 0;
			
			for(var i = 0; i < myObj['regal']['anzahl']; i++){
				gesamtzahl += myObj['regal'][String.fromCharCode(65 + i)].length;
			}
			
			$("#regalbild").html( myObj['regal']['bildpfad']);
		
			$.get("../templates/regalInfo.txt", function(template) {
				
			var rendered = Mustache.render(template,
				 {
				 regalnummer: myObj['regal']['regal'] + 1,
				 regalfächer: myObj['regal']['anzahl'],
				 anzahlProdukte: gesamtzahl
				 });
				 
			$("#regalinfo").html(rendered);
				
			console.log("in der TEMPLATES");
	    	console.log("in der DAZU");
	    	console.log(aktuelles_regal);
			var dazu = ""; 
				for(var a  = 0; a < myObj['regal']['anzahl'] ; a++){
					if(myObj['produkte'][aktuelles_regal + String.fromCharCode(65 + a)] != null)
					dazu += "<li> Regalfach " + String.fromCharCode(65 + a) + ": " + myObj['produkte'][aktuelles_regal + String.fromCharCode(65 + a)].length +" Produkt(e) </li>";
				}	
			
			$("#add").append(dazu);
					 
			});
	}

  	function create_preview(myObj){
  		console.log("in Preview");
  		counter = 0;
  		$("#script_content").empty();
  		
  		for(var x = 0; x < myObj['regal']['anzahl'] ; x++){
  			
  			var buchstabe = String.fromCharCode(65 + x);
 			keys[counter] = buchstabe;
 			console.log(counter);
 			console.log(keys[counter]);
 			console.log(buchstabe);
  			var text = '<ul>';
  	
  			jQuery('<h3/>', {
  				class: 'sub-header',
		    	id: buchstabe,
		    	text: 'Regalfach ' + buchstabe + ' ',
			}).appendTo('#script_content');
			
			jQuery('<div/>', {
  				class: 'row',
		    	id: 'lg' + buchstabe,
			}).appendTo('#script_content');
		
			counter++;	
			
  		}
  		
  		counter = 0;
  		
   		$("h3").each(function(index) {
   			console.log($(this));
   			console.log("Das ist der Counterwert" + counter);
   			console.log("das ist der Indexwert" + index);
			console.log("das ist der buchstabe" + keys[counter]);
			jQuery('<span/>',{
				class: 'glyphicon glyphicon-edit',
				'data-id': aktuelles_regal + "," + keys[counter],
				style: "color:green; float:right",
				'data-target': '#produkt_umbuchen',
				'data-toggle': 'modal'
			}).appendTo($(this));
			
			counter++;
		 });
		 
		 counter = 0;

  	}
  	
  	function append_images(myObj){
  		$.get("../templates/image_gallery.txt", function(template){
		
			var rendered= "";
			for (var key in myObj['bildpfad']){
				var inside = myObj['bildpfad'][key];
				console.log(inside);
					for(var a = 0; a < inside.length; a++){
							
							if(inside[a] == null)
								inside[a] = "../img/no_img.png";
						console.log(inside[a]);
						rendered = Mustache.render(template,
							{
							 bildpfad: inside[a],
							 name: myObj['regal'][key][a]
							 							 });
							 
					    console.log(rendered);
						console.log(key);
						$('#lg' + key).append(rendered);
						
						}	
				}
						
		});	
  	}
