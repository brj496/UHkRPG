import UHkRpgDataModel from "../../base-model.mjs";
import { poolField } from "../../utils/fields.mjs"

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
} = foundry.data.fields;

export default class UHkRpgActorBase extends UHkRpgDataModel {

    static defineSchema() {
        return {
            biography: new HTMLField(),
            attributes: new SchemaField(Object.keys(CONFIG.U_HK_RPG.attributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, float: true, initial: 3, min: 0, max: 7}),
                });
                return obj;
            }, {})),
            secondaryAttributes: new SchemaField(Object.keys(CONFIG.U_HK_RPG.secondaryAttributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, float: true, initial: 0, min: 0}),
                });
                return obj;
            }, {})),
            //NOTE: Something like this may not be necessary, as the traits are stored as items in the character's inventory/embedded collection
            traits: new ArrayField(
                new SchemaField({
                    hungerCost: new NumberField({float: true, initial: 0}),
                    spookMod: new NumberField({float: true, initial: 0}),
                    cuteMod: new NumberField({float: true, initial: 0}),
                    description: new StringField({required: true, initialValue: "Description here"}),
                })
            ),
            spook: new NumberField({required: true, float: true, initial: 0}),
            cute: new NumberField({required: true, float: true, initial: 0}),
            speed: new NumberField({required: true, float: true, min: 0, initial: 0}),
            bulk: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            size: new NumberField({required: true, integer: true, min: 1, initial: 1}),
            absorption: new NumberField({float: true, min: 0, initial: 0}),
            pools: new SchemaField({
                heart: poolField({value: 3, max: 7, extraFields: {
                    lifeblood: new NumberField({integer: true, min: 0, initial: 0}),
                }}),
                soul: poolField({value: 3, max: 7, extraFields: {
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                }}),
                stamina: poolField({value: 3, max: 7, extraFields: {
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                }}),
                stash: poolField({value: 3, max: 7, extraFields: {
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                }}),
            }),

            description: new StringField({initial: "Description here"}),
            notes: new StringField({initial: "Notes here"}),
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
}
