import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields } from "../utils/fields.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
} = foundry.data.fields;

export default class UHkRpgArmor extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),
            ...equippableItemFields(),

            durability: new SchemaField({
                max: new NumberField({initial: 3, min: 1, max: 9}),
                current: new NumberField({initial: 3, min: 0, max: 9}),
            }),
            damageReduction: new NumberField({initial: 0, min: 0, max: 2}),

            modifierId: new StringField({initial: ""}),
        }
    }

    /**
     * Returns the actual Item documents for the modifier.
     * Logic: Look on the parent Actor first, then the World.
     */
    get modifier() {
        const parentActor = this.parent.actor;

        return parentActor?.items.get(this.modifierId) || game.items.get(this.modifierId);
    }
};
