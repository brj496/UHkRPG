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

export default class UHkRpgPoison extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            cost: new NumberField({initial: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            rarity: new StringField({
                required: true,
                initial: "common",
                choices: ["common", "uncommon", "rare", "legendary"],
            }),
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            doses: new NumberField({initial: 1, min: 1, max: 3}),
            effect: new StringField({initial: "effect"}),
        }
    }
};