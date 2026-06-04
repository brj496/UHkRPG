import UHkRpgItemBase from "./templates/base-item.mjs";
import {poolField, skillField} from "../utils/fields.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgProficiency extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            rank: new NumberField({required: true, min: 1, max: 3, initial: 1}),
            skills: new SchemaField({
                skill1: skillField({skillName: "Skill 1"}),
                skill2: skillField({skillName: "Skill 2"}),
                skill3: skillField({skillName: "Skill 3"}),
                skill4: skillField({skillName: "Skill 4"}),
            })
        }
    }
};
