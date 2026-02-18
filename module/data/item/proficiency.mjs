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

export default class UHkRpgProficiency extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            rank: new NumberField({required: true, min: 1, max: 3, initial: 1}),
            //TODO: maybe make this more flexible at some point, rather than hard coding 4 skills.
            skills: new SchemaField({
                skill1: new SchemaField({
                    name: new StringField({required: true, initial: "Skill 1"}),
                    mastery: new BooleanField({initial: false}),
                    rerolls: new NumberField({required: true, integer: true})
                }),
                skill2: new SchemaField({
                    name: new StringField({required: true, initial: "Skill 2"}),
                    mastery: new BooleanField({initial: false}),
                    rerolls: new NumberField({required: true, integer: true})
                }),
                skill3: new SchemaField({
                    name: new StringField({required: true, initial: "Skill 3"}),
                    mastery: new BooleanField({initial: false}),
                    rerolls: new NumberField({required: true, integer: true})
                }),
                skill4: new SchemaField({
                    name: new StringField({required: true, initial: "Skill 4"}),
                    mastery: new BooleanField({initial: false}),
                    rerolls: new NumberField({required: true, integer: true})
                })
            })
        }
    }

    prepareDerivedData() {

    }

};