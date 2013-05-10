$(document).ready(function(){
	$("div.resource:gt(0)").hide();  // to hide all div except for the first one
	$('#mainMenu a').click(function(selected) {
	   var getID = $(this).attr("id");      
	   var projectImages = $(this).attr("name");      

	   $("div.resource").hide();       
	   $("#" + getID).show();    
	});  
});
