/**
 * @author Daniel
 * This .js uses ROSbridge for connecting to the ROSsystem. A connection to the message streams is established.
 * Depending on the message, error_msg are displayed and can be handled.
 */

var title = $("#title_error_handling");
var body = $("#body_error_handling");
var button = $("#button_error_handling");

$(document).ready(function(){
	
  var ros = new ROSLIB.Ros({
    url : 'ws:192.168.1.129:9090/'
  });
    // adding a listener for the connection event
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  
  // adding a listener for the error event
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/listener',
    messageType : 'std_msgs'
     });

  listener.subscribe(function(message) {
  	console.log(message);
  	switch(message.status){
  		
  		case 0: set_content_obstacle(message);
  		case 1: set_content_detection_error(message);
  		case 2: set_content_grasp_error(message);
   		}
    });
});


function set_content_obstacle(msg){
	
	//Anpassen des Titels im Header
	title.html("Hindernis im Weg");
	$("</span>",{
		class: "glyphicon glyphicon-road"
	}).appendTo(title);
	
	//Anpassen des Contents im Body
	
	$("</alert>,{
		class: "alert alert-info",
		text: "Ein Hindernis wurde auf dem Kommissionierweg zum Ablagefach " + msg.ablagefach + " gefunden. <br>"
			  + "Bitte entfernen Sie das Hindernis."
	}).appendTo(body);
	
	
	//Anpassen der Buttons im Footer
	button.attr("class","btn btn-success"),
	button.text("Hindernis entfernt");

}

function set_content_detection_error(msg){
	
	//Anpassen des Titels im Header
	title.html("Hindernis im Weg");
	$("</span>",{
		class: "glyphicon glyphicon-road"
	}).appendTo(title);
	
	//Anpassen des Contents im Body
	
	$("</alert>,{
		class: "alert alert-info",
		text: "Ein Hindernis wurde auf dem Kommissionierweg zum Ablagefach " + msg.ablagefach + " gefunden. <br>"
			  + "Bitte entfernen Sie das Hindernis."
	}).appendTo(body);
	
	
	//Anpassen der Buttons im Footer
	button.attr("class","btn btn-success"),
	button.text("Hindernis entfernt");

}
