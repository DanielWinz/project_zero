$(document).ready(function(){
	
  var ros = new ROSLIB.Ros({
    url : 'ws:192.168.1.117:9090/'
  });
    // adding a listener for the connection event
  ros.on('connection', function() {
  	console.log("in connection");

  });
  
  // adding a listener for the error event
  ros.on('error', function(error) {
  	console.log("in error");

  });

  ros.on('close', function() {
  	console.log("in close");

  });
  
  // Subscribing to a Topic
  // ----------------------

  var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/depthsense/image_raw/compressed',
    messageType : 'sensor_msgs/CompressedImage'
     });
  var counter = 0;
  listener.subscribe(function(message) {
  	counter++;
  	create_image(message);
  	setTimeout(create_image,5000);
  	console.log(message.format);
  	console.log(message.data);
  	
  	if(counter == 10){
  		listener.unsubscribe();
  	}

    });
});


function create_image(msg){
	var image = new Image();
	image.height = 500;
	image.width = 500;
	image.src = 'data:image/jpg;base64,' + msg.data;
	$("#container").append(image);
	
}
