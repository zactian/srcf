$(document).ready(function() {


	/** warns the user if Email input values are not equal or filled out */
	$("#email-confirm").blur(function() {

		var initial = $("#email-init").val();
		var confirm = $(this).val();

		if (!confirm || confirm != initial) {
			$("#email-init").addClass("warning");
			$("#email-confirm").addClass("warning");
		}
	});
})