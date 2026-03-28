export function registerHandlebarsHelpers() {
    Handlebars.registerHelper({
        "ifEquals": function (arg1, arg2, options) {
            if (arg1 === arg2) {
                return options.fn(this);
            }
            else {
                return options.inverse(this);
            }
        }
    })
    Handlebars.registerHelper({
        "includes": function (array, value) {
            return Array.isArray(array) && array.includes(value);
        }
    })
}