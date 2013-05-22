$(document).ready(function(){
	$("div.resource:gt(0)").hide();  // to hide all div except for the first one
	$('#mainMenu a').click(function(selected) {
	   var getID = $(this).attr("id");      
	   var projectImages = $(this).attr("name");      

	   $("div.resource").hide();       
	   $("#" + getID).show();    
	});  
});

function drawKandidaadid() {
	$.getJSON('/allcandidates', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'ID');
	tabel.addColumn('string', 'eesnimi');
	tabel.addColumn('string', 'perenimi');
	tabel.addColumn('string', 'Erakond');
	tabel.addColumn('string', 'Regioon');
	tabel.addColumn('string', 'D-O-B');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([String(data[i].kandidaadiNr),
		data[i].eesnimi,  
		data[i].perenimi, 
		data[i].partei,
		data[i].piirkond,
		String(data[i].dob)]);}    		
		var kandidaadiTabel = new google.visualization.Table(document.getElementById('table_div'));
		kandidaadiTabel.draw(tabel, {showRowNumber: true});
	});}

function drawStatisticByCountry() {
	$.getJSON('/statisticbycountry', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'ID');
	tabel.addColumn('string', 'eesnimi');
	tabel.addColumn('string', 'perenimi');
	tabel.addColumn('string', 'Erakond');
	tabel.addColumn('string', 'Regioon');
	tabel.addColumn('string', 'Hääli');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([String(data[i].kandidaadiNr),
		data[i].eesnimi,  
		data[i].perenimi, 
		data[i].partei,
		data[i].regioon,
		String(data[i].hääli)]);}    		
		var countryTabel = new google.visualization.Table(document.getElementById('table_div1'));
		countryTabel.draw(tabel, {showRowNumber: true});
	});}

function drawStatisticByParty() {
	$.getJSON('/statisticbyparty', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'Erakond');
	tabel.addColumn('string', 'Hääli');
	tabel.addColumn('string', 'Protsent kogu häältest');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([
		data[i].partei,
		String(data[i].hääli),
		String(data[i].protsent)]);}    		
		var partyTabel = new google.visualization.Table(document.getElementById('table_div2'));
		partyTabel.draw(tabel, {showRowNumber: true});
	});}
function drawStatisticByregion() {
	$.getJSON('/statisticbyregion', function(data) {
	var tabel = new google.visualization.DataTable();       
	tabel.addColumn('string', 'Regioon');
	tabel.addColumn('string', 'Hääletajaid');
	tabel.addColumn('string', 'Protsent kogu häältest');
	
        
	for (var i=0,len=data.length;i<len;i++) {        		         
		tabel.addRow([
		data[i].regioon,
		String(data[i].hääli),
		String(data[i].protsent)]);}    		
		var regionTabel = new google.visualization.Table(document.getElementById('table_div3'));
		regionTabel.draw(tabel, {showRowNumber: true});
	});}

/* *
 *  Google Maps script
 */ 

var hääletajaid = [];

function votes_callback(ci){
	var hääletajaid = [];
	hääletajaid.push(ci.regioon);
	hääletajaid.push(ci.hääli);
	hääletajaid.push(ci.protsent);
}

function initialize()
{
	var locations = [
['Harjumaa', 59.397569,25.229187, 4],
['Hiiumaa', 58.952841,22.584686, 5],
['Ida-Virumaa', 59.327585,27.415466, 3],
['Jõgevamaa', 58.725451,26.394196, 2],
['Lääne-Virumaa', 59.319178,26.32782, 6],
['Pärnumaa', 58.482209,24.69635, 8],
['Põlvamaa', 58.12432,27.207184, 9],
['Raplamaa', 58.860644,24.73526, 10],
['Saaremaa', 58.499435,22.608948, 11],
['Tallinn', 59.438791,24.753456, 12],
['Tartumaa', 58.413223,26.80069, 13],
['Valgamaa', 57.922142,26.160736, 14],
['Viljandimaa', 58.300831,25.580749, 15],
['Läänemaa', 58.904646,23.789978, 16],
['Võrumaa', 57.811115,26.852875, 17],
['Järvamaa', 58.921664,25.493317, 18]
];
	var abbr = ['HR', 'HI', 'IV', 'JG', 'LV',
	            'PA', 'PO', 'RP', 'SA', 'TN',
	            'TA', 'VA', 'VD', 'LA', 'VO', 'JA'];

var j;
for (j = 0; j < abbr.length; j++) {
	loadJSON("/statisticbyregion", leader_callback);
}

var map = new google.maps.Map(document.getElementById('googleMap'), {
zoom: 8,
center: new google.maps.LatLng(58.884781,25.551739),
mapTypeId: google.maps.MapTypeId.ROADMAP
});
 
var infowindow = new google.maps.InfoWindow({
	maxWidth: 500,
});
 
var marker, i;
 
for (i = 0; i < locations.length; i++) {
marker = new google.maps.Marker({
position: new google.maps.LatLng(locations[i][1], locations[i][2]),
title: locations[i][0],
map: map
});

google.maps.event.addListener(marker, 'click', (function(marker, i) {
return function() {
infowindow.setContent(locations[i][0]);
infowindow.setContent("Valimisringkonnas <b>" + locations[i][0] + 
		"</b> on hetkeseisuga <b>" + hääli[i][1] + "</b> " + " antud häält, mis annab" +"</b>"+
		hääli[i][2] + "-protsendilise valimisaktiivsuse.");
infowindow.open(map, marker);
}
})(marker, i));
}
}
/* 
 *End of Google Maps  
 */
