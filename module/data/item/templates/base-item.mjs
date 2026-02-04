import UHkTtrpgDataModel from "../../base-model.mjs";

export default class UHkTtrpgItemBase extends UHkTtrpgDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};

        schema.description = new fields.StringField({required: true, blank: true});

        return schema;
    }

}