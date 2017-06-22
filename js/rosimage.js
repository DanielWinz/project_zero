 var counter = 0;
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
  
  listener.subscribe(


  			function(message)
  			 {
  			 	
  			 	  	if(counter == 10)
  						listener.unsubscribe();
  				create_image(message);

			  });
			  
	});


function create_image(msg){
	var image = new Image();
	image.src = 'data:image/jpg;base64,' + msg.data;
	image.width = 200;
	image.height = 200;
	$("#container").html(image);
	
	console.log(getBarcodeFromImage(image));
	
	if(getBarcodeFromImage(image))
		counter = 10;
	
	
	
	
}





