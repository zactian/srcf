(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['supplementaryTemplate.html'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<script id=\"supp-course-template\" type=\"text/x-handlebars-template\">\r\n  	<tr>\r\n    	<td class=\"supp-choose\"><input type=\"radio\" name=\"\" value=\"\" id=\"\"/></td>\r\n    	<td class=\"supp-info\">\r\n    		<h5><strong>"
    + alias3(((helper = (helper = helpers.format || (depth0 != null ? depth0.format : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"format","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.section || (depth0 != null ? depth0.section : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"section","hash":{},"data":data}) : helper)))
    + "</strong></h5>\r\n      		<strong>Instructor: </strong>"
    + alias3(((helper = (helper = helpers.instructor || (depth0 != null ? depth0.instructor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"instructor","hash":{},"data":data}) : helper)))
    + "<br>\r\n      		<strong>Time and Location: </strong> "
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.loc || (depth0 != null ? depth0.loc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"loc","hash":{},"data":data}) : helper)))
    + " <br>\r\n      		<strong>Enrollment: </strong>"
    + alias3(((helper = (helper = helpers.enrollment || (depth0 != null ? depth0.enrollment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"enrollment","hash":{},"data":data}) : helper)))
    + " &nbsp; &nbsp; &nbsp;<strong>Waitlist: </strong>"
    + alias3(((helper = (helper = helpers.waitlist || (depth0 != null ? depth0.waitlist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"waitlist","hash":{},"data":data}) : helper)))
    + "<br>\r\n      		<strong>CCN: </strong>"
    + alias3(((helper = (helper = helpers.ccn || (depth0 != null ? depth0.ccn : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ccn","hash":{},"data":data}) : helper)))
    + "<br>\r\n    	</td>\r\n  	</tr>\r\n</script>\r\n";
},"useData":true});
})();