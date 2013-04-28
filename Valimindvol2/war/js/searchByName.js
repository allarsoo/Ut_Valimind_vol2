function findByName(){
	if(navigator.onLine){
	$.getJSON('/FindByName', function(data) {
		var tabel = new google.visualization.DataTable();       
		tabel.addColumn('string', 'ID');
		tabel.addColumn('string', 'eesnimi');
		tabel.addColumn('string', 'perenimi');
		tabel.addColumn('string', 'Erakond');
		tabel.addColumn('string', 'Regioon');
		   
		for (var i=0,len=data.length;i<len;i++) {        		         
			tabel.addRow([String(data[i].id),
			data[i].firstName,  
			data[i].lastName, 
			data[i].party,
			data[i].area
			]);}
		localStorage.setItem('byName',tabel);      		
			var tulemusedTabel = new google.visualization.Table(document.getElementById('table_div'));
			tulemusedTabel.draw(tabel, {showRowNumber: false});
		});}
	else{
		//var localTable = new google.visualization.DataTable();
		//localTable=localStorage.getItem('byName');
		var localToDraw=new google.visualization.Table(document.getElementById('table_div'));
		localToDraw.draw(localStorage.getItem('byName'), {showRowNumber: false});
	}
	
	
}