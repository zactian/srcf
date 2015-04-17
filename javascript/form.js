$(document).ready(function() {

	/** warns the email if their email is not formmatted correctly */
	$("#email-init").blur(function() {
		var email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		var initial = $("#email-init").val();

		if(!email.test(initial)) {
			$("#email-init").addClass("warning");
		}

	});

	/** warns the user if Email input values are not equal or filled out */
	$("#email-confirm").blur(function() {
		var initial = $("#email-init").val();
		var confirm = $(this).val();

		if (!confirm || confirm != initial) {
			$("#email-init").addClass("warning");
			$("#email-confirm").addClass("warning");
		} else if (confirm == initial) {
			$("#email-init").removeClass("warning");
			$("#email-confirm").removeClass("warning");
		}
	});
})