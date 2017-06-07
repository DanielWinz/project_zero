/**
 * @author Daniel
 */

	var msg = JSON.parse(localStorage.getItem('message'));
	
	$.get("../txt/error_template.txt", function(template){
		
		var inhalt = "";
		
		switch(msg.status){
			
			case 0:
					inhalt = Mustache.render(template,
						{
							bild: "../img/hindernis.jpg",
							inhalt: "Ein Hindernis wurde auf dem Weg gefunden. <br> Bitte aus dem Weg räumen.",
							button: "Hindernis entfernt"
						});
					break;
			
			case 1:
					inhalt = Mustache.render(template,
						{
							bild: "../img/photo-camera.svg",
							inhalt: "Das Produkt " + msg.produkt + " konnte leider nicht erkannt werden. <br>" +
									"Bitte aus Regal " + msg.regal + " holen und in das Fach " + msg.ablage + " ablegen.",
							button: "Produkt kommissioniert"
						});
					break;
			
			case 2:
					inhalt = Mustache.render(template,
						{
							bild: "../img/gripper.svg",
							inhalt: "Das Produkt " + msg.produkt + " konnte leider nicht gegriffen werden. <br>" +
									"Bitte aus Regal " + msg.regal + " holen und in das Fach " + msg.ablage + " ablegen.",
							button: "Produkt kommissioniert"
						});
					break;
		}
		
		$("#inhalt_error").append(inhalt);

	});
