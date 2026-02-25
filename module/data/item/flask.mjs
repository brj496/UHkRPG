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

export default class UHkRpgFlask extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            isRejuvenating: new BooleanField({initial: false}),
            cost: new NumberField({initial: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            rarity: new StringField({
                required: true,
                initial: "common",
                choices: ["common", "uncommon", "rare", "legendary"],
            }),
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            effects: new SchemaField({
                targeted: new StringField({initial: ""}),
                terrain: new StringField({initial: ""}),
                ingested: new StringField({initial: ""}),
                isPlus: new BooleanField({initial: false}),
            }),
        }
    }
};