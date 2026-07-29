import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    StringField,
    NumberField,
} = foundry.data.fields;

export default class UHkRpgLoot extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            cost: new NumberField({
                initial: 0,
                min: 0
            }),
            count: new NumberField({
                initial: 0,
                min: 0
            }),
            type: new StringField({
                required: true,
                initial: "",
            })

        }
    }
};