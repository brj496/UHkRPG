import UHkRpgItemBase from "./templates/base-item.mjs";

const { NumberField } = foundry.data.fields;

export default class UHkRpgSpell extends UHkRpgItemBase {

    static defineSchema() {
        return {
            ...super.defineSchema(),

            spellLevel: new NumberField({
                required: true,
                nullable: false,
                integer: true,
                initial: 1,
                min: 1,
                max: 9
            }),
        }
    }
}
