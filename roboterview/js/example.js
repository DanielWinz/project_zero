/**
 * @author Daniel
 */


$(document).ready(function(){
	
	$.ajax({
		url: "../php/transfer.php",
		success: function(Obj){
			console.log(Obj);
			var myObj = JSON.parse(Obj);
			$("#inhalt_not_detected").html(myObj);
		}
	});
});
