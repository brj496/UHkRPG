import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields } from "../utils/fields.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
} = foundry.data.fields;

export default class UHkRpgShield extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),
            ...equippableItemFields(),

            quality: new NumberField({initial: 0, min: 0, max: 3}),
            damage: new SchemaField({
                damageType: new StringField({}),
                value: new NumberField({initial: 0, min: 0}),
            }),

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
