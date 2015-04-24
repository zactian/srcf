$(document).ready(function() {

	/*Variables that stores whether the initial email is invalid.
	 * if so, unfocusing the confirm email textbox will not show another
	 * error message until the initial email is validated */
	var emailInvalid = true;
	var pdfsDisplayed = 0;

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
	$("input[type=checkbox]").change(function() {
		var college = $(this).val();

	    if($(this).is(":checked")){
	    	$('<td id="' + college + '"><a href="" target = "_blank" data-college ="' + college +
	    		'"><img src="https://api.fnkr.net/testimg/50x70/00CED1/FFF/?text=img+placeholder"></a> <br>' +
                 college + '</td>').hide().appendTo("#pdf-table tr:last").fadeIn(1500);
	    	pdfsDisplayed ++;
	    } else {
	    	$('#' + college).fadeOut("slow", function() {
	    		$(this).remove()
	    	});
	    	pdfsDisplayed --;
	    }

		if (pdfsDisplayed > 0) {
			$("#pdfs").slideDown("slow");
		} else {
			$("#pdfs").slideUp("slow");
		}
	  });

    $("#example2").tableSorter();
});

function tableSorter(table,  sortFns){
    var me = this;
    me.thisTable = table;
    me.$thisTable = $(table);
    me.init();
    var sortFns = sortFns || {};
    var default_sort_fns = {
        "int": function(a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
        },
        "float": function(a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        "string": function(a, b) {
            return a.localeCompare(b);
        },
        "string-ins": function(a, b) {
            a = a.toLocaleLowerCase();
            b = b.toLocaleLowerCase();
            return a.localeCompare(b);
        }
    };
    me.dir = {ASC: "asc", DESC: "desc"};
    me.sortFns = $.extend({}, default_sort_fns, sortFns);
}

tableSorter.prototype = {
    init: function(){
        var that = this;
        this.$thisTable.find("th").each(function(index) {
            $(this).click(function() {
                var sort_dir = $(this).data("sort-default") || that.dir.ASC;
                if($(this).data("sort-dir"))
                    sort_dir = $(this).data("sort-dir") === that.dir.ASC ? that.dir.DESC : that.dir.ASC;
                $(this).data("sort-dir", sort_dir).addClass("sorting-"+sort_dir);
                that.onClickHeader(index, $(this).data("sort"), sort_dir);
            });
        });
    },
    onClickHeader: function(index, type, sort_dir){
        var that = this;
        var sortMethod = that.sortFns[type];
        var column = [];
        that.$thisTable.children("tbody").children("tr").each(function(rowIndex, tr){
            column.push(tr);
        });

        column.sort(function(a, b) {
            var keyA = $("td:eq("+index+")",a).text().trim();
            var keyB = $("td:eq("+index+")",b).text().trim();
            return sortMethod(keyA, keyB);
        });

        if (sort_dir != that.dir.ASC)
            column.reverse();

        $(column).each(function(index, row){
            that.$thisTable.append(row);
        });
    }
}

jQuery.fn.tableSorter = function(options) {
    return this.each(function (){
        instance = new tableSorter(this, options);
    });
}




