import UHkRpgItemBase from "./templates/base-item.mjs";
import { poolField } from "../utils/fields.mjs"

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    HTMLField
} = foundry.data.fields;

export default class UHkRpgPath extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            currRank: new NumberField({initial: 1, integer: true, min: 1, max: 3}),
            pathType: new StringField({initial: ""}), //Martial/Mystic

            ranks: new SchemaField({
                rank1: new SchemaField({
                    name: new StringField({initial: ""}),
                    skills: new ArrayField(
                        new SchemaField({
                            name: new StringField({initial: ""}),
                            description: new HTMLField({initial: ""}),
                            stashBonus: new NumberField({initial: 0}),
                            skillID: new StringField({initial: ""}),
                            //TODO: Maybe add a new action field or something.
                        })
                    )
                }),
                rank2: new SchemaField({
                    name: new StringField({initial: ""}),
                    skills: new ArrayField(
                        new SchemaField({
                            name: new StringField({initial: ""}),
                            description: new HTMLField({initial: ""}),
                            stashBonus: new NumberField({initial: 0}),
                            skillID: new StringField({initial: ""}),
                            //TODO: Maybe add a new action field or something.
                        })
                    )
                }),
                rank3: new SchemaField({
                    name: new StringField({initial: ""}),
                    skills: new ArrayField(
                        new SchemaField({
                            name: new StringField({initial: ""}),
                            description: new HTMLField({initial: ""}),
                            stashBonus: new NumberField({initial: 0}),
                            skillID: new StringField({initial: ""}),
                            //TODO: Maybe add a new action field or something.
                        })
                    )
                })
            }),
        }
    }
};
