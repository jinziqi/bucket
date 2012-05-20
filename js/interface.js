/*
	Interface.js manages the application interface functionality
*/

	//Hides all views
	function hideViews(){
		$('.contentView').hide();
	};
	
	function inactive(){
		$('.navigation').removeClass('navActive');
	};

$(function() {

	$('#welcome').show();
	$('#welcomeNav').addClass('navActive');
	
	//Reveal Views
	$('#welcomeNav').click(function(){
		hideViews();
		inactive();
		$('#welcomeNav').addClass('navActive');
		$('#welcome').show();
	});
	$('#manageRulesNav').click(function(){
		hideViews();
		inactive();
		$('#manageRulesNav').addClass('navActive');
		$('#manageRules').show();
	});
	$('#addRule').click(function(){
		hideViews();
		$('#addRules').show();
		$('#ruleName').attr('rule_id', '');
		$('#ruleName').val('');
		$('#selected_directory').html('');
		$('#docSelectedService').html('icon');
		$('#imageSelectedService').html('icon');
		$('#videoSelectedService').html('icon');
	});
	$('.editRule').click(function(){
		hideViews();
		$('#addRules').show();
	});
	$('#myServicesNav').click(function(){
		hideViews();
		inactive();
		$('#myServicesNav').addClass('navActive');
		$('#myServices').show();
	});

	$('#ruleCancel').click(function(){
		$('#manageRulesNav').click();
	});

});