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
  	console.log("in connection");
    animate_progress_bar(0);
  });
  
  // adding a listener for the error event
  ros.on('error', function(error) {
  	console.log("in error");
    animate_progress_bar(1);
  });

  ros.on('close', function() {
  	console.log("in close");
    animate_progress_bar(2);
  });
  
  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/error_handling',
    messageType : 'mission_planner/Error'
     });

  listener.subscribe(function(message) {
  	console.log(message.status);
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
		html: "Ein Hindernis wurde auf dem Kommissionierweg zum Ablagefach " + msg.ablage + "gefunden. <br>"
			  + "Bitte entfernen Sie das Hindernis."
	}).prependTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Hindernis entfernt");
	
	$("#error_handling").modal();

}

function set_content_detection_error(msg){
	
	//Anpassen des Titels im Header
	$("#title_error_handling").html("Produkt nicht erkannt ");
	$("<span/>",{
		class: "glyphicon glyphicon-camera"
	}).appendTo("#title_error_handling");
	
	//Anpassen des Contents im Body
	
	$("<div/>",{
		class: "alert alert-info",
		html: "Das Produkt <a href='#product_info' data-target='#product_info' data-toggle='modal' data-id='" 
			  + msg.produkt + "' class='product_info_content alert-link'>"
			  + msg.produkt + " </a> konnte leider nicht erkannt werden. <br>"
			  + "Bitte aus Regalfach " + msg.regal + " entnehmen und manuell zum Ablagefach " + msg.ablage + " bringen."
	}).appendTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Produkt kommissioniert");
	
	$("#error_handling").modal();
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
		html: "Das Produkt <a href='#product_info' data-target='#product_info' data-toggle='modal' data-id='" 
			  + msg.produkt + "' class='product_info_content alert-link'>"
			  + msg.produkt + " </a> konnte leider nicht gegriffen werden. <br>"
			  + "Bitte aus Regalfach " + msg.regal + " entnehmen und manuell zum Ablagefach " + msg.ablage + " bringen."
	}).appendTo("#body_error_handling");
	
	
	//Anpassen der Buttons im Footer
	$("#button_error_handling").attr("class","btn btn-success"),
	$("#button_error_handling").text("Produkt kommissioniert");

	$("#error_handling").modal();
}

function animate_progress_bar(status){
	
	var elem = document.getElementById("progressbar");
		
		switch(status){
			case 0: elem.setAttribute("class","progress-bar progress-bar-success progress-bar-striped active");
					elem.innerHTML = "Die Verbindung zum UR5 wurde hergestellt";
					break;
			case 1: elem.setAttribute("class","progress-bar progress-bar-warning progress-bar-striped active");
					elem.innerHTML = "Es wurde ein Fehler festgestellt.";
					break;
			case 2: elem.setAttribute("class","progress-bar progress-bar-danger progress-bar-striped active");
					elem.innerHTML = "Die Verbindung zum UR5 konnte nicht hergestellt werden";
					break;
		}
		
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
 }