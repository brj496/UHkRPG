import UHkRpgActorBase from "./templates/base-actor.mjs";
import {U_HK_RPG} from "../../helpers/config.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgCharacter extends UHkRpgActorBase {

    static defineSchema() {
        const actorBaseSchema = UHkRpgActorBase.defineSchema();
        return {

            //inherit base schema.
            ...actorBaseSchema,

            belly: new SchemaField({
                value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                min: new NumberField({required: true, integer: true, min: -100, initial: 0}),
                max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
            }),
            // Hunger is equal to the trait cost + base size cost.
            hunger: new SchemaField({
                value: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                max: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            }),
            geo: new SchemaField({
                value: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            }),
            notches: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            customPools: new ArrayField(
                new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    gloryPool: new NumberField({integer: true, min: 0, initial: 0}),
                })
            ),
            proficiencies: new ArrayField(
                new SchemaField({
                    proficiencyName: new StringField({initial: "Proficiency Name"}),
                    affectedSkills: new ArrayField(
                        new SchemaField({
                            skillName: new StringField({initial: "Skill Name"}),
                            mastery: new BooleanField({initial: false})
                        })
                    )
                })
            ),
            // load: new NumberField({required: true, integer: true, min: 0, initial: 10})
        }
    }

    prepareDerivedData() {
        // Loop through attributes scores, and add their modifiers to our sheet output.

        for (const key in this.attributes) {
            this.attributes[key].label = game.i18n.localize(CONFIG.U_HK_RPG.attributes[key]) ?? key;
        }
        console.log(this.attributes);
        for (const key in this.secondaryAttributes) {
            //prepare secondary attributes here:
            switch (key) {
                case "load":
                    this.secondaryAttributes[key].value = Math.floor(this.attributes["might"].value);
                    break;
                case "techniqueSlots":
                    this.secondaryAttributes[key].value = Math.floor(this.attributes["insight"].value);
                    break;
                case "beltSize":
                    this.secondaryAttributes[key].value = Math.floor(this.attributes["shell"].value);
                    break;
                case "footwork":
                    this.secondaryAttributes[key].value = Math.ceil(this.attributes["grace"].value / 2);
                    break;
            }
            this.secondaryAttributes[key].label = game.i18n.localize(CONFIG.U_HK_RPG.secondaryAttributes[key]) ?? key;
        }
        console.log(this.secondaryAttributes);
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