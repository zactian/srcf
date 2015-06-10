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
                                if (sort_dir === dir.ASC){
                                    $(this).siblings().andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-asc");
                                    });
                                    $(this).removeClass().addClass(dir.DESC);
                                }
                                else if (sort_dir === dir.DESC){
                                    $(this).siblings().andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-desc");
                                    });
                                    $(this).removeClass().addClass(dir.ASC);
                                }
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

    $.fn.validateInput = function(input, regex, comparable, id) {
        var input = input;
        var regex = regex;
        var comparable = comparable;
        var parent = id.parentID;
        var $element = $(this);
        var $inputID = $('#' + id.containerID);
        var $errorID = $("#" + id.errorID);

        var validation = (function() {
            var that = this;

            //set the parent jquery object if parent exists
            if (parent != null) {
                var $parent = $('#' + parent);
                var $eTotal = $('#' + id.enrollTotal);
                var $wTotal = $('#' + id.waitlistTotal);
            }

            that.main = {
                init: function() {
                    if (comparable != null) {
                        that.main.compareEmails();
                    } else {
                        that.main.validateEmail();
                    }
                },
                validateEmail: function() {
                    if(!regex.test(input)) {
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                compareEmails: function() {
                    if (input != comparable) {
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                displayError: function() {
                    $inputID.addClass('form-danger');
                    $errorID.slideDown('slow');
                },
                validated: function() {
                    $inputID.removeClass('form-danger');
                    if (parent == null) {
                        $errorID.slideUp('medium');
                    //special case for confirm units page
                    } else {
                        if ($parent.has('.form-danger').length == 0) {
                            $errorID.slideUp('medium');
                            that.main.updateTotals();
                        }
                    }
                },
                //confirm units page specific function
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
        });
    };
}(jQuery));

