import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
} = foundry.data.fields;

export default class UHkRpgItem extends UHkRpgItemBase {

    static defineSchema() {
        const requiredInteger = {required: true, nullable: false, integer: true};

        return {
            ...super.defineSchema(),

            quantity: new NumberField({...requiredInteger, initial: 1, min: 1}),
            weight: new NumberField({required: true, nullable: false, initial: 0, min: 0}),
            roll: new SchemaField({
                diceNum: new NumberField({...requiredInteger, initial: 1, min: 1}),
                diceSize: new StringField({initial: "d20"}),
                diceBonus: new StringField({initial: "+@str.mod+ceil(@lvl / 2)"})
            }),
            formula: new StringField({blank: true}),
        }
    }

    prepareDerivedData() {
        const roll = this.roll;
        this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`;
    }
}
