import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields, qualityField } from "../utils/fields.mjs";

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
            ...qualityField(),

            damage: new SchemaField({
                damageType: new StringField({}),
                value: new NumberField({initial: 0, min: 0}),
            }),
        }
    }
};
