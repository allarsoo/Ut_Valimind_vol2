//New one with server
function drawTable() {
	if(navigator.onLine){
	$.getJSON('/kandideeri', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'ID');
	tabel.addColumn('string', 'eesnimi');
	tabel.addColumn('string', 'perenimi');
	tabel.addColumn('string', 'Erakond');
	tabel.addColumn('string', 'Regioon');
	tabel.addColumn('string', 'D-O-B');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([String(data[i].id),
		data[i].firstName,  
		data[i].lastName, 
		data[i].party,
		data[i].area,
		String(data[i].dob)]);}
	localStorage.setItem('tulemused',tabel);    		
		var erakonnaTabel = new google.visualization.Table(document.getElementById('table_div'));
		erakonnaTabel.draw(tabel, {showRowNumber: true});
	});}
	else{
		//var answers=new google.visualization.DataTable();
		//answers=localStorage.getItem('tulemused');
		var drawArea=new google.visualization.Table(document.getElementById('table_div'));
		drawArea.draw(localStorage.getItem('tulemused'), {showRowNumber: true});
	}
}


function valitabel() {
	var x=document.getElementById("tabelmenu").selectedIndex;
	if (document.getElementsByTagName("option")[x].value == "bar") {
		drawChart()
	} if (document.getElementsByTagName("option")[x].value == "pie") {
		drawPieChart()
	}
}

function drawChart() {
	var twodTabel=new Array();
	var headers= new Array();
	headers[0]="ID";
	headers[1]="Nimi";
	headers[2]="Perenimi";
	headers[3]="Partei";
	headers[4]="Regioon";
	headers[5]="Valimised";
	twodTabel[0]=headers;
	$.getJSON('/LiveTulemused', function(someData) {
		for (var i=0,len=data.length;i<len;i++) {        		         
			var myData=new Array(someData[i].id, someData[i].nimi, someData[i].perenimi,
					someData[i].partei, someData[i].regioon, someData[i].valimised);
			twodTabel[i+1]=myData;}
	});
	var data = google.visualization.arrayToDataTable(twodTabel);

	var options = {
		title: 'Hääletuste jaotus',
		vAxis: {title: 'Isik',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.BarChart(document.getElementById('chart'));
	chart.draw(data, options);
}

function drawPieChart() {
        var data = google.visualization.arrayToDataTable([
          ['Erakond', 'Riikigogu kohti'],
          ['SDE',     5],
          ['Reformierakond',      2],
          ['Selver',  2],
          ['FC Flora', 2],
          ['UT valimind',    7]
        ]);

        var options = {
          title: 'Riigikogu kohti'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));
        chart.draw(data, options);
      } 