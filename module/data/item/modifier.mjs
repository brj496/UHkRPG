import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    NumberField,
    StringField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgModifier extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            itemType: new StringField({
                required: true,
                initial: "weapon",
                choices: ["weapon", "shield", "armor"]
            }),
            cost: new NumberField({initial: 0, min: 0}),
            usesBaseCost: new BooleanField({initial: true}),
            effect: new StringField({initial: ""}),
        }
    }
};
