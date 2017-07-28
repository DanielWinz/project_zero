/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal zu den Produktinformationen geladen.
 * Die Darstellung erfolgt in allen referenzierten Produkten und ist in allen Kategorien zugänglich.
 * Die dafür zuständigen .php-Dateien sind fetch_one_product und delete_one_product.
 */
	
	$(document).on('click', ".product_info_content", function() {
		console.log("in FKT");
		var produktname = $(this).data('id');
		var queryString = "?name=" + produktname;
		
		$.ajax({
		url: "../php/fetch_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
		
			var myObj = JSON.parse(Obj);
			console.log(myObj);
	        create_modal_content(myObj);
		
			}
		});
	});
	

	function create_modal_content(myObj){
		
        $("#del_button").attr('data-id', myObj.produktname);
        var regalfach_neu = [];
        
        //erhöhe Regalfachdarstellung um 1
        for(var key in myObj.regal){
        	var num = myObj.regal[key].split("");
        	zahl = parseInt(num[0])+1;
        	regalfach_neu[key] = parseInt(num[0])+ 1 + num[1];
        }

		$.get("../templates/modal_produkt_info.txt", function(template){
			
			if(myObj.bildpfad == null)
				myObj.bildpfad = "../img/no_img.png";
		
			var rendered = Mustache.render(template,
				{
					
				 bildpfad: myObj.bildpfad,
				 produktname: myObj.produktname,
				 length: myObj.length,
				 width: myObj.width,
				 height: myObj.height,
				 weight: myObj.weight,
				 regal: regalfach_neu,
				 description: myObj.description,
			 
				 });
				 
			 $("#content_product_info").html(rendered);
			
			}
		);        
	}
	

$(document).ready(function(){
	
	$("#del_button").click(function() {
		
		var del = $(this).data('id');
		var queryString = "?name=" + del;
		console.log(queryString);
		$.ajax({
		url: "../php/delete_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
			console.log("success");
			swal("Produkt gelöscht!", "Das Produkt wurde erfolgreich gelöscht. Die Seite wird automatisch neu geladen.", "success");
			//$("#row_placeholder").append("<div class='alert alert-success'> <strong>Produkt erfolgreich gelöscht  </strong><span class='glyphicon glyphicon-ok'></span> </div>");
	        setTimeout(function(){ 
	        	location.reload(); }, 2500);
	        	
	        $("#close_button").on('click',function(){
	        		location.reload();
	        		});
				}
			});
	 });
});