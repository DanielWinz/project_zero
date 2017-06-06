/**
 * @author Daniel
 * Die Login JS Funktion, in der validiert wird, ob ein Benutzer eingeloggt ist.
 * Davon abhängig werden bestimmte Elemente angezeigt/nicht angezeigt.
 */

	$.get("../txt/login.txt", function(template){
		
			var rendered = Mustache.render(template);			 
			$("#login").html(rendered);
			
			}
	);
	
    $.ajax({
		url: "../php/login/authentification.php",
		success: function(Obj){
			if(Obj == 1){
				console.log("in erster IF");				
				change_login_content();
				$("#add_produkt").attr('style', '');
			}
			
			if(Obj == 2){
				console.log("in zweiter IF");
				change_login_content();
				window.location = "../robot_view/html/auftragsuebersicht_short.html";
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