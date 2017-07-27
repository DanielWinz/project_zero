/**
 * @author Daniel
 */
	var rect = {
		'stroke-width': 3,
		'stroke': 'black',
		'fill' : 'white'
	};
	
	var coord = {
		'fill' : 'black',
		'text-anchor': 'middle'
	};
	
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
		var dist = obj.target.value.split(".");
		
		coord['x1'] = dist[0];
		coord['y1'] = dist[1];
		rect['x'] = dist[0];
		rect['y'] = dist[1];
		
	});
	
	$(document).on('change','.maße', function(obj){
		var buchstabe = $(this).data('id').substring(2,4);
		var id = obj.target.parentElement.parentElement.parentElement.id;
		var maße = obj.target.value.split(".");
		
		rect['width'] = maße[0];
		rect['height'] = maße[1];
		coord['x'] = (maße[0]/2);
		coord['y'] = (maße[1]/2);
		
		
		$("#svg" + id).append(makeSVG('rect', rect));
		$("#svg" + id).append(makeText(buchstabe, coord));
	});
	
	function showRegal(slideEvt){
		
		$.get("../templates/regalsetup.txt", function(template){
		
		var rendered= "";
		
		for (var a = 0; a < slideEvt.value.newValue; a++){

			rendered += Mustache.render(template,
				 {
				 regalnummer_anzeige: a+1,
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
	
	function makeText(txt,coord){
		var el= document.createElementNS('http://www.w3.org/2000/svg', 'text');
		
                el.setAttribute('x', parseInt(coord['x']) + parseInt((coord['x1'])));
                el.setAttribute('y', parseInt(coord['y']) + parseInt((coord['y1'])));
                el.setAttribute('text-anchor', 'middle');
                
                console.log(el.getAttribute('x'));
                console.log(el.getAttribute('y'));
             el.textContent = txt;
		return el;
	}
	
	$(document).on('click','.btn-default',function(){
	  
	  var id = $(this).data('id');
	  var svg = document.getElementById('svg' + id);
	  var regalfach = 0;
	  
	  $('#svg' + id).children('rect').each(function () {
	 	console.log($(this));
	 	regalfach++; 	
	  });
	  
	  console.log(regalfach);
	  
      var svgString;
      if (window.ActiveXObject) {
        svgString = svg.xml;
      } else {
        var oSerializer = new XMLSerializer();
        svgString = oSerializer.serializeToString(svg);
      }
      console.log('Regal' + id + '.svg', 'data:image/svg+xml;utf8,' + svgString);
      var data = svgString;
      
      	$.ajax({
		url: "../php/regaleinstellung.php?id=1&name=" + id + "&data=" + data + "&rf=" + regalfach,
		type: 'GET',
		success: function(Obj){
			swal("Regal gespeichert!", "Das Regal wurde erfolgreich gespeichert!", "success");
			}
		});
	});
	
	$(document).on('click','.navbar-brand',function(){
		
	swal({
  	title: "Einstellungen zurücksetzen?",
  	text: "Alle bisherigen Regaleinstellungen inklusive den darin enthaltenen Produkte werden gelöscht!",
  	type: "warning",
	showCancelButton: true,
	confirmButtonColor: "#DD6B55",
	confirmButtonText: "Einstellungen zurücksetzen!",
	cancelButtonText: "Abbrechen!",
	closeOnConfirm: false,
	closeOnCancel: false
	},
	function(isConfirm){
		if (isConfirm) {
	  		$.ajax({
			url: "../php/regaleinstellung.php?id=0",
			type: 'GET',
			success: function(Obj){
				swal("Gelöscht!", "Die bisherigen Regaleinstellungen wurden zurückgesetzt.", "success");
				}
			});
  		} else {
   			swal("Abbruch", "Deine Einstellungen sind sicher - nichts wurde gelöscht", "error");
  		}
	});
	});


