import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields, qualityField } from "../utils/fields.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgWeapon extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),
            ...equippableItemFields(),
            ...qualityField(),

            type: new ArrayField(
                new StringField({
                    required: true,
                    choices: Object.keys(CONFIG.U_HK_RPG.weaponTypes)
                })
            ),
            damage: new SchemaField({
                damageType: new StringField({}),
                value: new NumberField({initial: 0, min: 0}),
            }),
            range: new StringField({initial: ""}),
            hands: new StringField({initial: ""}),
            isArcaneFocus: new BooleanField({initial: false}),
            attuned: new BooleanField({initial: false}),
            naturalWeapon: new BooleanField({initial: false}),

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
