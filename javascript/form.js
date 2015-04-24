$(document).ready(function() {

	/*Variables that stores whether the initial email is invalid.
	 * if so, unfocusing the confirm email textbox will not show another
	 * error message until the initial email is validated */
	var emailInvalid = true;

	//not needed anymore -- delete later
	// /* Maps school to their pdf instructions */
	// var schoolToPDF = {"chemistry": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=2",
	// 				 "engineering": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=3",
	// 				 "enviro-design": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=4",
	// 				 "business": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=6",
	// 				 "l-and-s": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=1",
	// 				 "natural-resources": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=1",
	// 				 "law": "https://mysummer-dev-demo.berkeley.edu/srcf/serveCollegePdf.php?id=7"};

	/** warns the email if their email is not formmatted correctly */
	$("#email-init").blur(function() {
		var email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		var initial = $("#email-init").val();

		if(!email.test(initial)) {
			$("#email-init").addClass("warning");
			$("#invalid-email-alert").slideDown("medium");
		} else {
			$("#email-init").removeClass("warning");
			$("#invalid-email-alert").slideUp("medium");
			emailInvalid = false;
		}

	});

	/** warns the user if Email input values are not equal or filled out. */
	$("#email-confirm").blur(function() {
		var initial = $("#email-init").val();
		var confirm = $(this).val();

		if (emailInvalid == false && confirm != initial) {
			$("#email-init").addClass("warning");
			$("#email-confirm").addClass("warning");
			$("#email-alert").slideDown("slow");
		} else if (confirm == initial) {
			$("#email-init").removeClass("warning");
			$("#email-confirm").removeClass("warning");
			$("#email-alert").slideUp("slow");
		}
	});

	/*Displays PDF instructions after School(s) is/are choosen */
	$("input[type=checkbox]").change( function() {
		var college = $(this).val();

		$("#pdfs").slideDown("slow");

	    if($(this).is(":checked")){
	    	$('<td id = "' + college + '"><img src="https://api.fnkr.net/testimg/50x70/00CED1/FFF/?text=img+placeholder"> <br>' +
                     college + '</td>').hide().appendTo("#pdf-table tr:last").fadeIn(1500);
	       // $("#pdf-table tr:last").append( '<td><img src="https://api.fnkr.net/testimg/50x70/00CED1/FFF/?text=img+placeholder"> <br>' +
        //              $(this).val() + '</td>').fadeIn(999);
	       // $
	    } else {
	    	$('#' + college).fadeOut("slow", function() {
	    		$(this).remove()
	    	});
	    }

	  });

})