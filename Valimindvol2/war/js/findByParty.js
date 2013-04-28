function findByParty(){
	$('input').keyup(function(){
		var value=$(this).val();
	});
	if(navigator.onLine){
	$.getJSON('/FindByParty', function(data) {
		var tabel = new google.visualization.DataTable();       
		tabel.addColumn('string', 'ID');
		tabel.addColumn('string', 'eesnimi');
		tabel.addColumn('string', 'perenimi');
		tabel.addColumn('string', 'Erakond');
		  
		for (var i=0,len=data.length;i<len;i++) {        		         
			tabel.addRow([String(data[i].id),
			data[i].eesnimi,  
			data[i].perenimi, 
			data[i].erakond
			]);}
		localStorage.setItem('byParty',tabel);     		
			var tulemusedTabel = new google.visualization.Table(document.getElementById('table_div'));
			tulemusedTabel.draw(tabel, {showRowNumber: false});
		});}
	else{
		var localToDraw=new google.visualization.Table(document.getElementById('table_div'));
		localToDraw.draw(localStorage.getItem('byParty'), {showRowNumber: false});
	}
	
	
}