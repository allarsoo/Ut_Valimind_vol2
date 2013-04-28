function deleteVote(){
	
	$.post("/DeleteVote");
	alert('Teie hääl on edukalt eemaldatud');
	var toShow=document.getElementById("SisuSisu");
	var toHide=document.getElementById("HiddenStuff");
	toHide.style.display="none";
	toShow.style.display="block";
}