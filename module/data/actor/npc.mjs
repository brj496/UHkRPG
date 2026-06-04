import UHkRpgActorBase from "./templates/base-actor.mjs";

const { NumberField } = foundry.data.fields;

export default class UHkRpgNPC extends UHkRpgActorBase {

    static defineSchema() {
        const requiredInteger = {required: true, nullable: false, integer: true};

        return {
            ...super.defineSchema(),

            cr: new NumberField({...requiredInteger, initial: 1, min: 0}),
            xp: new NumberField({...requiredInteger, initial: 0, min: 0}),
        }
    }

    prepareDerivedData() {
        this.xp = this.cr * this.cr * 100;
    }
}
