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
		url: "../php/regalSetup.php?id=" + aktuelles_regal,
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
			createStandardView(myObj);

		}
	});
	
	function createStandardView(myObj){
			
			var inhalt = "";
			
			for (var a = 0; a < myObj['info'].length ; a++){
				inhalt += "<li id='" + a + "' value='" + a + "'><a href='#'>Regal " + (a+1) + "</a></li>";
			};
			
			$("#regalbild").html( myObj['regal']['bildpfad']);
			$("#anzahl_regal").append(inhalt);
			$("#anzahl_regal").children().first().attr("class","active");
			
			
			$.get("../templates/regalInfo.txt", function(template) {
				
				var rendered = Mustache.render(template,
				 {
				 regalnummer: 1,
				 regalfächer: myObj['regal']['anzahl'],
				 });
				 
				 $("#regalinfo").html(rendered);
			});
			
			
	}
	
	$(document).ready(function () {
		
		$(".nav-tabs > li").click(function (e) {
			 $(".nav-tabs > li.active").removeClass('active');
   			 $(this).addClass('active');
   			 console.log($(this).attr('id'));
   			 aktuelles_regal = $(this).attr('id');
   			 
   				$.ajax({
					url: "../php/regalSetup.php?id=" + aktuelles_regal,
					success: function(Obj){
						
						var myObj = JSON.parse(Obj);
						console.log(myObj);
						createStandardView(myObj);

		}
	}); 
   			 
   			 
   			 
   			 
   			 
   			 
   			 
		});
		
	});
	
	$.ajax({
		url: "../php/fetch_regal_content.php",
		type: 'GET',
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
            create_preview(myObj);
            append_images(myObj);
		}
	});
    
  	function create_preview(myObj){
  		
  		counter = 0;
  		
  		for(var key in myObj){
  			
  			keys[counter] = key;
  		
  			var text = '<ul>';
  	
  			jQuery('<h3/>', {
  				class: 'sub-header',
		    	id: key,
		    	text: 'Regalfach ' + key + ' ',
			}).appendTo('#script_content');
			
			jQuery('<div/>', {
  				class: 'row',
		    	id: 'lg' + key,
			}).appendTo('#script_content');
		
			counter++;	
			
  		}
  		
  		counter = 0;
  		
   		$("h3").each(function(index) {
			
			jQuery('<span/>',{
				class: 'glyphicon glyphicon-edit',
				'data-id': keys[counter],
				style: "color:green; float:right",
				'data-target': '#produkt_umbuchen',
				'data-toggle': 'modal'
			}).appendTo($(this));
			
			counter++;
		  });

  	}
  	
  	function append_images(myObj){
  		$.get("../templates/image_gallery.txt", function(template){
		
			var rendered= "";
			for (var key in myObj){
				var inside = myObj[key];
					for(var a = 0; a < inside.produkt.length; a++){
							
							if(inside.bildpfad[a] == null)
								inside.bildpfad[a] = "../img/no_img.png";
								
						rendered = Mustache.render(template,
							{
							 bildpfad: inside.bildpfad[a],
							 name: inside.produkt[a]
							 });
							 
					    console.log(rendered);
						console.log(key);
						$('#lg' + key).append(rendered);
						
						}	
				}
						
		});	
  	}
