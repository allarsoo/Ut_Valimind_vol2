
function getForm(form) {
	var nrSearched=0;
	var name = form.search_name.value;
	if (name != ""){ nrSearched += 1;}

	var party = form.search_party.value;
	if (party != ""){  nrSearched += 1;}

	var region = form.search_region.value;
	if (region != ""){  nrSearched += 1;}

	jQuery("#table_div").empty();
	var gotStuff = 0;


	//currently 1 check per file
	if (nrSearched == 1 && name != "") {
		gotStuff=1;
		$.getJSON('../json/candidates.json', function(data) {
			var tabel = new google.visualization.DataTable();       
			tabel.addColumn('string', 'Nimi');
			tabel.addColumn('string', 'Erakond');
			tabel.addColumn('string', 'ID');
		        
			for (var i in data.candidates) {        		         
				tabel.addRow([data.candidates[i].person.name,  
				data.candidates[i].party.name, 
				data.candidates[i].id]);}
		          		
				var erakonnaTabel = new google.visualization.Table(document.getElementById('table_div'));
				erakonnaTabel.draw(tabel, {showRowNumber: true});
			});
	}

	if (nrSearched == 1 && party != "") {
		gotStuff=1;
		$.getJSON('../json/findCandidatesByParty.json', function(data) {
			var tabel = new google.visualization.DataTable();       
			tabel.addColumn('string', 'Nimi');
			tabel.addColumn('string', 'Erakond');
			tabel.addColumn('string', 'Regioon');
		        
			for (var i in data.candidates) {        		         
				tabel.addRow([data.candidates[i].person.name,  
				data.candidates[i].Region.name, 
				data.candidates[i].id]);}
		          		
				var erakonnaTabel = new google.visualization.Table(document.getElementById('table_div'));
				erakonnaTabel.draw(tabel, {showRowNumber: true});
			});
	}

	if (nrSearched == 1 && region != "") {
		gotStuff=1;
		$.getJSON('../json/findCandidatesByRegion.json', function(data) {
			var tabel = new google.visualization.DataTable();       
			tabel.addColumn('string', 'Nimi');
			tabel.addColumn('string', 'Erakond');
			tabel.addColumn('string', 'ID');
		        
			for (var i in data.candidates) {        		         
				tabel.addRow([data.candidates[i].person.name,  
				data.candidates[i].party.name, 
				data.candidates[i].id]);}
		          		
				var erakonnaTabel = new google.visualization.Table(document.getElementById('table_div'));
				erakonnaTabel.draw(tabel, {showRowNumber: true});
			});
	}

	if (nrSearched == 2 && region != "" && party != "") {
		gotStuff=1;
		$.getJSON('../json/findCandidatesByPartyAndRegion.json', function(data) {
			var tabel = new google.visualization.DataTable();       
			tabel.addColumn('string', 'Nimi');
			tabel.addColumn('string', 'Erakond');
			tabel.addColumn('string', 'ID');
		        
			for (var i in data.candidates) {        		         
				tabel.addRow([data.candidates[i].person.name,  
				data.candidates[i].party.name, 
				data.candidates[i].id]);}
		          		
				var erakonnaTabel = new google.visualization.Table(document.getElementById('table_div'));
				erakonnaTabel.draw(tabel, {showRowNumber: true});
			});
	}

	if (gotStuff == 0) {
		var myDiv = jQuery('#candHeading');
		myDiv.append(jQuery('<h3>P&auml;ringule vastused puuduvad!</h3>'));
	}
}