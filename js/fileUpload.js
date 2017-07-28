/**
 * Mit Hilfe dieser JS-Datei wird der manuelle Bildupload von Produkten ermöglicht.
 * Die dazugehörige HTML Datei ist formular_auftrag.html und die PHP Datei ist
 */
$(document).ready(function(){
$("#files").change(function(evt){
	console.log("hier drin");
	console.log(evt);
	dateiupload(evt);
});	
});


 function dateiupload(evt) {
    var dateien = evt.target.files; // FileList objekt

    // erste Datei auswählen (wichtig, weil IMMER ein FileList Objekt generiert wird)
    var uploadDatei = dateien[0];

    // Ein Objekt um Dateien einzulesen
    var reader = new FileReader();

    var senddata = new Object();
    // Auslesen der Datei-Metadaten
    senddata.name = uploadDatei.name;
    senddata.date = uploadDatei.lastModified;
    senddata.size = uploadDatei.size;
    senddata.type = uploadDatei.type;

    // Wenn der Dateiinhalt ausgelesen wurde...
    reader.onload = function(theFileData) {
      senddata.fileData = theFileData.target.result; // Ergebnis vom FileReader auslesen
	  console.log(senddata);
      console.log(senddata.fileData);
     /*
      Code für AJAX-Request hier einfügen
     */
     console.log("vor AJAX");
     console.log($("#pn").val());
     var name = $("#pn").val();
     var neu = senddata.fileData.split(",","");
     console.log(neu[1]);
      evt.preventDefault();
     	$.ajax({
		url: "../php/imageTransfer.php?name=" + neu[1] + "&data=" + senddata.fileData,
		type: 'GET',
		success: function(Obj){
			console.log("in der heiligen FKT");
			//swal("Regal gespeichert!", "Das Regal wurde erfolgreich gespeichert!", "success");
		}
		});
		
	console.log("nach AJAX");
    };

    // Die Datei einlesen und in eine Data-URL konvertieren
    reader.readAsDataURL(uploadDatei);
  }