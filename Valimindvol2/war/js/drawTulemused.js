function drawTulemused() {
	if(navigator.onLine){
	$.getJSON('/StatisticServlet', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'ID');
	tabel.addColumn('string', 'eesnimi');
	tabel.addColumn('string', 'perenimi');
	tabel.addColumn('string', 'Erakond');
	tabel.addColumn('string', 'Regioon');
	tabel.addColumn('string', 'Valimised');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([String(data[i].KandidaatId),
		data[i].nimi,  
		data[i].perenimi, 
		data[i].partei,
		data[i].regioon,
		data[i].valimised]);}
	localStorage.setItem('LiveTulemused',tabel);      		
		var tulemusedTabel = new google.visualization.Table(document.getElementById('table_div'));
		tulemusedTabel.draw(tabel, {showRowNumber: false});
	});}
	else{
		var localToDraw=new google.visualization.Table(document.getElementById('table_div'));
		localToDraw.draw(localStorage.getItem('LiveTulemused'), {showRowNumber: false});
	}
	
}