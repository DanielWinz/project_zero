/**
 * @author Daniel
 */

function animate_progress_bar(status){
	console.log(status);
	var width = 1;
	var txt = "";
	
		switch(status){
		
		case 0: width = 25;
				txt = width + " % - connected to UR5";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 1: width = 40;
				txt = width + " % - navigating to object";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 2: width = 55;
				txt = width + " % - object detection in process";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 3: width = 70;
				txt = width + " % - object is being grasped";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 4: width = 85;
				txt = width + " % - transport to storage compartment";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 5: width = 100;
				txt = width + " % - product is stored";
				$(".progress-bar-warning").addClass("hidden");
				break;
		
		case 6: txt = width + " % - grasping tool is being changed";
				$(".progress-bar-warning").addClass("hidden");
				break;
	
		case 7: width = 25;
				txt = width + " % - an error has been detected";
				break;  

		}
	console.log(width);

	$("#robotStatus").animate(
		{
  			width: width + "%"
		}, {queue: false});
		
	$("#robotStatus").html(txt);
	
 }
 
