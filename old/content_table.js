/**
 * @author Daniel
 * This .js uses an AJAX-Request for fetching the ten most recent products.
 * They are displayed in a table whereas the table columns are defined in the index.php 
 */
		
	var text1 = "";

	$.ajax({
		url: "../php/mdb_fetch_table.php",
		success: function(Obj){
			
			var myObj = JSON.parse(Obj);
            document.getElementById("content_table").innerHTML =
            create_table(myObj);
		}
	});	
    
/**
 * This functions creates the HTML Output displayed in the index.php by using the result of the AJAX request.
 * @param {Object} obj: containing the ten most recent products, values are matched to the keywords.
 */
    function create_table(obj){
    	
        for(i = 0; i < 10; i++){
        
        if(obj.regal[i] == null)
        	obj.regal[i] = "nicht zugeordnet";
        	
	    text1 += 
			  "<tr>" +
                    "<td>" + obj.auftragsnummer[i] + "</td>" + 
                    "<td>" + obj.produktname[i] + "</td>" + 
                    "<td>" + obj.weight[i] + "</td>" + 
                    "<td>" + obj.length[i] + "</td>" + 
                    "<td>" + obj.height[i] + "</td>" + 
                    "<td>" + obj.length[i] + "</td>" + 
                    "<td>" + obj.regal[i] + "</td>" + 
                "</tr>";
		}

	    return text1;		
    }
