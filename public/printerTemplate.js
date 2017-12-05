//Allows us to use our handlebar templates to generate our pages

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['printer'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " <div class=\"code\">\r\n            "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\r\n        </div> ";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return " <div class=\"color\">\r\n            "
    + alias2(alias1(depth0, depth0))
    + "\r\n            <div class=\"color-icon-"
    + alias2(alias1(depth0, depth0))
    + "\">\r\n\r\n            </div>\r\n        </div> \r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"quantity\">\r\n            "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\r\n        </div>\r\n        <div class=\"change-quantity\">\r\n            <button type=\"button\" class=\"change\" value=\"add\">\r\n                <i class=\"fa fa-plus\"></i>(+1)</button>\r\n            <button type=\"button\" class=\"change\" value=\"minus\">\r\n                <i class=\"fa fa-plus\"></i>(-1)</button>\r\n        </div> ";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"Last-Updated\">\r\n            "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\r\n        </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"table-info\" data-min-alert="
    + alias4(((helper = (helper = helpers.minAlert || (depth0 != null ? depth0.minAlert : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minAlert","hash":{},"data":data}) : helper)))
    + ">\r\n    <td>"
    + alias4(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"brand","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td>"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</td>\r\n    <td>\r\n        "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.code : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </td>\r\n    <td>\r\n        "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.color : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\r\n    <td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.quantity : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </td>\r\n    <td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.lastUpdated : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\r\n    <td>\r\n        <div class=\"notes\">\r\n            Notes: "
    + alias4(((helper = (helper = helpers.notes || (depth0 != null ? depth0.notes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notes","hash":{},"data":data}) : helper)))
    + "\r\n        </div>\r\n        <div class=\"edit\">\r\n            <button type=\"button\" class=\"edit-notes-button\">\r\n                <i class=\"fa fa-plus\"></i>Edit</button>\r\n        </div>\r\n    </td>\r\n    <td>\r\n        <div class=\"printer-name\" data-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + ">\r\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n        </div>\r\n    </td>\r\n    <td>\r\n        <div class=\"location\" data-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + ">\r\n            "
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "\r\n        </div>\r\n    </td>\r\n    <td>\r\n        <div class=\"edit-printer\" data-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " data-brand="
    + alias4(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"brand","hash":{},"data":data}) : helper)))
    + ">\r\n            <button type=\"button\" class=\"edit-printer-button\">\r\n                <i class=\"fa fa-plus\"></i>Edit Printer</button>\r\n        </div>\r\n        <div class=\"remove-printer\" data-type="
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " data-brand="
    + alias4(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"brand","hash":{},"data":data}) : helper)))
    + ">\r\n            <button type=\"button\" class=\"remove-item\">\r\n                <i class=\"fa fa-plus\"></i>Remove Printer</button>\r\n        </div>\r\n    </td>\r\n</tr>\r\n";
},"useData":true});
})();
