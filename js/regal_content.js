/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite regalbelegung.html geladen.
 * Die Darstellung erfolgt über eine Regalübersicht und eine Itemlist.
 * Die dafür zuständige .php-Datei ist fetch_regal_content.php
 */
	
	var text = "";
	var text_order ="";
	var counter;
	var keys = [];
	
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
