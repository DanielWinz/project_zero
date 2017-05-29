/**
 * @author Daniel
 * This .js uses ROSbridge for connecting to the ROSsystem. A connection to the message streams is established.
 * Depending on the message, error_msg are displayed and can be handled.
 */

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
    messageType : 'std_msgs/String'
     });

  listener.subscribe(function(message) {
  	console.log(message);
  	switch(message.status){
  		case 0: set_content_obstacle(message); break;
  		case 1: set_content_detection_error(message); break;
  		case 2: set_content_grasp_error(message); break;
   		}
    });
});


function set_content_obstacle(msg){
	//Anpassen des Titels im Header
	$("#title_error_handling").html("Hindernis im Weg ");
	$("<span/>",{
		class: "glyphicon glyphicon-road"
	}).appendTo("#title_error_handling");
	
	//Anpassen des Contents im Body
	
	$("<div/>",{
		class: "alert alert-info",
		html: "Ein Hindernis wurde auf dem Kommissionierweg zum Ablagefach gefunden. <br>"
			  + "Bitte entfernen Sie das Hindernis."
	}).prependTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Hindernis entfernt");
	
	$("#error_handling").modal();

}

function set_content_detection_error(msg){
	
	//Anpassen des Titels im Header
	$("#title_error_handling").html("Produkt nicht erkannt");
	$("</span>",{
		class: "glyphicon glyphicon-camera"
	}).appendTo("#title_error_handling");
	
	//Anpassen des Contents im Body
	
	$("<div/>",{
		class: "alert alert-info",
		html: "Das Produkt x konnte leider nicht erkannt werden gefunden. <br>"
			  + "Bitte aus Regalfach y entnehmen und manuell zum Ablagefach z bringen."
	}).appendTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Produkt kommissioniert");

}

function set_content_grasp_error(msg){
	
	//Anpassen des Titels im Header
	$("#title_error_handling").html("Produkt nicht gegriffen");
	$("</span>",{
		class: "glyphicon glyphicon-camera"
	}).appendTo("#title_error_handling");
	
	//Anpassen des Contents im Body
	
	$("<div/>",{
		class: "alert alert-info",
		html: "Das Produkt x konnte leider nicht gegriffen werden gefunden. <br>"
			  + "Bitte aus Regalfach y entnehmen und manuell zum Ablagefach z bringen."
	}).appendTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Produkt kommissioniert");

}
