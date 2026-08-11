import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    NumberField,
    StringField,
    SchemaField
} = foundry.data.fields;

export default class UHkRpgTrait extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            cuteMod: new NumberField({initial: 0, float: true}),
            spookMod: new NumberField({initial: 0, float: true}),
            hungerMod: new NumberField({initial: 0, integer: true}),

            type: new StringField({
                required: true,
                initial: "",
            }),
            parentTraitId: new StringField({
                initial: ""
            }),

            //TODO: Possibly consider a child trait system for making sure the player has the correct traits.
            // For now, just handle it manually.

            naturalWeaponId: new StringField({
                initial: ""
            })
        }
    }

    /**
     * Returns the actual Item documents for the Natural Weapon.
     * Logic: Look on the parent Actor first, then the World.
     */
    get naturalWeapon() {
        const parentActor = this.parent.actor;
        return parentActor?.items.get(this.naturalWeaponId) || game.items.get(this.naturalWeaponId);
    }

    /**
     * Returns the actual Item documents for the Parent Trait.
     * Logic: Look on the parent Actor first, then the World.
     */
    get parentTrait() {
        const parentActor = this.parent.actor;
        return parentActor?.items.get(this.parentTraitId) || game.items.get(this.parentTraitId);
    }
};
