/**
 * @author Daniel
 */
var num = 0;
function inCorrectBox(item){
	var queryString = "?item=" + item + "&id=0";
	$.ajax({
		url: "../php/pointScore.php" + queryString,
		type: 'GET',
		success: function(Obj){
			console.log("Produkt erfolgreich abgelegt");
			if(Obj = 0)
				animatePointScore(-15);
			else
				animatePointScore(10);
			}
	});
}

function checkItemsInStorage(){
	var queryString = "?&id=1";
	$.ajax({
		url: "../php/pointScore.php" + queryString,
		type: 'GET',
		success: function(zahl){
			var res = 32 - zahl;
			animatePointScore(res * (-15));
		}
	});	
}

function isNew(item){
	var queryString = "?item" + item + "&id=2";
	$.ajax({
		url: "../php/pointScore.php" + queryString,
		type: 'GET',
		success: function(zahl){
			if(zahl == 1)
			animatePointScore(10);
		}
	});	
}

function animatePointScore(number){
	num += number;
	
	if(num >= 0)
		$("#punkteStand").removeClass("progress-bar-danger").addClass("progress-bar-success");
	
	if(num < 0){
		$("#punkteStand").removeClass("progress-bar-success").addClass("progress-bar-danger");
		num = num*(-1);
	}
	
	var txt = "Aktueller Punktestand: " + num;
	
	$("#punkteStand").animate(
		{
  			width: ((num/150)*100) + "%"
		}, {queue: false});
		
	$("#punkteStand").html(txt);
};
