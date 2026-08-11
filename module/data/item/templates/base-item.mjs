import UHkRpgDataModel from "../../base-model.mjs";

const { StringField } = foundry.data.fields;

export default class UHkRpgItemBase extends UHkRpgDataModel {

    static defineSchema() {
        return {
            ...super.defineSchema(),
            description: new StringField({required: true, initial: "description"}),
            // Items that are added to other items are stored in the object's collection key.
        }
    }

    get displayValues() {
        const values = [];

        if (this.description !== undefined) {
            values.push({key: "description", label: "Description", value: this.description}); //an icon field could be added if one is needed.
        }

        return values;
    }
}