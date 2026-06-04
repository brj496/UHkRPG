import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields } from "../utils/fields.mjs";

const { StringField } = foundry.data.fields;

export default class UHkRpgTreasure extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),

            effect: new StringField({initial: ""}),
        }
    }
};
