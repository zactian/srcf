$(document).ready(function() {

	$(".accordian h3").click(function(){
			console.log("click");
			//slide up all the link lists
			$(".accordian .insert").slideUp();
			//slide down the link list below the h3 clicked - only if its closed
			if(!$(this).parent().next('.insert').is(":visible")){
				$(this).parent().next('.insert').slideDown();
			}
		});
});