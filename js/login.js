/**
 * @author Daniel
 * Die Login JS Funktion, in der validiert wird, ob ein Benutzer eingeloggt ist.
 * Davon abhängig werden bestimmte Elemente angezeigt/nicht angezeigt.
 */
	$.get("../templates/login.txt", function(template){
		
			var rendered = Mustache.render(template);			 
			$("#login").html(rendered);
			
			}
	);
	
    $.ajax({
		url: "../php/login/authentification.php",
		success: function(Obj){
			if(Obj == 'computer'){	
				change_login_content();
				$("#add_produkt").attr('style', '');
				$("#setting").attr('style', '');
			}
			
			if(Obj == 'roboter'){
				change_login_content();
				
				if($(location).attr('pathname') != '/project_zero/roboterview/html/auftragsuebersicht.rob.html')
					window.location = "../roboterview/html/auftragsuebersicht.rob.html";
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