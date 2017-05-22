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
    name : '/depthsense/camera_info',
    messageType : 'sensor_msgs/CameraInfo'
     });

  listener.subscribe(function(message) {
  	
  	$("#error_obstacle").modal();
    console.log('Received message on ' + listener.name + ': ' + message.valueOf);
    console.log('Received message on ' + listener.name + ': ' + message.height);
    console.log('Received message on ' + listener.name + ': ' + message.roi.height);
    listener.unsubscribe();
    
  });
});


function create_error_content(message){
	
}
