 /**
 * @author Daniel
 * In dieser .js wird die HRI Schnittstelle definiert.
 * Die Fehlerdarstellung erfolgt in den Kategorien: Objekt im Weg, Objekt nicht erkannt, Objekt nicht gegriffen.
 * Zusätzlich wird abhängig vom Verbindungsstatus die Progressbar erstellt.
 * Als Basis hierfür dient die ROSBridge mit der ROSlibJS
 */

$(document).ready(function(){
	
  var ros = new ROSLIB.Ros({
    url : 'ws:192.168.1.129:9090/'
  });
    // adding a listener for the connection event
  ros.on('connection', function() {
		console.log("verbunden");
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
    name : '/error_handling',
    messageType : 'mission_planner/Error'
     });

  listener.subscribe(function(message) {
  	var queryString = "?name=" + message.produkt + "&regal=" + message.regal + "&ablage=" + message.ablage;
  	console.log(message.status);
  	switch(message.status){
  		case 0: window.location = "../html/obstacle_detected.rob.html"; break;
  		case 1: window.location = "../php/transfer.php" +  queryString + "&code=1"; break;
  		case 2: set_content_grasp_error(message); break;
  		case 3: listener.unsubscribe();
  				set_content_order_finished(message); break;
   		}
    });
});
