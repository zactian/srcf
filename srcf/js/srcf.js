(function ($) {

    $.fn.tableSorter = function (options) {
        var settings = $.extend({}, options);
        var thisTable = this;
        var $thisTable = $(this);

        var ray = (function () {

            var default_sort_fns = {
                "int": function (a, b) {
                    return parseInt(a, 10) - parseInt(b, 10);
                },
                "float": function (a, b) {
                    return parseFloat(a) - parseFloat(b);
                },
                "string": function (a, b) {
                    return a.localeCompare(b);
                },
                "string-ins": function (a, b) {
                    a = a.toLocaleLowerCase();
                    b = b.toLocaleLowerCase();
                    return a.localeCompare(b);
                }
            };
            var dir = {ASC: "asc", DESC: "desc"};
            var that = this;
            var sortFns = $.extend({}, default_sort_fns);
            that.main = {

                init: function () {
                    if ($thisTable.find("th").length > 0) {
                        $thisTable.find("th").each(function (index) {
                            $(this).click(function () {
                                var sort_dir = $(this).attr("class") || dir.ASC;
                                var sort_type;
                                if ($(this).data("type")) {
                                    var sort_type = $(this).data("type");
                                }
                                if (sort_dir === dir.ASC)
                                    $(this).removeClass().addClass(dir.DESC);
                                else if (sort_dir === dir.DESC)
                                    $(this).removeClass().addClass(dir.ASC);
                                that.main.attachSort(index, $(this).data("sort"), sort_dir, sort_type);
                            });
                        });
                    }
                },

                attachSort: function (index, type, sort_dir, sort_type) {

                    var column = [];
                    var sortMethod = sortFns[type];
                    $thisTable.children("tbody").children("tr").each(function (rowIndex, tr) {
                        column.push(tr);
                    });

                    column.sort(function (a, b) {
                        var keyA = $("td:eq(" + index + ")", a).text().trim();
                        var keyB = $("td:eq(" + index + ")", b).text().trim();
                        if (sort_type === "date") {
                            var datum = new Date(keyA);
                            keyA = datum.getTime() / 1000;
                            var datumB = new Date(keyB);
                            keyB = datumB.getTime() / 1000;
                        }
                        return sortMethod(keyA, keyB);
                    });

                    if (sort_dir != dir.ASC)
                        column.reverse();

                    $(column).each(function (index, row) {
                        $thisTable.append(row);
                    });
                }
            }
            that.main.init();
        })();
    }

    /**
     * Validate Input takes in an input from a form field and determines if it is correct before the form can
     * be submitted. This function is utlized by both the UCBInfo page as well as the ConfirmUnits page, but
     * page utlizes different methods of this function. For emails, they are compared against a
     * @param  {Array} input - Inputed text to be validated (used for emails)
     * @param  {Object} regex - Regular expression that determines if the input is the correct format
     *                          (used for emails)
     * @param  {String} comparable - Comparison email to ensure that both emails are the same
     *                          (used when confirming emails)
     * @param  {Object} id - JS Object that stores a map of keywords connected to all the important ID's
     */
    $.fn.validateInput = function(input, comparable, id) {
    var $element = $(this);
    var $inputID = $('#' + id.containerID);
    var $errorID = $("#" + id.errorID);

    var validate = (function() {
        var that = this;

        if (id.parentID != null) {
            var $parent = $('#' + id.parentID);
        }
        if (id.enrollTotal != null && id.waitlistTotal != null) {
            var $eTotal = $('#' + id.enrollTotal);
            var $wTotal = $('#' + id.waitlistTotal);
        }
        if(id.formID != null) {
            var $formID = $('#' + id.formID);
        }

        that.main = {
            init: function() {
                if(typeof comparable === 'object' ||
                    comparable instanceof Object) {
                    that.main.validateInput();
                } else if (typeof comparable === 'string' ||
                    comparable instanceof String) {
                    that.main.compareInput();
                } else {
                    that.main.validateForm();
                }
            },
            validateInput: function() {
                if(!comparable.test(input)) {
                    that.main.formDanger();
                    that.main.displayError();
                } else {
                    that.main.validated();
                }
            },
            compareInput: function() {
                if (input != comparable) {
                    that.main.formDanger();
                    that.main.displayError();
                } else {
                    that.main.validated();
                }
            },
            formDanger: function() {
                if (!$inputID.hasClass('form-danger')) {
                    $inputID.addClass('form-danger');
                }
            },
            displayError: function() {
                if (!$errorID.is(":visible")) {
                    $errorID.slideDown('slow');
                }
                return false;
            },
            validated: function() {
                if ($inputID.hasClass('form-danger')) {
                    $inputID.removeClass('form-danger');
                }
                if (id.parentID == null && $errorID.is(":visible")) {
                    $errorID.slideUp('medium');
                }
                if (id.parent != null) {
                    if ($parent.has('.form-danger').length == 0) {
                        $errorID.slideUp('medium');
                        that.main.updateTotals();
                    }
                }
                return true;
            },
            validateForm: function() {
                var inputs = $formID[0].find('input');
                for (var i = 0; i < inputs.length; i++) {
                    if (!inputs[i].value) {
                        that.main.displayError();
                    } else {
                        return true;
                    }
                }
            },
            updateTotals: function() {
                if ($element.hasClass('enrolled-units')) {
                    var enrolledElements = $parent.find('.enrolled-units');
                    var total = 0;
                    for (var i=0; i < enrolledElements.length; i++) {
                        total += parseInt($(enrolledElements[i]).val());
                    }
                    $eTotal[0].innerHTML = total.toString();
                } else {
                    var waitlistedElements = $parent.find('.waitlisted-units');
                    var total = 0;
                    for (var i=0; i < waitlistedElements.length; i++) {
                        total += parseInt($(waitlistedElements[i]).val());
                    }
                    $wTotal[0].innerHTML = total.toString();
                }
            }
        }
        that.main.init();
    })();
};
}(jQuery));

