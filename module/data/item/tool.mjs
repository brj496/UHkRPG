import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields } from "../utils/fields.mjs";

const {
    SchemaField,
    StringField,
    ArrayField,
} = foundry.data.fields;

export default class UHkRpgTool extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),
            ...physicalItemFields(),

            skills: new StringField({
                initial: ""
            }),
            type: new ArrayField(
                new StringField({
                    required: true,
                    choices: Object.keys(CONFIG.U_HK_RPG.weaponTypes)
                })
            ),
        }
    }
};
