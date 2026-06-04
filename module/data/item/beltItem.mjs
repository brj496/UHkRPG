import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, equippableItemFields } from "../utils/fields.mjs";

const { BooleanField } = foundry.data.fields;

export default class UHkRpgBeltItem extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),
            ...equippableItemFields(),

            isOnBelt: new BooleanField({initial: false}),
        }
    }
};
