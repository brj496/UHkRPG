import UHkRpgItemBase from "./templates/base-item.mjs";

const { StringField } = foundry.data.fields;

export default class UHkRpgCollectible extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            effect: new StringField({initial: ""}),
        }
    }
};
