import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, qualityField } from "../utils/fields.mjs";

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
            ...qualityField(),

            skills: new ArrayField(
                new SchemaField({
                    skillName: new StringField({initial: "Skill Name"}),
                }),
            ),
            weaponType: new ArrayField(
                new SchemaField({
                    typeName: new StringField({initial: "type"})
                })
            ),
        }
    }
};
