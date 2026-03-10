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

export default class UHkRpgConsumable extends UHkRpgItemBase {
    static defineSchema() {
        const itemBaseSchema = UHkRpgItemBase.defineSchema();
        return {
            ...itemBaseSchema,

            type: new StringField({
                required: true,
                initial: "",
                choices: [CONFIG.U_HK_RPG.consumableTypes]
            }),

            cost: new NumberField({
                isEditable: false,
                initial: 0,
                min: 0
            }),
            count: new NumberField({
                isEditable: false,
                initial: 0,
                min: 1
            }),
            rarity: new StringField({
                isEditable: false,
                initial: "N/A",
                choices: ["N/A", "common", "uncommon", "rare", "legendary"],
            }),
            bulk: new NumberField({
                isLight: false,
                initial: 0,
                min: 0
            }),

            // ----- Poison Specific ----- //
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            doses: new NumberField({
                isEditable: false,
                initial: 1,
                currentDoses: 3,
                min: 1,
                max: 3
            }),
            poisonEffect: new StringField({
                isEditable: false,
                initial: "poison effect"
            }),

            // ----- Potion Specific ----- //
            isAlcohol: new BooleanField({
                isEditable: false,
                initial: false,
            }),
            strain: new NumberField({
                isEditable: false,
                initial: 0,
                value: 0,
                min: 0
            }),
            potionEffects: new SchemaField({
                isEditable: false,
                overdose: new StringField({
                    initial: "Overdose"
                }),
                effect: new StringField({
                    initial: "Potion Effect"
                }),
            }),

            // ----- Trap Specific ----- //
            isReusable: new BooleanField({
                isEditable: false,
                initial: "Trap Effect"
            }),
            trapEffect: new StringField({
                isEditable: false,
                initial: "Trap Effect"
            }),

            // ----- Food Specific ----- //
            spoilage: new SchemaField({
                isEditable: false,
                spoilRate: new NumberField({initial: 5}),
                numRests: new NumberField({initial: 0, max: 5}),
                isSpoiled: new BooleanField({initial: false}),
            }),
            belly: new SchemaField({
                isEditable: false,
                basePerServing: new NumberField({initial: 0, min: 0}),
                curBellyServing: new NumberField({initial: 0, min: 0}),
            }),
            costPerServing: new NumberField({
                isEditable: false,
                initial: 0,
                min: 0
            }),
            foodEffect: new StringField({
                isEditable: false,
                initial: ""
            }),
        }
    }

    prepareDerivedData() {
        super.prepareDerivedData();

        //TODO: Depending on the selected type, prepare the correct type of data.
        // it may also need a reload when selecting the type.
        // maybe instead, add the keys of each specific type based on the selected type here.
    }
};