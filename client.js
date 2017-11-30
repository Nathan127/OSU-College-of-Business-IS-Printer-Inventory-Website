(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['table'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.bodyRow,depth0,{"name":"bodyRow","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section id=\"printers\">\n    <table id=\"printer-table\" cellspacing=\"0\" cellpadding=\"0\">\n"
    + ((stack1 = container.invokePartial(partials.headerRow,depth0,{"name":"headerRow","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.rows : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </table>\n    <div class=\"add-option\">\n        <button type=\"button\" id=\"add-new-item\">\n            <i class=\"fa fa-plus\"></i>Add New Item</button>\n    </div>\n"
    + ((stack1 = container.invokePartial(partials.modal,depth0,{"name":"modal","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</section>";
},"usePartial":true,"useData":true});
})();