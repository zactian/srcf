$(document).ready(function() {

	/*Variables that stores whether the initial email is invalid.
	 * if so, unfocusing the confirm email textbox will not show another
	 * error message until the initial email is validated */
	var emailInvalid = true;

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

	// $(":radio").click(function() {
	// 	var confirmed = false;
	// 	$(":text").each(function() {
	// 		if ($("this").value != "") {
	// 			confirmed = true;
	// 		} else {
	// 			confirmed = false;
	// 		}
	// 	})
	// })


	// $(":input").each(function() {
	// 	console.log($(this).val());
	//    if($(this).val() === "") {
	//    	$("submit-button").addClass("disabled");
	//    }
	// });
})