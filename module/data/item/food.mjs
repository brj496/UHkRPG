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
                basePerServing: new NumberField({initial: 0, min: 0}),
                curBellyServing: new NumberField({initial: 0, min: 0}),
            }),
            bulk: new SchemaField({
                bulkPerServing: new NumberField({initial: 0, min: 0}),
                curBulkServing: new NumberField({initial: 0, min: 0}),
            }),
            costPerServing: new NumberField({initial: 0, min: 0}),
            count: new NumberField({initial: 0, min: 1}),
            effect: new StringField({initial: ""}),
        }
    }
};