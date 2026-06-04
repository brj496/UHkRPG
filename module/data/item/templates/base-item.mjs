import UHkRpgDataModel from "../../base-model.mjs";

const { StringField } = foundry.data.fields;

export default class UHkRpgItemBase extends UHkRpgDataModel {

    static defineSchema() {
        return {
            ...super.defineSchema(),
            description: new StringField({required: true, initial: "description"}),
        }
    }

}