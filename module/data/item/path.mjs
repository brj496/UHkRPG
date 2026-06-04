import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
} = foundry.data.fields;

export default class UHkRpgPath extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            pathRank: new NumberField({initial: 1, integer: true, min: 1}),
            ranks: new ArrayField(
                new SchemaField({
                    description: new StringField({required: true, initial: "description"}),
                })
            ),
        }
    }
};
