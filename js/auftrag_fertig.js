/**
 * @author Daniel
 */

function set_content_order_finished(msg){
	
	var queryString = "?nr=" + msg.nummer + "&del=1";
	
	//Anpassen des Titels im Header
	
	$("#title_error_handling").html("Auftrag erfolgreich durchgeführt");
	
	//Anpassen des Contents im Body
	var title = "<strong> Auftragsübersicht: </strong><br>";
	$("#body_error_handling").append(title);
	
	$.ajax({
		url: "../php/fetch_order_content.php" + queryString,
		type: "GET",
		success: function(Obj){
			$("#body_error_handling").html("");
			var myObj = JSON.parse(Obj);
			$("#body_error_handling").append(create_order_content(myObj));	
			$("#error_handling").modal();	
				}
			});
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Schließen");
	$("#button_error_handling").on('click', function(){
		location.reload();
	});
}
