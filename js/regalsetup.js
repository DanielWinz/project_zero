/**
 * @author Daniel
 */
	var rect = {};
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
	
	$(document).on('change','.abstand', function(obj){
		$(this).attr('disabled',true);
		var id = obj.target.parentElement.parentElement.parentElement.id;
		var distance = obj.target.value;
		console.log(typeof(distance));
		console.log(distance);
		console.log(distance.split("."));
		var coord = distance.split(".");
		rect['x'] = coord[0];
		rect['y'] = coord[1];
		
	});
	
	$(document).on('change','.maße', function(obj){
		var id = obj.target.parentElement.parentElement.parentElement.id;
		var maße = obj.target.value.split(".");
		rect['width'] = maße[0];
		rect['height'] = maße[1];
		
		$("#svg" + id).append(makeSVG('rect', rect));
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
	
    function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
	}


