import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    StringField,
} = foundry.data.fields;

export default class UHkRpgModifier extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            itemType: new StringField({initial: ""}),
            cost: new StringField({initial: ""}),
        }
    }
};
