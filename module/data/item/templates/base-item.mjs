import UHkRpgDataModel from "../../base-model.mjs";

export default class UHkRpgItemBase extends UHkRpgDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};

        schema.description = new fields.StringField({required: true, blank: true});

        return schema;
    }

}