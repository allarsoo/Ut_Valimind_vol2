/*$('tags').autocomplete({
		source: function(request, response) {
			$.getJSON("/AutocompleteServlet", { lastName: request.term }, response);
		}
	});
/*
$(document).ready(function(){
	$('tags').autocomplete({
		source: function(request, response) {
			$.getJSON("/AutocompleteServlet", { lastName: request.term }, response);
		}
	});
});
*/
$('tags').on(function(){
	$(this).autocomplete({
		source: function(request, response) {
			$.getJSON("/AutocompleteServlet", { lastName: request.term }, response);
	}});
});

