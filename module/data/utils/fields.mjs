const {
    SchemaField,
    NumberField,
    StringField,
    BooleanField,
} = foundry.data.fields;

export function physicalItemFields() {
    return {
        cost: new NumberField({initial: 0, min: 0}),
        bulk: new NumberField({initial: 0, min: 0}),
    };
}

export function equippableItemFields() {
    return {
        equipped: new BooleanField({initial: false}),
        effect: new StringField({initial: ""}),
    };
}

export function qualityField() {
    return {
        quality: new NumberField({initial: 0, min: 0, max: 3}),
    };
}

export function poolField({value = 10, min = 0, max = 10, integer = true, extraFields = {}} = {}) {
    return new SchemaField({
        value: new NumberField({required: true, integer, min: 0, initial: value}),
        min: new NumberField({required: true, integer, min: integer ? -100 : 0, initial: min}),
        max: new NumberField({required: true, integer, min: 0, initial: max}),
        ...extraFields,
    });
}

export function skillField({skillName = ""}) {
    return new SchemaField({
        name: new StringField({required: true, initial: skillName}),
        mastery: new BooleanField({initial: false}),
        rerolls: new NumberField({required: true, integer: true, initial: 0})
    });
}
