import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgTool extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            cost: new NumberField({initial: 0, min: 0}),
            bulk: new NumberField({initial: 0, min: 0}),
            skills: new ArrayField({
                skillName: new StringField({initial: "Skill Name"}),
            }),
            weaponType: new ArrayField(
                new SchemaField({
                    typeName: new StringField({initial: "type"})
                })
            ),
        }
    }
};