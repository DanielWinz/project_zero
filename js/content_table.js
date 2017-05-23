/**
 * @author Daniel
 * This .js uses an AJAX-Request for fetching the ten most recent products.
 * They are displayed in a table whereas the table columns are defined in the index.php 
 */
		
	var text1 = "";
	var xhttp;
	
	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        	var myObj = JSON.parse(this.responseText);
            document.getElementById("content_table").innerHTML =
            create_table(myObj);
       }
    };
    xhttp.open("GET", "../php/mdb_fetch_table.php", true);
    xhttp.send();
    
    
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
