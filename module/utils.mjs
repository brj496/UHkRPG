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
            console.log(array, value);
            console.log(Array.isArray(array) && array.includes(value));
            return Array.isArray(array) && array.includes(value);
        }
    })

    Handlebars.registerHelper({
        "add": function (num1, num2) {
            return num1 + num2;
        }
    })

    Handlebars.registerHelper({
        "loop": function (n, block) {
            let accum = "";

            for (let i = 1; i <= n; i++) {
                accum += block.fn(i);
            }

            return accum;
        }
    });
}