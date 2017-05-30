/**
 * @author Daniel
 * This .js uses an AJAX-Request for fetching all products sorted alphabetically.
 * They are displayed in a table whereas the table columns are defined in the produktoverview.html
 */
		
	var text1 = "";
	var xhttp;
	
	
	$.ajax({
		url: "../php/fetch_all_products.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
            create_table(myObj);
		
		}
	});
  
    
/**
 * This functions creates the HTML Output displayed in the produktoverview.html by using the result of the AJAX request.
 * @param {Object} obj: containing the ten most recent products, values are matched to the keywords.
 */
    function create_table(obj){
    	
    	var counter = 0; 
    	text1 = "<div id='jumbo_placeholder'></div><p> Aktuell befinden sich <strong>" + obj.produktname.length + "</strong> Produkte in der Datenbank.</p>";
    	
        for(i = 0; i < obj.produktname.length; i++){
        
	        if(obj.regal[i] == null){
	        	obj.regal[i] = "nicht zugeordnet";
	        	counter++;
	        }
        
        var tr = document.createElement('tr');
        
        var td_product = document.createElement('td');
        
        var anchor = document.createElement('a');
        anchor.setAttribute('data-toggle','modal');
        anchor.setAttribute('data-target','#product_info');
        anchor.setAttribute('data-id',obj.produktname[i]);
        anchor.setAttribute('href', '#product_info');
        anchor.setAttribute('class', 'product_info_content');
        anchor.innerHTML = obj.produktname[i];
        td_product.appendChild(anchor);
     	
        var td_weight = document.createElement('td');
        td_weight.innerHTML = obj.weight[i];
        
        var td_height = document.createElement('td');
        td_height.innerHTML = obj.height[i];
        
        var td_width = document.createElement('td');
        td_width.innerHTML = obj.width[i];
        
        var td_length = document.createElement('td');
        td_length.innerHTML = obj.length[i];
        
        var td_regal = document.createElement('td');
        var anchor2 = document.createElement('a');
        anchor2.setAttribute('href', "regalbelegung.html");
        anchor2.innerHTML = obj.regal[i];
        td_regal.appendChild(anchor2);
        
        tr.appendChild(td_product);
        tr.appendChild(td_weight);
        tr.appendChild(td_height);
        tr.appendChild(td_width);
        tr.appendChild(td_length);
        tr.appendChild(td_regal);
        $("#content_table").append(tr);
    }
        text1 += "Wobei " + counter + " Produkte noch keinem Regal <a href='#match_bins' data-toggle='modal' data-target='#match_bins'> zugewiesen </a> worden sind.";
        $("#jumbo_content").append(text1);
   }
	
	$(document).on('click', ".product_info_content", function() {
		
		var produktname = $(this).data('id');
		var queryString = "?name=" + produktname;
		
		$.ajax({
		url: "../php/fetch_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
		
			var myObj = JSON.parse(Obj);
	        document.getElementById("content_product_info").innerHTML =
	        create_modal_content(myObj);
		
			}
		});
	});

	// mit MUSTACHE
	function create_modal_content(myObj){
        console.log(myObj);
        $("#del_button").attr('data-id', myObj.produktname);
        text_order =  "<div class='container-fluid'>" +
                      "<div class='row' id='row_placeholder'></div>" +
                      "<div class='row'>" +
                      "<div class='col-sm-6'> <img src='" + myObj.bildpfad + "' width='150' height='150' class='img-responsive'> </div>"+ 
                      "<div class='col-sm-6'> <strong> Produkt: </strong>" + myObj.produktname  + "<br><br>" +
        			  "<strong> Dimension: </strong>" + myObj.length + " x " + myObj.width + " x " + myObj.height  + "<br><br>" +
        			  "<strong> Gewicht: </strong>" + myObj.weight + "<br><br>" +
        			  "<strong> lagert in: </strong>" + myObj.regal + "<br></div></div>" + 
        			  "<div class='row placeholder'></div><div class='well'> <strong> Beschreibung: </strong>" + myObj.description + "</div></div>";
        
        return text_order;
	}
	
	$("#del_button").click(function() {
		var del = $(this).data('id');
		var queryString = "?name=" + del;
		
		$.ajax({
		url: "../php/delete_one_product.php" + queryString,
		type: 'GET',
		success: function(Obj){
		
			$("#row_placeholder").append("<div class='alert alert-success'> <strong>Produkt erfolgreich gelöscht</strong><span class='glyphicon glyphicon-ok'></span> </div>");
	        $("#close_button").on('click',function(){
	        		location.reload();
	        		});
				}
			});
	 });
