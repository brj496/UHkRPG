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
            range: new NumberField({initial: 0, min: 0}),
            hands: new StringField({initial: "1H"}),
            isArcaneFocus: new BooleanField({initial: false}),
            attuned: new BooleanField({initial: false}),
        }
    }
};
