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

export default class UHkRpgModifier extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            itemType: new StringField({
                required: true,
                initial: "weapon",
                choices: ["weapon", "shield", "armor"]
            }),
            cost: new NumberField({initial: 0, min: 0,
                usesBaseCost: new BooleanField({initial: true})
            }), //Tends to be some sort of formula that takes the base cost of a weapon into account.
            effect: new StringField({initial: "effect"}),
        }
    }
};