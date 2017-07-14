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
			
			
				change_login_content();
			
		}
	});
	
	function change_login_content(){
		$("#content_login").empty();
		$("#content_login").append('<p>You are logged in as admin</p>');
		$("<button/>",{
					class: "btn btn-primary btn-block",
					html: "Logout",
					on: { 
						"click": function(){
							window.location = "../../en/php/login/logout.php";
						}
					}
		}).appendTo('#content_login');
		$("<br/>").appendTo('#content_login');
	} 