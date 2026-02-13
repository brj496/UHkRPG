import UHkRpgDataModel from "../../base-model.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
} = foundry.data.fields;

export default class UHkRpgItemBase extends UHkRpgDataModel {

    static defineSchema() {
        return {
            description: new StringField ({required: true, initial: "description"}),
        }
    }

}