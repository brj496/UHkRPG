import UHkRpgItemBase from "./templates/base-item.mjs";
import { physicalItemFields, qualityField } from "../utils/fields.mjs";

const {
    SchemaField,
    StringField,
    ArrayField,
    NumberField
} = foundry.data.fields;

export default class UHkRpgTool extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            // Non Specific
            techniqueType: new StringField({initial: ""}), //Arcana/Weapon Art/Ritual
            damageTypes: new ArrayField(
                new StringField({
                    required: true,
                    choices: Object.keys(CONFIG.U_HK_RPG.damageTypes)
                })
            ),

            // Weapon Art Specific
            weaponArtType: new StringField({initial: ""}), //General/Unarmed/Needle/Tusk/Natual/Hook/Sling/Shield/Counter
            activation: new SchemaField({
                activationType: new StringField({initial: ""}), //Reaction/Augment/Normal/Unique/Special
                costType: new StringField({initial: ""}), //Stamina, focus action, soul, etc
                cost: new StringField({initial: ""}), //e.g. Stamina 0-3, Item name, soul cost, etc
            }),

            // Arcana Specific
            arcanaType: new StringField({initial: ""}),
            range: new StringField({initial: ""}),
            baseDifficulty: new NumberField({initial: 0}),

            //Ritual Specific
            ritualCost: new StringField({initial: ""}),
            requirements: new StringField({initial: ""}),
            castingTime: new SchemaField({
                rounds: new StringField({initial: ""}),
                action: new StringField({initial: ""}),
            }),

            // Arcana + Ritual Specific
            duration: new StringField({initial: ""}),

        }
    }
};
