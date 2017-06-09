/**
 * @author Daniel
 */

	$.get("../templates/setting.txt", function(template){
		
			var rendered = Mustache.render(template);			 
			$("#setting").html(rendered);
			
			}
	);
	
	$(document).ready(function(){
		$("#anzahl_regal").slider();
		$("#anzahl_regal").on("slide", function(slideEvt) {
		$("#anzahl_regal_current").text(slideEvt.value);
			});
			
		$("#anzahl_regalfach").slider();
		$("#anzahl_regalfach").on("slide", function(slideEvt) {
			var letter = (String.fromCharCode(96 + slideEvt.value)).toUpperCase();
		$("#anzahl_regalfach_current").text("A - " + letter);
			});
	});
