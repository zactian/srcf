$(document).ready(function() {

	$(".accordian .item-header").click(function(){
			console.log("click");
			$('.accordian img').removeClass("rotated");
			//slide up all the link lists
			$(".accordian .insert").slideUp();
			//slide down the link list below the h3 clicked - only if its closed
			if(!$(this).parent().next('.insert').is(":visible")){
				$(this).parent().next('.insert').slideDown();
				$(this).children('img').addClass("rotated");
			}
		});
	//setup popups
	 $('#my_popup').popup();


	$( "#department_id" ).change(function() {
	    $("#course_id").show();
	});

	$( "#course_id" ).change(function() {
	    $("#section_id").show();
	});


	$( "#section_id" ).change(function() {
		$("#course-example").fadeIn("slow");
	});

	$("#ccn").keyup(function() {
	    if($(this).val().length == 5){
	        $("#ccn_info").fadeIn(1000);
	        $(".import-container").delay(700).fadeIn(1000);
	    }
	    // else{
	    //     $(".ccn_info").hide();
	    //     $(".import-container").hide();
	    // }
	});
});