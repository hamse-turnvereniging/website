import Handlebars from 'handlebars/runtime.js';

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\r\n                <td style=\"padding: 12px 24px 0\">\r\n                  <h2\r\n                    style=\"\r\n                    margin: 0 0 8px;\r\n                    font-size: 14px;\r\n                    color: #059e95;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                  >\r\n                    Contactgegevens\r\n                  </h2>\r\n                  <table\r\n                    role=\"presentation\"\r\n                    width=\"100%\"\r\n                    cellspacing=\"0\"\r\n                    cellpadding=\"0\"\r\n                    border=\"0\"\r\n                    style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                  >\r\n                    <tr>\r\n                      <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Telefoon</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"tel:"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"phoneNumber") : depth0), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"phoneNumber") : depth0), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">E-mail</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"mailto:"
    + alias2(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":318,"column":39},"end":{"line":318,"column":48}}}) : helper)))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":320,"column":33},"end":{"line":320,"column":42}}}) : helper)))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\r\n                <td style=\"padding: 12px 24px 0\">\r\n                  <h2\r\n                    style=\"\r\n                      margin: 0 0 8px;\r\n                      font-size: 14px;\r\n                      color: #059e95;\r\n                      font-weight: 700;\r\n                      font-family: 'Open Sans', sans-serif;\r\n                    \"\r\n                  >\r\n                    Wie mogen we bellen in geval van nood?\r\n                  </h2>\r\n                  <table\r\n                    role=\"presentation\"\r\n                    width=\"100%\"\r\n                    cellspacing=\"0\"\r\n                    cellpadding=\"0\"\r\n                    border=\"0\"\r\n                    style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                  >\r\n                    <tr>\r\n                      <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Naam</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"emergencyContact") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + "\r\n                          "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"emergencyContact") : depth0)) != null ? lookupProperty(stack1,"lastName") : stack1), depth0))
    + "</strong>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">Telefoon</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"tel:"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"emergencyContact") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"emergencyContact") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\r\n                <td style=\"padding: 12px 24px 0\">\r\n                  <h2\r\n                    style=\"\r\n                      margin: 0 0 8px;\r\n                      font-size: 14px;\r\n                      color: #059e95;\r\n                      font-weight: 700;\r\n                      font-family: 'Open Sans', sans-serif;\r\n                    \"\r\n                  >\r\n                    Contact ouder 1\r\n                  </h2>\r\n                  <table\r\n                    role=\"presentation\"\r\n                    width=\"100%\"\r\n                    cellspacing=\"0\"\r\n                    cellpadding=\"0\"\r\n                    border=\"0\"\r\n                    style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                  >\r\n                    <tr>\r\n                      <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Naam</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"lastName") : stack1), depth0))
    + "</strong>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">Telefoon</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"tel:"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">E-mail</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"mailto:"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <tr>\r\n                <td style=\"padding: 12px 24px 0\">\r\n                  <h2\r\n                    style=\"\r\n                      margin: 0 0 8px;\r\n                      font-size: 14px;\r\n                      color: #059e95;\r\n                      font-weight: 700;\r\n                      font-family: 'Open Sans', sans-serif;\r\n                    \"\r\n                  >\r\n                    Contact ouder 2\r\n                  </h2>\r\n                  <table\r\n                    role=\"presentation\"\r\n                    width=\"100%\"\r\n                    cellspacing=\"0\"\r\n                    cellpadding=\"0\"\r\n                    border=\"0\"\r\n                    style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                  >\r\n                    <tr>\r\n                      <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Naam</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"lastName") : stack1), depth0))
    + "</strong>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">Telefoon</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"tel:"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"phoneNumber") : stack1), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">E-mail</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <a\r\n                          href=\"mailto:"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\"\r\n                          style=\"color: #0f172a; text-decoration: none\"\r\n                        ><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "</strong></a>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                      <td style=\"padding: 6px 0\">\r\n                        <span style=\"text-decoration: line-through;\">&euro; "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"amount") || (depth0 != null ? lookupProperty(depth0,"amount") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"amount","hash":{},"data":data,"loc":{"start":{"line":508,"column":76},"end":{"line":508,"column":86}}}) : helper)))
    + "</span>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is60PlusAtEndOfThisYear") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":509,"column":24},"end":{"line":519,"column":31}}})) != null ? stack1 : "")
    + "                      </td>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                          <strong>&nbsp;&euro;\r\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"discountedAmount") || (depth0 != null ? lookupProperty(depth0,"discountedAmount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discountedAmount","hash":{},"data":data,"loc":{"start":{"line":511,"column":28},"end":{"line":511,"column":48}}}) : helper)))
    + "\r\n                            ("
    + alias4(((helper = (helper = lookupProperty(helpers,"discount") || (depth0 != null ? lookupProperty(depth0,"discount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discount","hash":{},"data":data,"loc":{"start":{"line":512,"column":29},"end":{"line":512,"column":41}}}) : helper)))
    + "\r\n                            euro korting voor 60-plussers)</strong>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"familyMember") : depth0)) != null ? lookupProperty(stack1,"check") : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":514,"column":24},"end":{"line":519,"column":24}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                          <strong>&nbsp;&euro;\r\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"discountedAmount") || (depth0 != null ? lookupProperty(depth0,"discountedAmount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discountedAmount","hash":{},"data":data,"loc":{"start":{"line":516,"column":28},"end":{"line":516,"column":48}}}) : helper)))
    + "\r\n                            ("
    + alias4(((helper = (helper = lookupProperty(helpers,"discount") || (depth0 != null ? lookupProperty(depth0,"discount") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"discount","hash":{},"data":data,"loc":{"start":{"line":517,"column":29},"end":{"line":517,"column":41}}}) : helper)))
    + "\r\n                            euro korting via gezinslid)</strong>\r\n                        ";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                      <td style=\"padding: 6px 0\"><strong>&euro; "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"amount") || (depth0 != null ? lookupProperty(depth0,"amount") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"amount","hash":{},"data":data,"loc":{"start":{"line":522,"column":64},"end":{"line":522,"column":74}}}) : helper)))
    + "</strong></td>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <tr>\r\n                      <td style=\"padding: 6px 6px 6px 0px\">Ik heb een gezinslid dat reeds\r\n                        ingeschreven is.</td>\r\n                      <td style=\"padding: 6px 0\">\r\n                        <strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"familyMember") : depth0)) != null ? lookupProperty(stack1,"check") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":534,"column":32},"end":{"line":534,"column":82}}})) != null ? stack1 : "")
    + "</strong>\r\n                      </td>\r\n                    </tr>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"familyMember") : depth0)) != null ? lookupProperty(stack1,"check") : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":537,"column":20},"end":{"line":544,"column":27}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    return "✅ Ja";
},"20":function(container,depth0,helpers,partials,data) {
    return "❌ Nee";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                      <tr>\r\n                        <td style=\"padding: 6px 6px 6px 0px\">Gezinslid</td>\r\n                        <td style=\"padding: 6px 0\">\r\n                          <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"familyMember") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"familyMember") : depth0)) != null ? lookupProperty(stack1,"lastName") : stack1), depth0))
    + "</strong>\r\n                        </td>\r\n                      </tr>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<html lang=\"nl\" style=\"margin: 0; padding: 0\">\r\n  <head>\r\n    <meta charset=\"utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n    <title>"
    + alias4(((helper = (helper = lookupProperty(helpers,"subject") || (depth0 != null ? lookupProperty(depth0,"subject") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data,"loc":{"start":{"line":5,"column":11},"end":{"line":5,"column":22}}}) : helper)))
    + "</title>\r\n\r\n    <!-- Webfont (fallback naar sans-serif indien niet ondersteund) -->\r\n    <link\r\n      href=\"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap\"\r\n      rel=\"stylesheet\"\r\n    />\r\n\r\n    <!--[if mso]>\r\n      <style type=\"text/css\">\r\n        * {\r\n          font-family: Arial, sans-serif !important;\r\n        }\r\n      </style>\r\n    <![endif]-->\r\n  </head>\r\n  <body\r\n    style=\"\r\n      margin: 0;\r\n      padding: 0;\r\n      background: f1f1f1;\r\n      -webkit-text-size-adjust: 100%;\r\n      -ms-text-size-adjust: 100%;\r\n      font-family: 'Open Sans', sans-serif;\r\n    \"\r\n  >\r\n    <!-- Preheader -->\r\n    <div\r\n      style=\"\r\n        display: none;\r\n        overflow: hidden;\r\n        line-height: 1px;\r\n        opacity: 0;\r\n        max-height: 0;\r\n        max-width: 0;\r\n      \"\r\n    >\r\n      Bevestiging van je inschrijving voor\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"group") || (depth0 != null ? lookupProperty(depth0,"group") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"group","hash":{},"data":data,"loc":{"start":{"line":43,"column":6},"end":{"line":43,"column":15}}}) : helper)))
    + "\r\n      in\r\n      "
    + alias4(((helper = (helper = lookupProperty(helpers,"location") || (depth0 != null ? lookupProperty(depth0,"location") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data,"loc":{"start":{"line":45,"column":6},"end":{"line":45,"column":18}}}) : helper)))
    + "\r\n      - bekijk het overzicht hieronder.\r\n    </div>\r\n\r\n    <table\r\n      role=\"presentation\"\r\n      width=\"100%\"\r\n      cellspacing=\"0\"\r\n      cellpadding=\"0\"\r\n      border=\"0\"\r\n      style=\"background: #f5f7fb\"\r\n    >\r\n      <tr>\r\n        <td align=\"center\" style=\"padding: 24px\">\r\n          <table\r\n            role=\"presentation\"\r\n            width=\"100%\"\r\n            cellspacing=\"0\"\r\n            cellpadding=\"0\"\r\n            border=\"0\"\r\n            style=\"max-width: 640px; background: #ffffff; border-radius: 12px; overflow: hidden\"\r\n          >\r\n            <!-- Header -->\r\n            <tr>\r\n              <td\r\n                style=\"\r\n                  background: #202020;\r\n                  color: #ffffff;\r\n                  padding-top: 16px;\r\n                  padding-right: 24px;\r\n                  padding-bottom: 16px;\r\n                  padding-left: 24px;\r\n                  font-family: 'Open Sans', sans-serif;\r\n                  position: relative;\r\n                \"\r\n              >\r\n                <img\r\n                  src=\"https://www.hamseturnvereniging.be/cdn-cgi/image/w=160,h=160,q=100,fit=cover/images/logo.png\"\r\n                  height=\"80\"\r\n                  alt=\"Hamse Turnvereniging logo\"\r\n                />\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Intro -->\r\n            <tr>\r\n              <td\r\n                style=\"\r\n                  padding: 18px 24px;\r\n                  color: #0f172a;\r\n                  font-size: 14px;\r\n                  line-height: 1.6;\r\n                  font-family: 'Open Sans', sans-serif;\r\n                \"\r\n              >\r\n                <h1\r\n                  style=\"\r\n                    color: #a0ef94;\r\n                    margin: 0 0 12px;\r\n                    font-size: 20px;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  Bevestiging inschrijving\r\n                </h1>\r\n                <p style=\"margin: 0 0 12px\">Welkom "
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":111,"column":51},"end":{"line":111,"column":64}}}) : helper)))
    + "!</p>\r\n                <p style=\"margin: 0\">\r\n                  Bedankt voor je inschrijving bij de Hamse Turnvereniging. Hieronder vind je een\r\n                  overzicht van de gegevens die we hebben ontvangen.\r\n                </p>\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Snelle samenvatting -->\r\n\r\n            <!-- Groep en locatie -->\r\n            <tr>\r\n              <td style=\"padding: 12px 24px 0\">\r\n                <h2\r\n                  style=\"\r\n                    margin: 0 0 8px;\r\n                    font-size: 16px;\r\n                    color: #059e95;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  Groep en locatie\r\n                </h2>\r\n                <table\r\n                  role=\"presentation\"\r\n                  width=\"100%\"\r\n                  cellspacing=\"0\"\r\n                  cellpadding=\"0\"\r\n                  border=\"0\"\r\n                  style=\"\r\n                    border-collapse: collapse;\r\n                    font-size: 14px;\r\n                    color: #0f172a;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  <tr>\r\n                    <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Groep</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"group") || (depth0 != null ? lookupProperty(depth0,"group") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"group","hash":{},"data":data,"loc":{"start":{"line":180,"column":55},"end":{"line":180,"column":64}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Sporthal</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"location") || (depth0 != null ? lookupProperty(depth0,"location") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data,"loc":{"start":{"line":184,"column":55},"end":{"line":184,"column":67}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Gegevens lid -->\r\n            <tr>\r\n              <td style=\"padding: 12px 24px 0\">\r\n                <hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 0 0 12px\" />\r\n                <h2\r\n                  style=\"\r\n                    margin: 0 0 8px;\r\n                    font-size: 16px;\r\n                    color: #059e95;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  Gegevens lid\r\n                </h2>\r\n                <table\r\n                  role=\"presentation\"\r\n                  width=\"100%\"\r\n                  cellspacing=\"0\"\r\n                  cellpadding=\"0\"\r\n                  border=\"0\"\r\n                  style=\"\r\n                    border-collapse: collapse;\r\n                    font-size: 14px;\r\n                    color: #0f172a;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  <tr>\r\n                    <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Voornaam</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":220,"column":55},"end":{"line":220,"column":68}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Naam</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":224,"column":55},"end":{"line":224,"column":67}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Gender</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"gender") || (depth0 != null ? lookupProperty(depth0,"gender") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gender","hash":{},"data":data,"loc":{"start":{"line":228,"column":55},"end":{"line":228,"column":65}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Geboortedatum</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"dateOfBirth") || (depth0 != null ? lookupProperty(depth0,"dateOfBirth") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateOfBirth","hash":{},"data":data,"loc":{"start":{"line":232,"column":55},"end":{"line":232,"column":70}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Nationaliteit</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"nationality") || (depth0 != null ? lookupProperty(depth0,"nationality") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nationality","hash":{},"data":data,"loc":{"start":{"line":236,"column":55},"end":{"line":236,"column":70}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Adres -->\r\n            <tr>\r\n              <td style=\"padding: 12px 24px 0\">\r\n                <h2\r\n                  style=\"\r\n                    margin: 0 0 8px;\r\n                    font-size: 14px;\r\n                    color: #059e95;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  Adres\r\n                </h2>\r\n                <table\r\n                  role=\"presentation\"\r\n                  width=\"100%\"\r\n                  cellspacing=\"0\"\r\n                  cellpadding=\"0\"\r\n                  border=\"0\"\r\n                  style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                >\r\n                  <tr>\r\n                    <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Straatnaam en huisnr.</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? lookupProperty(stack1,"streetName") : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? lookupProperty(stack1,"houseNumber") : stack1), depth0))
    + "</strong>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Postcode</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? lookupProperty(stack1,"postalCode") : stack1), depth0))
    + "</strong></td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Stad/gemeente</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? lookupProperty(stack1,"city") : stack1), depth0))
    + "</strong></td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Contactgegevens -->\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"email") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":283,"column":12},"end":{"line":326,"column":19}}})) != null ? stack1 : "")
    + "\r\n            <!-- Noodcontact -->\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"emergencyContact") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":329,"column":12},"end":{"line":370,"column":19}}})) != null ? stack1 : "")
    + "\r\n            <!-- Ouders -->\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"parent1") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":373,"column":12},"end":{"line":422,"column":19}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"parent2") : depth0)) != null ? lookupProperty(stack1,"firstName") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":424,"column":12},"end":{"line":473,"column":19}}})) != null ? stack1 : "")
    + "\r\n            <!-- Betaalgegevens -->\r\n            <tr>\r\n              <td style=\"padding: 12px 24px 0\">\r\n                <hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 0 0 12px\" />\r\n                <h2\r\n                  style=\"\r\n                    margin: 0 0 8px;\r\n                    font-size: 16px;\r\n                    color: #059e95;\r\n                    font-weight: 700;\r\n                    font-family: 'Open Sans', sans-serif;\r\n                  \"\r\n                >\r\n                  Betaalgegevens lidgeld\r\n                </h2>\r\n                <table\r\n                  role=\"presentation\"\r\n                  width=\"100%\"\r\n                  cellspacing=\"0\"\r\n                  cellpadding=\"0\"\r\n                  border=\"0\"\r\n                  style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                >\r\n                  <tr>\r\n                    <td width=\"34%\" style=\"padding: 6px 6px 6px 0px\">Rekeningnummer</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>BE69 0682 0939 9078</strong>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Bedrag</td>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"discountedAmount") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":506,"column":20},"end":{"line":523,"column":27}}})) != null ? stack1 : "")
    + "                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Mededeling</td>\r\n                    <td style=\"padding: 6px 0\"><strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":527,"column":55},"end":{"line":527,"column":68}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":527,"column":69},"end":{"line":527,"column":81}}}) : helper)))
    + "</strong></td>\r\n                  </tr>\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is60PlusAtEndOfThisYear") : depth0),{"name":"unless","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":529,"column":18},"end":{"line":545,"column":29}}})) != null ? stack1 : "")
    + "                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Ik heb reeds betaald of de betaalgegevens\r\n                      zorgvuldig genoteerd.</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"paymentCheck") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":550,"column":30},"end":{"line":550,"column":74}}})) != null ? stack1 : "")
    + "</strong>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n\r\n            <tr>\r\n              <td style=\"padding: 12px 24px 0\">\r\n                <table\r\n                  role=\"presentation\"\r\n                  width=\"100%\"\r\n                  cellspacing=\"0\"\r\n                  cellpadding=\"0\"\r\n                  border=\"0\"\r\n                  style=\"font-size: 14px; color: #0f172a; font-family: 'Open Sans', sans-serif\"\r\n                >\r\n                  <tr>\r\n                    <td colspan=\"2\">\r\n                      <hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 0 0 12px\" />\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td width=\"80%\" style=\"padding: 6px 6px 6px 0px\">Foto's van lid mogen\r\n                      gepubliceerd worden.</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"photosCheck") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":576,"column":30},"end":{"line":576,"column":73}}})) != null ? stack1 : "")
    + "</strong>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Ik heb het\r\n                      <a\r\n                        href=\"https://www.hamseturnvereniging.be/clubreglement\"\r\n                        style=\"color: #059e95; text-decoration: none\"\r\n                      >clubreglement</a>\r\n                      gelezen en ga hiermee akkoord.</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"rulesCheck") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":587,"column":30},"end":{"line":587,"column":72}}})) != null ? stack1 : "")
    + "</strong>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                    <td style=\"padding: 6px 6px 6px 0px\">Ik ben akkoord dat bovenstaande gegevens\r\n                      enkel en alleen gedeeld worden met het bestuur van de\r\n                      <a\r\n                        href=\"https://www.hamseturnvereniging.be\"\r\n                        style=\"color: #059e95; text-decoration: none\"\r\n                      >Hamse Turnvereniging</a>\r\n                      en\r\n                      <a\r\n                        href=\"https://www.gymfed.be\"\r\n                        style=\"color: #059e95; text-decoration: none\"\r\n                      >Gymfed (Gymnastiekfederatie Vlaanderen)</a>.</td>\r\n                    <td style=\"padding: 6px 0\">\r\n                      <strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"privacyCheck") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":603,"column":30},"end":{"line":603,"column":74}}})) != null ? stack1 : "")
    + "</strong>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n\r\n            <!-- Wat nu -->\r\n\r\n            <!-- Footer -->\r\n            <tr>\r\n              <td\r\n                style=\"\r\n                  padding: 12px 24px 24px;\r\n                  font-size: 12px;\r\n                  line-height: 1.6;\r\n                  font-family: 'Open Sans', sans-serif;\r\n                \"\r\n              >\r\n                <hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 0 0 12px\" />\r\n                <p style=\"margin: 0\">\r\n                  Vragen? Of klopt er iets niet? Antwoord op deze e-mail met de correcties. Mail ons\r\n                  via\r\n                  <a\r\n                    href=\"mailto:info@hamseturnvereniging.be\"\r\n                    style=\"color: #059e95; text-decoration: none\"\r\n                  >info@hamseturnvereniging.be</a>.\r\n                </p>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n  </body>\r\n</html>";
},"useData":true});
