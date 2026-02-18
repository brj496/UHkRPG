import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    NumberField,
} = foundry.data.fields;

export default class UHkRpgTrait extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            cuteMod: new NumberField({initial: 0, float: true}),
            spookMod: new NumberField({initial: 0, float: true}),
            HungerMod: new NumberField({initial: 0, integer: true}),
        }
    }
};