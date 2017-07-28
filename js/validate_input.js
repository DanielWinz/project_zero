/**
 * @author Daniel
 * In dieser .js wird der Inhalt der Hauptseite formular_auftrag.html validiert.
 * Abhängig von den Eingaben können neue Produkte hinzugefügt oder umgebucht werden.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

    
$(document).ready(function(){
	var url = "";
	var span  = document.createElement('span');
    var help = document.getElementById("helper");
    var form = document.getElementById("pn");
    var files;
    
    $(".form-control").change(function(){
    	
    	if($(this).attr('id') == 'pn'){
    		//dont do anything
    	}
    	else if($(this).attr('id') == 'barcode'){
    		//nada
    	}
    	else{
    		$(this).parent().parent().attr('class','form-group has-success has-feedback');
        	$(this).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
    	}  
        
    });
    
    $.ajax({
    	url: "../php/getRegalSetup.php",
    	success: function(Obj){
    		var obj = JSON.parse(Obj);
    		setRegalEinstellungen(obj);
    	}
    });
    
    // If the input of the productname changes, we wanna check if the product is already in the database
    $("#pn").change(function() {
    
	    var queryString = "?name=" + $(this).val();
	    
		$.ajax({
			url: "../php/validating.php" + queryString,
			type: 'GET',
			success: function(Obj){
			
				var myObj = JSON.parse(Obj);
	        	
				switch(myObj){
					case 0:	notInDatabase(0);
							break;
							
					case 1: noMatchingBin(1);
					        break;
					        
					case 2: orderReady(2);
							break;
				}
			}
		});	    
    });
    
    $("#startScan").click(function(){
    	$("#livestream_scanner").modal();
    });

    function notInDatabase(status){
    	
      	 	span.setAttribute('class','glyphicon glyphicon-warning-sign form-control-feedback');    	 	 	
    	 	form.parentElement.parentElement.setAttribute('class','form-group has-warning has-feedback');
			form.parentElement.append(span);
			help.innerHTML = 'Produkt nicht in der Datenbank. Bitte geben Sie alle folgenden Informationen ein. Anschließend bestätigen über "Produkt anlegen". ';
				
			$(".hidden").removeClass('hidden');
			$(".form-control").attr('required',"");
			$("#sel_r").removeAttr('required');
			
			$("#livestream_scanner input:file").addClass('hidden');		
			$("#change_bin").addClass('hidden');
			$("#confirm1").addClass('hidden');
			$("#sm_button").removeAttr('disabled');
			url="../php/db_transfer.php?s=0";
			//$("#send_content").attr('action', '../php/db_transfer.php?s=0');
			
    }
    function noMatchingBin(status,decider){
			
    	 	span.setAttribute('class','glyphicon glyphicon-warning-sign form-control-feedback');
    	 	form.parentElement.parentElement.setAttribute('class','form-group has-warning has-feedback');
			form.parentElement.append(span);
			help.innerHTML = 'Produkt in der Datenbank. Bitte buchen Sie das Produkt in ein Regalfach und wählen Sie die Box aus, in der das Produkt gelagert werden soll';
  			
  			$(".form-group").addClass('hidden');
  			$(".form-control").removeAttr('required');
	
  			$("#pname").removeClass('hidden');
  			$("#regal").removeClass('hidden');
  			$("#regalfach").removeClass('hidden');
  			$("#livestream_scanner input:file").addClass('hidden');	
  			$("#smbutton").removeClass('hidden');
  			$("#sm_button").attr('value','Regalfach zuordnen');  
  			$("#sm_button").removeAttr('disabled');
			
			url="../php/db_transfer.php?s=1";
  			//$("#send_content").attr('action', '../php/db_transfer.php?s=1');
  			
  	}  			
  	function orderReady(status){
  		
  			var decider;
  			span.setAttribute('class','glyphicon glyphicon-ok form-control-feedback');
  			form.parentElement.parentElement.setAttribute('class','form-group has-success has-feedback');
  			form.parentElement.append(span);
  			help.innerHTML = "Das Produkt wurde gefunden und kann in einen Auftrag eingebunden werden";
  			
  			$(".form-group").addClass('hidden');
  			$("#pname").removeClass('hidden');
  			
  			$("#change_bin").removeClass('hidden');
  			$("#change_bin").click(function(){
  				$("#change_bin").addClass('hidden');
  				$("#regalfach").removeClass('hidden');
  				
  				$("#smbutton").removeClass('hidden');  
  			    $("#sm_button").removeAttr('disabled');
  			    
  			    url="../php/db_transfer.php?s=1&d=2";
  			  //  $("#send_content").attr('action', '../php/db_transfer.php?s=1&d=2');
  			});
  			
  	}
  	
  	function setRegalEinstellungen(myObj){
  			
  			var regalTxt = "<option> Keines </option>";
    		var regalFachTxt = "<option> Keines </option>";

    		for(var a = 0; a < myObj.length; a++){
    			regalTxt += "<option>" + (a+1) + "</option>";
    		}
    		
    		for(var b = 0; b < myObj[0] ; b++){
    			regalFachTxt += "<option>" + String.fromCharCode(65 + b) + "</option>";
    		}
    		
    		$("#wahlRegal")[0].innerHTML = regalTxt;
    		$("#sel_r")[0].innerHTML = regalFachTxt;
  			
  			
  			$("#wahlRegal").on('change', function(){
			console.log("in FKT");
    		var inhalt = "";
    		var pos = $(this)[0].value;
    		
    		for(var a = 0; a < myObj[pos-1]; a++){
    			inhalt += "<option>" + String.fromCharCode(65 + a) + "</option>";
    		}
    		
    		$("#sel_r")[0].innerHTML = inhalt;
    	
    	});
  	}
 

	$("#send_content").submit(function(e) {

    $.ajax({
           type: "POST",
           url: url,
           cache: false,
           data: $("#send_content").serialize(), // serializes the form's elements.
           success: function(data)
           {	 	   
			  	swal({
				  title: "Produkt angelegt",
				  text: "Das Produkt wurde erfolgreich angelegt!",
				  type: "success",
				  showCancelButton: true,
				  confirmButtonClass: "btn-default",
				  confirmButtonText: "neues Produkt",
				  cancelButtonText: "zur Produktübersicht",
				  closeOnConfirm: true,
				  closeOnCancel: false
				},
				function(isConfirm) {
				  if (isConfirm) {
				  	location.href = "formular_auftrag.html";
				  } else {
				    location.href = "produktoverview.html";
			  		}	
				}
				);
           }
         });

	});
	
});
	