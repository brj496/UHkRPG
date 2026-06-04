import UHkRpgActorBase from "./templates/base-actor.mjs";
import { poolField } from "../utils/fields.mjs"

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgCharacter extends UHkRpgActorBase {

    static defineSchema() {
        return {
            ...super.defineSchema(),

            belly: poolField({value: 10, max: 10}),
            hunger: poolField({value: 0, min: 0, max: 0}),
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
        }
    }

    prepareDerivedData() {
        for (const key in this.attributes) {
            this.attributes[key].label = game.i18n.localize(CONFIG.U_HK_RPG.attributes[key]) ?? key;
        }
        for (const key in this.secondaryAttributes) {
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
    }

    getRollData() {
        const data = {};

        if (this.attributes) {
            for (let [k, v] of Object.entries(this.attributes)) {
                data[k] = foundry.utils.deepClone(v);
            }
        }

        return data;
    }
}
