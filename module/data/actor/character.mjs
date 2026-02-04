import UHkTtrpgActorBase from "./templates/base-actor.mjs";

export default class UHkTtrpgCharacter extends UHkTtrpgActorBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        // schema.attributes = new fields.SchemaField({
        //   level: new fields.SchemaField({
        //     value: new fields.NumberField({ ...requiredInteger, initial: 1 })
        //   }),
        // });

        // Iterate over ability names and create a new SchemaField for each.


        return schema;
    }

    prepareDerivedData() {
        // Loop through ability scores, and add their modifiers to our sheet output.
        for (const key in this.attributes) {
            //prepare secondary attributes here:
            switch (key) {
                case "might":
                    this.secondaryAttributes.load = Math.floor(this.attributes[key]);
                    continue;
                case "insight":
                    this.secondaryAttributes.techniqueSlots = Math.floor(this.attributes[key]);
                    continue;
                case "shell":
                    this.secondaryAttributes.beltSize = Math.floor(this.attributes[key]);
                    continue;
                case "grace":
                    this.secondaryAttributes.footwork = Math.ceil(this.attributes[key]/2);
            }
        }
        for (const key in this.attributes) {
            // Calculate the modifier using d20 rules.
            this.attributes[key].mod = Math.floor((this.attributes[key].value - 10) / 2);
            // Handle ability label localization.
            // eslint-disable-next-line no-undef
            console.log(key)
            // eslint-disable-next-line no-undef
            this.attributes[key].label = game.i18n.localize(CONFIG.U_HK_TTRPG.attributes[key]) ?? key;
            // eslint-disable-next-line no-undef
            console.log(this.attributes[key])
        }
    }

    getRollData() {
        const data = {};

        // Copy the ability scores to the top level, so that rolls can use
        // formulas like `@str.mod + 4`.
        if (this.attributes) {
            for (let [k, v] of Object.entries(this.attributes)) {
                // eslint-disable-next-line no-undef
                data[k] = foundry.utils.deepClone(v);
            }
        }

        // data.lvl = this.attributes.level.value;
        return data
    }
}