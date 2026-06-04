import UHkRpgItemBase from "./templates/base-item.mjs";

const { NumberField } = foundry.data.fields;

export default class UHkRpgTrait extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            cuteMod: new NumberField({initial: 0, float: true}),
            spookMod: new NumberField({initial: 0, float: true}),
            hungerMod: new NumberField({initial: 0, integer: true}),
        }
    }
};
