import UHkRpgActorBase from "./templates/base-actor.mjs";
import { poolField } from "../utils/fields.mjs"

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgCharacter extends UHkRpgActorBase {

    static defineSchema() {
        return {
            ...super.defineSchema(),

            belly: poolField({value: 10, max: 10}),
            hunger: poolField({value: 0, min: 0, max: 0}),
            geo: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            notches: new NumberField({required: true, integer: true, min: 0, initial: 0}),
            customPools: new ArrayField(
                new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    gloryPool: new NumberField({integer: true, min: 0, initial: 0}),
                })
            ),
            proficiencies: new ArrayField(
                new SchemaField({
                    proficiencyName: new StringField({initial: "Proficiency Name"}),
                    affectedSkills: new ArrayField(
                        new SchemaField({
                            skillName: new StringField({initial: "Skill Name"}),
                            mastery: new BooleanField({initial: false})
                        })
                    )
                })
            ),
            load: new NumberField({required: true, integer: true, min: 0, initial: 0}),
        }
    }



    getRollData() {
        const data = {};

        if (this.attributes) {
            for (let [k, v] of Object.entries(this.attributes)) {
                data[k] = foundry.utils.deepClone(v);
            }
        }

        return data;
    }
}
