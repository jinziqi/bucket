/*
	Interface.js manages the application interface functionality
*/

	//Hides all views
	function hideViews(){
		$('.contentView').hide();
	};

$(function() {

	$('#welcome').show();
	
	//Reveal Views
	$('#welcomeNav').click(function(){
		hideViews();
		$('#welcome').show();
	});
	$('#manageRulesNav').click(function(){
		hideViews();
		$('#manageRules').show();
	});
	$('.editRule').click(function(){
		hideViews();
		$('#addRules').show();
	});
	$('#myServicesNav').click(function(){
		hideViews();
		$('#myServices').show();
	});

});