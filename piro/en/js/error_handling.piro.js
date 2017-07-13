 /**
 * @author Daniel
 * In dieser .js wird die HRI Schnittstelle definiert.
 * Die Fehlerdarstellung erfolgt in den Kategorien: Objekt im Weg, Objekt nicht erkannt, Objekt nicht gegriffen.
 * Zusätzlich wird abhängig vom Verbindungsstatus die Progressbar erstellt.
 * Als Basis hierfür dient die ROSBridge mit der ROSlibJS
 */

$(document).ready(function(){
  
  var ros = new ROSLIB.Ros({
    url : 'ws:192.168.1.118:9090/'
  });
    // adding a listener for the connection event
  ros.on('connection', function() {
		console.log("verbunden");
		animate_progress_bar(0);
  });
  
  // adding a listener for the error event
  ros.on('error', function(error) {

  });

  ros.on('close', function() {

  });
  
  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/mission_info',
    messageType : 'mission_planner/MissionState'
     });

  listener.subscribe(function(message) {
  	console.log(message);
  	animate_progress_bar(message.execution_state + 1);
  	
  	if(message.execution_state == 0){
  		punkteScore(message);
  	}
  	
  	if(message.selected_object !== ''){
  		createZielobjekt(message.selected_object);
  	} 	
    });
    
    var list = new ROSLIB.Topic({
    ros : ros,
    name : '/depthsense/image_raw/compressed',
    messageType : 'sensor_msgs/CompressedImage'
     });
     
    list.subscribe(function(message){			
  				create_image(message);
			  });
    
});

	function create_image(msg){
	
	var image = new Image();
	image.src = 'data:image/jpg;base64,' + msg.data;
	image.width = 650;
	image.height = 350;
	$("#live_bild").html(image);
	
	
}
