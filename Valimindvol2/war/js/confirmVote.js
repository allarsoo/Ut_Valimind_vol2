function confirmVote(){
	var value1=document.getElementById("kandidaat");
	var value2=document.getElementById("piirkond");
	var value3=document.getElementById("erakond");
	
	$.post("/VotingServlet", {
		kandidaat: value1,
		piirkond: value2,
		erakond: value3
	}
	);
	
	alert('Teie hääl on edukalt antud');
	var toHide=document.getElementById("SisuSisu");
	var toShow=document.getElementById("HiddenStuff");
	toHide.style.display="none";
	toShow.style.display="block";
}