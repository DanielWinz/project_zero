/**
 * @author Daniel
 */
	
	$(document).ready(function(){
		
		$("#anzahl_regal").slider();
		$("#anzahl_regal").on("change", function(slideEvt){
			console.log(slideEvt);
			$("#anzahl_regal_current").text(slideEvt.value.newValue);
			showRegal(slideEvt);
		});
		
	});
	
	$(document).on('change','.regalfach',function(slideEvt){
		
		var num = $(this).data('id');
		var letter = (String.fromCharCode(65 + slideEvt.value.newValue));
		$("#anzahl_regalfach_current" + num).text("A - " + letter);
		
		$.get("../templates/regalfach.txt", function(template){
			
			var temp= "";
			for (var a = 0; a <= slideEvt.value.newValue; a++){
				
				temp += Mustache.render(template,
					{
						regalfach: String.fromCharCode(65 + a),
					});
			
			}
				
			$("#" + num).html(temp);
			
		});
		
	});
	
	$(document).on('change','.form-control', function(obj){
		var id = $(this).data('id');
		console.log(id);
		console.log(obj);
		console.log(obj.target.parentElement.parentElement.parentElement.id);
		console.log(obj.target.value);
	});
	
	function showRegal(slideEvt){
		
		$.get("../templates/regalsetup.txt", function(template){
		
		var rendered= "";
		
		for (var a = 0; a < slideEvt.value.newValue; a++){

			rendered += Mustache.render(template,
				 {
				 regalnummer: a,
				 });
		
		}
			
		$("#showRegal").html(rendered);
		
		for (var i = 0; i < slideEvt.value.newValue; i++){
			
			$("#anzahl_regalfach" + i).slider();
		}
			
		});
		
	}

