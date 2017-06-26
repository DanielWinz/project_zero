/**
 * @author Daniel
 */

function animate_progress_bar(status){
	console.log(status);
	var width = 1;
	var txt = "";
	
		switch(status){
		
		case 0: width = 25;
				txt = width + " % - Verbindung hergestellt";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 1: width = 40;
				txt = width + " % - Navigieren zu Objekt";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 2: width = 55;
				txt = width + " % - Objekterkennung läuft";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 3: width = 70;
				txt = width + " % - Objekt wird gegriffen";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 4: width = 85;
				txt = width + " % - Transport zu Ablagefach";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 5: width = 100;
				txt = width + " % - Ablegen des Produkts";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 6:
		break;
		
		case 7: width = 25;
				txt = width + " % - Verbindung hergestellt;
				$(".progress-bar-warning").removeClass("hidden");
				break;

		}
	console.log(width);

	$("#robotStatus").animate(
		{
  			width: width + "%"
		}, {queue: false});
		
	$("#robotStatus").html(txt);
	
 }
 
