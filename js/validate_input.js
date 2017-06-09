/**
 * @author Daniel
 * In dieser .js wird der Inhalt der Hauptseite formular_auftrag.html validiert.
 * Abhängig von den Eingaben können neue Produkte hinzugefügt oder umgebucht werden.
 * Die dafür zuständige .php-Datei ist auftragsuebersicht.php
 */

    
$(document).ready(function(){
	
	var span  = document.createElement('span');
    var help = document.getElementById("helper");
    var form = document.getElementById("pn");
    
    $(".form-control").change(function(){
    	
    	if($(this).attr('id') == 'pn'){
    		//dont do anything
    	}
    	else{
    		$(this).parent().parent().attr('class','form-group has-success has-feedback');
        	$(this).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
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

    function notInDatabase(status){
    	
      	 	span.setAttribute('class','glyphicon glyphicon-warning-sign form-control-feedback');    	 	 	
    	 	form.parentElement.parentElement.setAttribute('class','form-group has-warning has-feedback');
			form.parentElement.append(span);
			help.innerHTML = 'Produkt nicht in der Datenbank. Bitte geben Sie alle folgenden Informationen ein. Anschließend bestätigen über "Auftrag anlegen". ';
				
			$(".hidden").removeClass('hidden');
			$(".form-control").attr('required',"");
			$("#sel_r").removeAttr('required');
			
						
			$("#change_bin").addClass('hidden');
			$("#confirm1").addClass('hidden');
			$("#sm_button").removeAttr('disabled');
			
			$("#send_content").attr('action', '../php/db_transfer.php?s=0');
			
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
  			
  			$("#confirm").addClass('hidden');
  			    
  			$("#smbutton").removeClass('hidden');  
  			$("#sm_button").removeAttr('disabled');

  			$("#send_content").attr('action', '../php/db_transfer.php?s=1');
  			
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
  				$("#regal").removeClass('hidden');
  				
  				$("#smbutton").removeClass('hidden');  
  			    $("#sm_button").removeAttr('disabled');
  			    
  			    $("#send_content").attr('action', '../php/db_transfer.php?s=1&d=2');
  			});
  			
  	}
});
