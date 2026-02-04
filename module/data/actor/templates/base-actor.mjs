import UHkTtrpgDataModel from "../../base-model.mjs";

const {
    HTMLField,
    SchemaField,
    NumberField,
    StringField,
    FilePathField,
    ArrayField,
} = foundry.data.fields;

export default class UHkTtrpgActorBase extends UHkTtrpgDataModel {

    static defineSchema() {
        // const fields = foundry.data.fields;
        // const requiredInteger = {required: true, nullable: false, integer: true};
        // const schema = {};

        return {
            biography: new HTMLField(),
            attributes: new SchemaField(Object.keys(CONFIG.U_HK_TTRPG.attributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, initial: 10, min: 0}),
                });
                return obj;
            }, {})),

            secondaryAttributes: new SchemaField(Object.keys(CONFIG.U_HK_TTRPG.secondaryAttributes).reduce((obj, attribute) => {
                obj[attribute] = new SchemaField({
                    value: new NumberField({required: true, initial: 0, min: 0}),
                });
                return obj;
            }, {})),
            traits: new ArrayField(new SchemaField({
                hungerCost: new NumberField ({float: true, initial: 0}),
                spookMod: new NumberField ({float: true, initial: 0}),
                cuteMod: new NumberField ({float: true, initial: 0}),
                description: new StringField ({required: true, initialValue: "Description here"}),
            })),
            spook: new NumberField({required: true, float: true, initial: 0}),
            cute: new NumberField({required: true, float: true, initial: 0}),
            speed: new NumberField({required: true, float: true, min: 0, initial: 0}),
            bulk: new NumberField({required: true, float: true, min: 1, initial: 1}),
            size: new NumberField({required: true, Integer: true, min: 1, initial: 1}),
            absorption: new NumberField({float: true, min: 1, initial: 1}),
            pools: new SchemaField({
                heart: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    lifeblood: new NumberField({integer: true, min: 0, initial: 0}),
                }),
                soul: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    glorySoul: new NumberField({integer: true, min: 0, initial: 0}),
                }),
                stamina: new SchemaField({
                    value: new NumberField({required: true, integer: true, min: 0, initial: 10}),
                    min: new NumberField({required: true, integer: true, min: 0, initial: 0}),
                    max: new NumberField({required: true, integer: true, min: 0, initial: 3}),
                    gloryStamina: new NumberField({integer: true, min: 0, initial: 0}),
                })
            }),
            description: new StringField({initial: "Description here"}),
            notes: new StringField({initial: "Notes here"}),
        }

        // schema.health = new fields.SchemaField({
        //   value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
        //   max: new fields.NumberField({ ...requiredInteger, initial: 10 })
        // });
        // schema.power = new fields.SchemaField({
        //   value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
        //   max: new fields.NumberField({ ...requiredInteger, initial: 5 })
        // });
        // schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields
        //
        // schema.attributes = new fields.SchemaField(Object.keys(CONFIG.U_HK_TTRPG.attributes).reduce((obj, attribute) => {
        //   obj[attribute] = new fields.SchemaField({
        //     value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
        //   });
        //   return obj;
        // }, {}));
        //
        // return schema;
    }

}