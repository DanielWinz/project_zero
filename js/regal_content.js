/**
 * @author Daniel
 * In dieser .js wird der Inhalt für die Hauptseite regalbelegung.html geladen.
 * Die Darstellung erfolgt über eine Regalübersicht und eine Itemlist.
 * Die dafür zuständige .php-Datei ist fetch_regal_content.php
 */
	
	var text = "";
	var text_order ="";
	
	$.ajax({
		url: "../php/fetch_regal_content.php",
		type: 'GET',
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
            create_preview(myObj);
		}
	});
    
    $.ajax({
		url: "../php/login/authentification.php",
		success: function(Obj){
			if(Obj == 1){				
				change_login_content();
				$("#add_produkt").attr('style', '');
			}
		}
	});
	
	function change_login_content(){
		$("#content_login").empty();
		$("#content_login").append('<p>Sie sind bereits als Admin angemeldet</p>');
		$("<button/>",{
					class: "btn btn-primary btn-block",
					html: "Ausloggen",
					on: { 
						"click": function(){
							window.location = "../php/login/logout.php";
						}
					}
		}).appendTo('#content_login');
		$("<br/>").appendTo('#content_login');
	} 
    
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
				text += "<li class='list-group-item'><a class='product_info_content' href='#product_info_regal' data-toggle='modal' data-target='#product_info_regal'"
						+ "data-id='" + inside[counter] + "'</a>" + inside[counter] + "</li>";
				counter++;
			}
		text += '</ul>';
		$('#lg' + key).append(text);
			
  		}
  		
  	}
