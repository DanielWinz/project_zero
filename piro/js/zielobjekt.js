/**
 * @author Daniel
 */
function createZielobjekt(name){
	console.log("produktname" + name);
	var queryString = "?name=" + name;
	$.ajax({
		url: "../php/fetch_one_product.php" + queryString,
		type: "GET",
		success: function(Obj){
			var myObj = JSON.parse(Obj);
			$.get("../templates/produkt_info.txt", function(template){
			console.log(myObj);
			if(myObj.bildpfad == null)
				myObj.bildpfad = "../../img/no_img.png";
		
			var rendered = Mustache.render(template,
				{
					
				 bildpfad: myObj.bildpfad,
				 produktname: myObj.produktname,
				 length: myObj.length,
				 width: myObj.width,
				 height: myObj.height,
				 weight: myObj.weight,
				 description: myObj.description,
			 
				 });
				 
			 $("#row_in_progress").html(rendered);
			
			}
		);        
		
		}
	});
}
