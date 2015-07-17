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
                "date": function (a, b) {
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
                                if (sort_dir === dir.ASC){
                                    $(this).siblings("th").andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-asc");
                                    });
                                    $(this).removeClass().addClass(dir.DESC);
                                }
                                else if (sort_dir === dir.DESC){
                                    $(this).siblings("th").andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-desc");
                                    });
                                    $(this).removeClass().addClass(dir.ASC);
                                }
                                that.main.attachSort(index, $(this).data("sort"), sort_dir);
                            });
                        });
                    }
                },

                attachSort: function (index, type, sort_dir) {

                    var column = [];
                    var sortMethod = sortFns[type];
                    $thisTable.children("tbody").children("tr").each(function (rowIndex, tr) {
                        column.push(tr);
                    });

                    column.sort(function (a, b) {
                        var keyA = $("td:eq(" + index + ")", a).text().trim();
                        var keyB = $("td:eq(" + index + ")", b).text().trim();
                        if (type === "date") {
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
    };

    $.fn.validateInput = function(id) {
        var $element = $(this);
        var input = id.input;
        var comparable = id.comparable;
        var $inputID = $('#' + id.containerID);
        var $errorID = $('#' + id.errorID);
        var $parent = $('#' + id.parentID);
        var $parentError = $('#' + id.parentError);
        var $eTotal = $('#' + id.enrollTotal);
        var $wTotal = $('#' + id.waitlistTotal);
        var $formID = $('#' + id.formID);
        var url = id.url;

        var validate = (function() {
            var that = this;
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
                        that.main.formDanger($inputID);
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                compareInput: function() {
                    console.log(comparable === "");
                    if (input != comparable || comparable === "") {
                        that.main.formDanger($inputID);
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                formDanger: function(input) {
                    console.log(input);
                    if (!input.hasClass('form-danger')) {
                        input.addClass('form-danger');
                    }
                },
                displayError: function() {
                    if (!$errorID.is(":visible")) {
                        $errorID.slideDown('slow');
                    }
                },
                validated: function() {
                    if ($inputID.hasClass('form-danger')) {
                        $inputID.removeClass('form-danger');
                    }
                    if (id.parentID == null && $errorID.is(":visible")) {
                        $errorID.slideUp('medium');
                    }
                    if (id.parentID != null) {
                        if ($parent.has('.form-danger').length == 0) {
                            $errorID.slideUp('medium');
                            that.main.updateTotals();
                        }
                        if ($parentError.is(":visible")) {
                            $parentError.slideUp('medium');
                        }
                    }
                    return true;
                },
                validateForm: function() {
                    var inputs = $formID.find('input.required');
                    var flag = false;
                    for (var i = 0; i < inputs.length; i++) {
                        if (!inputs[i].value || $(inputs[i]).hasClass('form-danger')) {
                            that.main.formDanger($(inputs[i]));
                            that.main.displayError();
                            flag = true;
                        }
                    }
                    if (!flag) {
                        $(location).attr('href', url);
                    }
                },
                updateTotals: function() {
                    console.log('updateTotals');
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
                "date": function (a, b) {
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
                                if (sort_dir === dir.ASC){
                                    $(this).siblings("th").andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-asc");
                                    });
                                    $(this).removeClass().addClass(dir.DESC);
                                }
                                else if (sort_dir === dir.DESC){
                                    $(this).siblings("th").andSelf().each(function(index){
                                        $(this).children(":first").removeClass().addClass("fa fa-fw fa-sort-desc");
                                    });
                                    $(this).removeClass().addClass(dir.ASC);
                                }
                                that.main.attachSort(index, $(this).data("sort"), sort_dir);
                            });
                        });
                    }
                },

                attachSort: function (index, type, sort_dir) {

                    var column = [];
                    var sortMethod = sortFns[type];
                    $thisTable.children("tbody").children("tr").each(function (rowIndex, tr) {
                        column.push(tr);
                    });

                    column.sort(function (a, b) {
                        var keyA = $("td:eq(" + index + ")", a).text().trim();
                        var keyB = $("td:eq(" + index + ")", b).text().trim();
                        if (type === "date") {
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
    };

    $.fn.validateInput = function(id) {
        var $element = $(this);
        var input = id.input;
        var comparable = id.comparable;
        var $inputID = $('#' + id.containerID);
        var $errorID = $('#' + id.errorID);
        var $parent = $('#' + id.parentID);
        var $parentError = $('#' + id.parentError);
        var $eTotal = $('#' + id.enrollTotal);
        var $wTotal = $('#' + id.waitlistTotal);
        var $formID = $('#' + id.formID);
        var url = id.url;

        var validate = (function() {
            var that = this;
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
                        that.main.formDanger($inputID);
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                compareInput: function() {
                    console.log(comparable === "");
                    if (input != comparable || comparable === "") {
                        that.main.formDanger($inputID);
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                formDanger: function(input) {
                    console.log(input);
                    if (!input.hasClass('form-danger')) {
                        input.addClass('form-danger');
                    }
                },
                displayError: function() {
                    if (!$errorID.is(":visible")) {
                        $errorID.slideDown('slow');
                    }
                },
                validated: function() {
                    if ($inputID.hasClass('form-danger')) {
                        $inputID.removeClass('form-danger');
                    }
                    if (id.parentID == null && $errorID.is(":visible")) {
                        $errorID.slideUp('medium');
                    }
                    if (id.parentID != null) {
                        if ($parent.has('.form-danger').length == 0) {
                            $errorID.slideUp('medium');
                            that.main.updateTotals();
                        }
                        if ($parentError.is(":visible")) {
                            $parentError.slideUp('medium');
                        }
                    }
                    return true;
                },
                validateForm: function() {
                    var inputs = $formID.find('input.required');
                    var flag = false;
                    for (var i = 0; i < inputs.length; i++) {
                        if (!inputs[i].value || $(inputs[i]).hasClass('form-danger')) {
                            that.main.formDanger($(inputs[i]));
                            that.main.displayError();
                            flag = true;
                        }
                    }
                    if (!flag) {
                        $(location).attr('href', url);
                    }
                },
                updateTotals: function() {
                    console.log('updateTotals');
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

/*strips the xml info by nodes named in the input array. 
 * returns the results as a joined string.
 */
function getXMLInfo(xml, inputArray, partition) {
    partition = partition || "";
    try {
        var result = inputArray.map(function(input) {
            x = xml.getElementsByTagName(input)[0];
            y = x.childNodes[0];
            return y.nodeValue;
        });
        return result.join(partition);
    } catch (err) {
        console.log(err);
        return "";
    }
};

var courseInfo = {
    init: function(ccn, target_div, error_div) {
        courseInfo.course.ccn = ccn.toString();
        $.ajax({
            url:"https://mysummer-dev-demo.berkeley.edu/services/getSelfSupportedCCN.php?ccn=" + ccn,
            success: function(result) {
                if (result.getElementsByTagName("errors").length === 0) {
                    courseInfo.course.target_div = target_div;
                    courseInfo.getTitle(result);
                } else {
                    $(error_div).slideDown();
                }
                
            }

        })
    },
    getTitle: function(xml) {
        courseInfo.course.courseTitle = getXMLInfo(xml, ["departmentCode","coursePrefixNumber","courseRootNumber", "courseSuffixNumber1", "courseSuffixNumber2",
            "instructionFormat", "sectionNumber"], " ");
        courseInfo.getDateTimeLoc(xml);
    },
    getDateTimeLoc: function(xml) {
        var date = getXMLInfo(xml, ["weekDay1", "weekDay2", "weekDay3", "weekDay4", "weekDay5", "weekDay6", "weekDay7",], "");
        var DOW = ["Sun", "M", "Tu", "W", "Th", "F", "Sat"];
        for (var i=0; i < date.length; i++) {
            if (date[i] === "N") {
                DOW[i] = ""
            } 
        }
        
        var timeStart = getXMLInfo(xml, ["startTime"], "");
        var startAMPM = getXMLInfo(xml, ["startTimeAmPm"], "");
        var timeEnd = getXMLInfo(xml, ["endTime"], "");
        var endAMPM = getXMLInfo(xml, ["endTimeAmPm"], "");

        var loc = getXMLInfo(xml, ["buildingCode", "roomRootNumber"], " ");
        courseInfo.course.dateTimeLoc = DOW.join("") + " " + timeStart.slice(0, 5) + startAMPM + "-" + timeEnd.slice(0,5) + endAMPM + " " + loc;

        courseInfo.getInstructorUnitsSession(xml);
    },
    getInstructorUnitsSession: function(xml) {
        courseInfo.course.instructor = getXMLInfo(xml, ["instructorName"], "");
        courseInfo.course.session = getXMLInfo(xml, ["session"], "");
        courseInfo.course.units = getXMLInfo(xml, ["unitsLower"], "");

        
        courseInfo.getEnrollment(xml);
    },
    getEnrollment: function(xml) {
        courseInfo.course.enrollment = getXMLInfo(xml, ["enrollCount", "enrollLimit"], "/");
        appendCourseInfo(courseInfo.course);
    },

    course: {
        courseTitle: "",
        dateTimeLoc: "",
        instructor: "",
        units: "",
        session:"",
        enrollment: "",
        ccn: "",
        target_div: ""
    }
};

function appendCourseInfo(input) {
    var div = $("#" + input.target_div);
    div.empty();
    div.append(
        '<h5 style="margin-top: 0px; margin-bottom: 5px; font-weight: bold;">'+ 
        input.courseTitle + '</h5>' +
        '<div class="divider-line">'+ '</div>' +
        input.dateTimeLoc + '<br/>' +
        '<b>Instructor: </b>' + input.instructor + '<br/>' +
        '<b>Units: </b>' + input.units + '<br/>' +
        '<b>Enrollment: </b>' + input.enrollment + '<br/>' +
        '<b>CCN: </b>' + input.ccn
    )
};



