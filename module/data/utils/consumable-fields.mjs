const {
    NumberField,
    StringField,
} = foundry.data.fields;

export function consumableFields() {
    return {
        cost: new NumberField({initial: 0, min: 0}),
        count: new NumberField({initial: 1, min: 1}),
        rarity: new StringField({initial: ""}),
        bulk: new NumberField({initial: 0, min: 0}),
    };
}
