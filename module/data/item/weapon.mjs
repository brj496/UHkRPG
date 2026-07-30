import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields } from "../utils/fields.mjs";

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

            quality: new NumberField({initial: 0, min: 0, max: 3}),
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
            techniqueIds: new ArrayField(new StringField({
                required: true,
                blank: false
            }), {
                initial: []
            }),
            modifierId: new StringField({initial: ""}),
        }
    }

    /**
     * Returns the actual Item documents for the attached modifier.
     */
    get modifier() {
        const parentActor = this.parent.actor;
        return parentActor?.items.get(this.modifierId) || game.items.get(this.modifierId);
    }

    /**
     * Returns the actual Item documents for the techniques.
     * Logic: Look on the parent Actor first, then the World.
     */
    get techniques() {
        const parentActor = this.parent.actor;
        return this.techniqueIds.map(id => {
            return parentActor?.items.get(id) || game.items.get(id);
        }).filter(i => !!i); // Filter out any that weren't found
    }
};
