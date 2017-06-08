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
  	
  	if(message.status == 3){
  		set_content_order_finished(message);
  	}
  	
  	else{
  		
  		localStorage.setItem('message', JSON.stringify(message));
  		location.href = "../html/error_handling.rob.html";	
  	}
  	
    });
});
