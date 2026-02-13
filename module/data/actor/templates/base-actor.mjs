import UHkRpgDataModel from "../../base-model.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
} = foundry.data.fields;

export default class UHkRpgActorBase extends UHkRpgDataModel {

    static defineSchema() {
        return {
            biography: new HTMLField(),
            attributes: new SchemaField(Object.keys(CONFIG.U_HK_RPG.attributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, float: true, initial: 10, min: 0}),
                });
                return obj;
            }, {})),

            secondaryAttributes: new SchemaField(Object.keys(CONFIG.U_HK_RPG.secondaryAttributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, float: true, initial: 10, min: 0}),
                });
                return obj;
            }, {})),
            traits: new ArrayField(
                new SchemaField({
                    hungerCost: new NumberField ({float: true, initial: 0}),
                    spookMod: new NumberField ({float: true, initial: 0}),
                    cuteMod: new NumberField ({float: true, initial: 0}),
                    description: new StringField ({required: true, initialValue: "Description here"}),
                })
            ),
            spook: new NumberField({required: true, float: true, initial: 0}),
            cute: new NumberField({required: true, float: true, initial: 0}),
            speed: new SchemaField({
                value: new NumberField({required: true, float: true, min: 0, initial: 0}),
                min: new NumberField({required: true, float: true, min: 0, initial: 0}),
                max: new NumberField({required: true, float: true, min: 0, initial: 0}),
            }),
            bulk: new NumberField({required: true, float: true, min: 1, initial: 1}),
            size: new NumberField({required: true, Integer: true, min: 1, initial: 1}),
            absorption: new NumberField({float: true, min: 1, initial: 1}),
            pools: new SchemaField({
                heart: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    lifeblood: new NumberField({integer: true, min: 0, initial: 0}),
                }),
                soul: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                }),
                stamina: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 3}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 3}),
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                }),
                stash: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    glory: new NumberField({integer: true, min: 0, initial: 0}),
                })
            }),
            description: new StringField({initial: "Description here"}),
            notes: new StringField({initial: "Notes here"}),
        }
    }

}