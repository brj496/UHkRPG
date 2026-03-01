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

export default class UHkRpgTrap extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            isReusable: new BooleanField({initial: false}),
            cost: new NumberField({initial: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            rarity: new StringField({
                required: true,
                initial: "common",
                choices: ["common", "uncommon", "rare", "legendary"],
            }),
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            bulk: new NumberField({initial: 0, min: 0}),
            effect: new StringField({initial: "effect"}),
        }
    }
};