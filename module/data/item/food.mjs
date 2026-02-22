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

export default class UHkRpgFood extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            spoilage: new SchemaField({
                spoilRate: new NumberField({initial: 5}),
                numRests: new NumberField({initial: 0, max: 5}),
                isSpoiled: new BooleanField({initial: false}),
            }),
            belly: new SchemaField({
                basePerServing: NumberField({initial: 0, min: 0}),
                curBellyServing: NumberField({initial: 0, min: 0}),
            }),
            bulk: new SchemaField({
                bulkPerServing: NumberField({initial: 0, min: 0}),
                curBulkServing: NumberField({initial: 0, min: 0}),
            }),
            costPerServing: NumberField({initial: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            effect: new StringField({initial: ""}),
        }
    }
};