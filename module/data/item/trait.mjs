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
            //TODO: Look into how to link a parent trait via either UUID or object. It does not need to be added automatically

            parentTrait: new StringField({
                initial: ""
            }),

            //TODO: Figure out how to Link a weapon that would be added to the character's inventory
            naturalWeaponUUID: new StringField({
                initial: ""
            })
        }
    }
};
