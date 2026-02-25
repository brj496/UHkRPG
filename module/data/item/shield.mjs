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

export default class UHkRpgShield extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            //TODO: Might have to change how arrays are handled in Schemas.
            damage: new SchemaField({
                damageType: new StringField({}),
                value: new NumberField({initial: 0, min: 0}),
            }),
            bulk: new NumberField({initial: 0, min: 0}),
            cost: new NumberField({initial: 0, min: 0}),
            effect: new StringField({initial: ""}),
            //TODO: Modifiers may potentially behave like items being added to a character's inventory. They have an
            // embedded collection that holds a dictionary of keys (the id of the item) and values (the item's object).
            // Look into how to handle that. for now modifiers will just be an empty array.\

            // modifiers: new ArrayField({
            //
            // }),
        }
    }
};