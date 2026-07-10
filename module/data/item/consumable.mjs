import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
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
            }),

            cost: new NumberField({
                initial: 0,
                min: 0
            }),
            count: new NumberField({
                initial: 1,
                min: 1
            }),
            rarity: new StringField({
                initial: "",
            }),
            bulk: new NumberField({
                initial: 0,
                min: 0
            }),

            // ----- Flask Specific ----- //
            isRejuvenating: new BooleanField({initial: false}),
            flaskEffects: new SchemaField({
                targeted: new StringField({initial: "Targeted Effect"}),
                terrain: new StringField({initial: "Terrain Effect"}),
                ingested: new StringField({initial: "Ingested Effect"}),
                isPlus: new BooleanField({initial: false}),
            }),

            // ----- Food Specific ----- //
            spoilage: new SchemaField({
                spoilRate: new NumberField({initial: 5}),
                numRests: new NumberField({initial: 0, max: 5}),
                isSpoiled: new BooleanField({initial: false}),
            }),
            belly: new SchemaField({
                basePerServing: new NumberField({initial: 0, min: 0}),
                curBellyServing: new NumberField({initial: 0, min: 0}),
            }),
            costPerServing: new NumberField({
                initial: 0,
                min: 0
            }),
            foodEffect: new StringField({
                initial: ""
            }),

            // ----- Poison Specific ----- //
            //TODO: Effects may have to be done in a specific way. E.g. An Id for the effect is stored and referenced when applied.
            doses: new SchemaField({
                value: new NumberField({initial: 1, min: 1, max: 3}),
                currentDoses: new NumberField({initial: 3}),
            }),
            poisonEffect: new StringField({
                initial: "poison effect"
            }),

            // ----- Potion Specific ----- //
            isAlcohol: new BooleanField({
                initial: false,
            }),
            strain: new NumberField({
                initial: 0,
                min: 0
            }),
            potionEffects: new SchemaField({
                overdose: new StringField({
                    initial: "Overdose"
                }),
                effect: new StringField({
                    initial: "Potion Effect"
                }),
            }),

            // ----- Trap Specific ----- //
            isReusable: new BooleanField({
                initial: false
            }),
            trapEffect: new StringField({
                initial: "Trap Effect"
            }),
        }
    }
};