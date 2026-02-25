import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgArmor extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            durability: new NumberField({initial: 0, min: 0, max: 9}),
            damageReduction: new NumberField({initial: 0, min: 0, max: 2}),
            bulk: new NumberField({initial: 0, min: 0}),
            cost: new NumberField({initial: 0, min: 0}),
            effect: new StringField({initial: ""}),
            //TODO: Modifiers may potentially behave like items being added to a character's inventory. They have an
            // embedded collection that holds a dictionary of keys (the id of the item) and values (the item's object).
            // Look into how to handle that. for now modifiers will just be an empty array.
            // THERE IS AN EMBEDDEDDATAFIELD

            // modifiers: new ArrayField({
            //
            // }),
        }
    }
};