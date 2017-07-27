 var counter = 0;
 var msg;
 
$(document).ready(function(){
	
  var ros = new ROSLIB.Ros({
    url : 'ws:192.168.1.129:9090/'
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
  			 	msg = message;
  				create_image(message);
  				
			  });
			  
	});

function validateBarcode(){
	
	for(var i = 0; i < 10; i++){	
	Quagga.decodeSingle({
    decoder: {
        readers: ["code_128_reader","ean_reader"] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    src: 'data:image/jpg;base64,' + msg.data
	}, function(result){
    if(result.codeResult) {
        console.log("result", result.codeResult.code);
    } else {
        console.log("not detected");
    }
		});
	}
}
function create_image(msg){
	
	var image = new Image();
	image.src = 'data:image/jpg;base64,' + msg.data;
	image.width = 1000;
	image.height = 500;
	$("#container").html(image);
	
	
}

  				





