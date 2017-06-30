/**
 * @author Daniel
 * In dieser .js wird der Inhalt für das Modal zu den Produktinformationen geladen.
 * Die Darstellung erfolgt in allen referenzierten Produkten und ist in allen Kategorien zugänglich.
 * Die dafür zuständigen .php-Dateien sind fetch_one_product und delete_one_product.
 */
	
	$(document).on('click', ".product_info_content", function() {
		var produktname = $(this).data('id');
		var queryString = "?name=" + produktname;
		
		$.ajax({
		url: "../php/fetch_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
		
			var myObj = JSON.parse(Obj);
	        create_modal_content(myObj);
		
			}
		});
	});	

	function create_modal_content(myObj){
        $("#del_button").attr('data-id', myObj.produktname);
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
				 regal: myObj.regal,
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
			$("#row_placeholder").append("<div class='alert alert-success'> <strong>Produkt erfolgreich gelöscht  </strong><span class='glyphicon glyphicon-ok'></span> </div>");
	        $("#close_button").on('click',function(){
	        		location.reload();
	        		});
				}
			});
	 });
});