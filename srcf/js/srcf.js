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
                    if (input != comparable || comparable === "") {
                        that.main.formDanger($inputID);
                        that.main.displayError();
                    } else {
                        that.main.validated();
                    }
                },
                formDanger: function(input) {
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

(function($) {
    $.getCourseInfo = function(options) {

        var selectors ={
            title: [["departmentCode","coursePrefixNumber","courseRootNumber", "courseSuffixNumber1", "courseSuffixNumber2",
                    "instructionFormat", "sectionNumber"], " "],
            date: [["weekDay1", "weekDay2", "weekDay3", "weekDay4", "weekDay5", "weekDay6", "weekDay7",], ""],
            time: [["startTime", "startTimeAmPm", "endTime", "endTimeAmPm"]," "],
            loc: [["buildingCode", "roomRootNumber"], " "],
            instructor: [["instructorName"],""],
            units: [["unitsLower", "unitsUpper"], " "],
            session: [["session"], ""],
            enrollment: [["enrollCount", "enrollLimit"], "/"],
            approvers: [["display_name"], " "],
            timing: [["reques_timing"], ""],
            section: [["sectionNumber"], ""],
            format: [["instructionFormat"], ""],
            waitlist: [["waitListCount", "waitListLimit"], "/"],
            ccn: [["ccn"], ""],
            linkedCCN: [["linkedCCN"], ""]
        };

        var settings= $.extend(selectors, options);

        var courseInfo = { 
            /*strips the xml info by nodes named in the input array. 
            * returns the results as a joined string.*/
            getXMLInfo: function(xml, inputArray, partition) {
                partition = partition || "";
                try {
                    var result = inputArray.map(function(input) {
                        x = xml.getElementsByTagName(input)[0];
                        y = x.childNodes[0];
                        return y.nodeValue;
                    }); 
                 return result.join(partition);
                } catch (err) {
                    (err);
                    return "";
                }
            },

            getXMLInfoMultiple: function(xml, input, partition) {
                partition = partition || "";
                try {
                     x = xml.getElementsByTagName(input);
                     y = [];
                     for (var i = 0; i < x.length; i++) {
                         y[i] = x[i].childNodes[0].nodeValue;
                     }
                     return y;
                } catch (err) {
                    console.log(err);
                    return "";
                }
            },
            
            /* Returns information about secondary sections including the classes' ccn, section number,
             * format, date, time, instructor, enrollment info, waitlist info, and location. It is important to 
             * note that you need to pass in section and format options when instatiating the main function (getCourseInfo).
             * var xml is the xml documents you wish to search for secondary information.
             * In the case of an error, the error will be logged to the consol.
             */
            getSecondaryInfo: function(xml, option) {
                try {
                    x = xml.getElementsByTagName(option);
                    var requiredInfo = ["ccn", "section", "format", "date", "time", "loc", "instructor", "enrollment", "waitlist"]; 
                    var secondaryArray = $.map(x, function(input) {
                        var sectionInfo = {name:"secondary"};
                        courseInfo.parseXML(input, requiredInfo, sectionInfo);
                        return sectionInfo;
                    });   
                    
                    return secondaryArray;
                } catch (err) {
                    console.log(err);
                    return "";
                }
            },
            getTertiaryInfo: function(xml, option) {
                try {
                    x = xml.getElementsByTagName(option);
                    var requiredInfo = ["ccn", "section", "format", "date", "time", "loc", "instructor", "enrollment", "waitlist", "linkedCCN"];
                    var final = {};
                    $.map(x, function(input) {
                        var sectionInfo = {name:"tertiary"};
                        courseInfo.parseXML(input, requiredInfo, sectionInfo);
                        if ($.isArray(sectionInfo.linkedCCN)) {
                            $.map(sectionInfo.linkedCCN, function(ccn) {
                                if (!(ccn in final)) {
                                    final[ccn] = [sectionInfo];
                                } else {
                                    final[ccn].push(sectionInfo);
                                }
                            });
                        } else {
                            if (!(ccn in final)) {
                                    final[ccn] = [sectionInfo];
                                } else {
                                    final[ccn].push(sectionInfo);
                                }
                        }
                    });
                    return final;
                } catch (err) {
                    console.log(err);
                    return "";
                }
            },
            
            parseXML: function(xml, requiredInfo, courseObj) {
                if(requiredInfo === undefined) {
                    requiredInfo = ["ccn", "title", "units", "date", "time", 
                                    "loc", "instructor", "enrollment", "waitlist", 
                                    "session", "approvers", "timing"];
                }
                var something = $.map(requiredInfo, function(i, val) {
                    if(i === 'date') {
                        courseObj[i] = courseInfo.days(xml, i);
                    } else if (i === 'units') {
                        courseObj[i] = courseInfo.units(xml, i, courseInfo.course);
                    } else if (i === 'time') {
                        courseObj[i] = courseInfo.time(xml, i);
                    }else if (i === 'timing') {
                        courseObj[i] = courseInfo.timing(xml, i);
                    } else if (i === 'approvers' || i === "linkedCCN") {
                        courseObj[i] = courseInfo.getXMLInfoMultiple(xml, selectors[i][0], selectors[i][1]);
                    } else{
                        courseObj[i] = courseInfo.getXMLInfo(xml, selectors[i][0], selectors[i][1]);
                    }
                })
            },
            
            days: function(xml, val) {
                var daysTemp = courseInfo.getXMLInfo(xml, selectors[val][0], selectors[val][1]);
                var DOW = ["Sun", "M", "Tu", "W", "Th", "F", "Sat"];
                for (var i=0; i < daysTemp.length; i++) {
                    if (daysTemp[i] === "N") {
                        DOW[i] = ""
                    }   
                }
                return DOW.join("");
            },
            
            units: function(xml, val, course) {
                var unitsTemp = courseInfo.getXMLInfo(xml, selectors[val][0], selectors[val][1]).split(" ");
                var lower = unitsTemp[0];
                var upper = unitsTemp[1];

                if(upper !== lower) {
                    course['variable'] = "true";
                    return unitsTemp.join("-");
                } else {
                    courseInfo.course['variable'] = "false";
                    return upper;
                }
            },
            
            time: function(xml, val) {
                var timeTemp = courseInfo.getXMLInfo(xml, selectors[val][0], selectors[val][1]).split(" ");
                return timeTemp[0].slice(0, 5) + timeTemp[1] + "-" + timeTemp[2].slice(0,5) + timeTemp[3];
                
            },
            timing: function(xml, val) {
                var timingTemp = courseInfo.getXMLInfo(xml, selectors[val][0], selectors[val][1]);
                if (timingTemp === "L") {
                    return "Late";
                } else if (timingTemp === "R") {
                    return "Retroactive";
                } else {
                    return "Normal";
                }
            },
            course: {}
        };
        return {
            parseXML: courseInfo.parseXML,
            secondary: courseInfo.getSecondaryInfo,
            tertiary: courseInfo.getTertiaryInfo,
            course: courseInfo.course
        }
    };
})(jQuery);

(function($) {
    $.srcfAction = function(options) {
        var selectors = {
            errors: [],
            form_requests:$("#actionContainer"),
            reset_forms: $("#reset_form_actions"),
            unit_counts: $("#unit_counts"),
            accordion: $("#accordion")
        }

        var settings = $.extend(selectors, options);

        var actions = {
            init: function() {
                if (selectors.form_requests.children().length == 0) {
                    selectors.form_requests.prev().remove();
                    selectors.reset_forms.show();
                    selectors.unit_counts.show();
                }
            },
            pullFormData: function(target, formData) {
                var textInput = $(target + " input:text");
                var radioInput = $(target + " input:radio");
                textInput.each(function() {
                    formData[this.name] = $(this).val();
                });
                radioInput.each(function() {
                    if($(this).is(':checked')) {
                        formData[this.name] = $(this).val();
                    }
                });
                
                if(formData.date === "") {
                    formData.date = "N/A";
                }
                console.log(formData);
            },
            confirmForm: function(target, formData) {
                var radioInput = $(target + " input:radio:checked").length; 
                actions.pullFormData(target, formData);
                if (radioInput === 0) {
                    return false;
                } else if(formData.attended === "Yes" && formData.date === "N/A") {
                    return false;
                } else return true;
            },
            appendAction: function(target, courseData, formData) {
                 if (!$(target).is(':visible')) {
                        $(target).css('display', "block");
                    }
                    $(target).append(
                    '<div class="box box-solid">' +
                        '<div class="box-header with-border">' +
                            '<i class="fa fa-fw fa-edit"></i>&nbsp;' +
                            '<h3 class="box-title" style="font-size: 16px; font-weight:bold">' + courseData.actionTitle + '</h3>' +
                            '<a style="cursor: pointer; font-size: 14px;">' +
                            '<i id="' + courseData.course.ccn + '"class="fa fa-fw fa-times pull-right"></a></i>' +
                        '</div>' +
                        '<div class="box-body">' +
                            '<blockquote>' +
                                '<label>Course:</label>'+ courseData.course.title + '<br/>' +
                                '<label>CCN:</label>' + courseData.course.ccn + '<br/>' +
                                '<label>Units:</label>' + courseData.course.units + '<br/>' +
                                '<label>Waitlisted? </label> ' + formData.waitlisted +'<br/>' +
                                '<label>Attended? </label> ' + formData.attended + '<br/>' +
                                '<label>Date last attended: </label> ' + formData.date + '<br/>' +
                                '<label>Action Type: </label> ' + courseData.course.timing + '<br/>' +
                                '<small style="font-size: 12px;">&nbsp;Approvers' +
                                    '<ol>' +
                                        $('.actionApprovers').html() +
                                    '</ol>' +
                               ' </small>' +
                        '</blockquote>' +
                    '</div>' +
                '</div>')
             },
            collapseAccordian: function(index) {
                selectors.accordion.children(":not(:eq(" + index + "))").each(function () {
                    $(this).find('.panel-collapse.in').collapse('hide');
                    $(this).find('h4 a').attr({"data-toggle": "tooltip", class: "red-toolip", "data-replacement": "left bottom", "title": "You can only select one form action at the time. To select different form requests, please reset the form. "}).css({"color": "#777", "cursor": "default"});
                    $(this).find('.panel-heading').css({"background": "#D0D0D0"});
                    $('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});
                });
            },
            updateCCNs: function() {
                var current = JSON.parse($('#current_taken_ccns').val());
                current.push($("#form_content").find("#ccn").val());
                $('#current_taken_ccns').val(JSON.stringify(current));
            },
            removeCCN: function(ccn) {
                var current = JSON.parse($('#current_taken_ccns').val());
                var index = current.indexOf(ccn);
                if (index >= 0) {
                    current.splice(index, 1);
                }
                $('#current_taken_ccns').val(JSON.stringify(current));
            },
            deleteAction: function(that) {
                that.parentsUntil("#actionContainer").remove();
                if (form_requests.children().length == 0) {
                    ray.action();
                } else {
                    srcfAction.removeCCN(that.attr('id'));
                }
            }
    }
        return {
            init: actions.init,
            pullFormData: actions.pullFormData,
            confirmForm: actions.confirmForm,
            appendAction: actions.appendAction,
            collapseAccordian: actions.collapseAccordian,
            updateCCNs: actions.updateCCNs,
            deleteAction: actions.deleteAction
        }
    };
    
})(jQuery);




