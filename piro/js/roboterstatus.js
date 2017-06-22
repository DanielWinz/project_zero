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
				break;
		
		case 1: width = 40;
				txt = width + " % - Navigieren zu Objekt";
				break;
		
		case 2: width = 55;
				txt = width + " % - Objekterkennung läuft";
				break;
		
		case 3: width = 70;
				txt = width + " % - Objekt wird gegriffen";
				break;
		
		case 4: width = 85;
				txt = width + " % - Transport zu Ablagefach";
				break;
		
		case 5: width = 100;
				txt = width + " % - Ablegen des Produkts";
				break;
		
		case 6:
		break;
		
		case 7:
		break;

		}
	console.log(width);

	$("#robotStatus").animate(
		{
  			width: width + "%"
		}, {queue: false});
		
	$("#robotStatus").html(txt);
	
 }