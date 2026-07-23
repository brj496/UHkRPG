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

    Handlebars.registerHelper({
        "array": function () {
            return Array.prototype.slice.call(arguments, 0, -1);
        }
    })

    Handlebars.registerHelper(
        "concat", function (...args) {
        // Last argument is the Handlebars options object
        args.pop();

        return args.join("");
    });

    /**
     * Takes a list of items and localizes each one, then joins them into a single string for display
     * @param list: A list of Strings
     * @param configType: any of the lists stored in config.mjs e.g. weaponTypes, traitTypes, activationCosts...
     * @return: a string representing the localized list.
     */
    Handlebars.registerHelper(
        "localizeList", function (list, configType, key) {
            if (!list || !Array.isArray(list)) return "";

            return list
                .map(item => {
                    const label = CONFIG.U_HK_RPG[configType][item][key];

                    console.log(label)
                    return game.i18n.localize(label);
                })
                .join(", ");
        }
    )
}