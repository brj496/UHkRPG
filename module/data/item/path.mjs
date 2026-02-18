import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    NumberField,
    StringField,
    SchemaField
} = foundry.data.fields;

export default class UHkRpgPath extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            pathRank: new NumberField({initial: 1, float: true}),
            ranks: new SchemaField({
                rank1: new SchemaField({
                    description: new StringField({required: true, initial: "description"}),
                }),
                rank2: new SchemaField({
                    description: new StringField({required: true, initial: "description"}),
                }),
                rank3: new SchemaField({
                    description: new StringField({required: true, initial: "description"}),
                })
            })
        }
    }
};