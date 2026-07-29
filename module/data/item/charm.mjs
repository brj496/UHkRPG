import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgCharm extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            cost: new NumberField({
                initial: 0,
                min: 0
            }),
            rarity: new StringField({
                initial: ""
            }),
            negativeModifier: new StringField({
               initial: ""
            }),
            slotCost: new NumberField({
                initial: 0,
                max: 3,
                min: 0
            }),
            equipped: new BooleanField({
                initial: false
            }),
            stashBonus: new NumberField({
                initial: 0,
                min: 0
            }),
            synergy: new SchemaField({
                synergyCharm: new StringField({
                        initial: ""
                }),
                synergyEffect: new StringField({
                    initial: ""
                })
            })
        }
    }
}