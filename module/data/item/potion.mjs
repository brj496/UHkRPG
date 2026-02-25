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

export default class UHkRpgPotion extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            isAlcohol: new BooleanField({initial: false}),
            cost: new NumberField({initial: 0, min: 0}),
            strain: new NumberField({initial: 0, value: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            rarity: new StringField({
                required: true,
                initial: "common",
                choices: ["common", "uncommon", "rare", "legendary"],
            }),
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            effects: new SchemaField({
                overdose: new StringField({initial: "overdose"}),
                effect: new StringField({initial: "effect"}),
            }),

            // effects: new SchemaField({
            //     targeted: new StringField({initial: ""}),
            //     terrain: new StringField({
            //         initial: "",
            //         isPlus: new BooleanField({initial: false}),
            //     }),
            //     ingested: new StringField({initial: ""}),
            // }),
        }
    }
};