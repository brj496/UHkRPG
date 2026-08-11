import UHkRpgItemBase from "./templates/base-item.mjs";

const {
    SchemaField,
    NumberField,
    StringField,
    ArrayField,
    BooleanField,
} = foundry.data.fields;

export default class UHkRpgWeapon extends UHkRpgItemBase {
    static defineSchema() {
        return {
            ...super.defineSchema(),

            cost: new NumberField({initial: 0, min: 0}),
            bulk: new NumberField({initial: 0, min: 0}),
            equipped: new BooleanField({initial: false}),
            effect: new StringField({initial: ""}),
            quality: new NumberField({initial: 0, min: 0, max: 3}),
            type: new ArrayField(
                new StringField({
                    required: true,
                    choices: Object.keys(CONFIG.U_HK_RPG.weaponTypes)
                })
            ),
            damage: new SchemaField({
                damageType: new StringField({initial: ""}),
                value: new NumberField({initial: 0, min: 0}),
            }),
            range: new SchemaField({
                type: new StringField({initial: ""}),
                value: new NumberField({initial: 0, min: 0}),
            }),
            hands: new StringField({initial: ""}),
            isArcaneFocus: new BooleanField({initial: false}),
            attuned: new BooleanField({initial: false}),
            naturalWeapon: new BooleanField({initial: false}),
            techniqueIds: new ArrayField(new StringField({
                required: true,
                blank: false
            }), {
                initial: []
            }),
            modifierId: new StringField({initial: ""}),
        }
    }

    /**
     * Returns the actual Item documents for the attached modifier.
     */
    get modifier() {
        const parentActor = this.parent.actor;
        return parentActor?.items.get(this.modifierId) || game.items.get(this.modifierId);
    }

    /**
     * Returns the actual Item documents for the techniques.
     * Logic: Look on the parent Actor first, then the World.
     */
    get techniques() {
        const parentActor = this.parent.actor;
        return this.techniqueIds.map(id => {
            return parentActor?.items.get(id) || game.items.get(id);
        }).filter(i => !!i); // Filter out any that weren't found
    }

    get displayValues() {
        const values = super.displayValues;

        if (this.cost) {
            values.push({
                key: "cost",
                label: "Cost",
                value: `${this.cost} Geo`.trim(),
                icon: "" //TODO: When a Geo Icon is made, link it here.
            })
        }

        if (this.bulk) {
            values.push({
                key: "bulk",
                label: "Bulk",
                value: this.bulk,
                icon: ""
            })
        }

        if (this.equipped) {
            values.push({
                key: "equipped",
                label: "Equipped",
                value: this.equipped,
                icon: ""
            })
        }

        if (this.quality) {
            values.push({
                key: "quality",
                label: "Quality",
                value: this.quality,
                icon: ""
            })
        }

        if (this.type) {
            const concatTypes = this.type.map(item => {
                    const label = CONFIG.U_HK_RPG.weaponTypes[item].label;

                    return game.i18n.localize(label);
                }).join(", ");

            values.push({
                key: "type",
                label: (this.type.length > 1) ? "Types" : "Type",
                value: concatTypes,
                icon: ""
            })
        }

        if (this.damage?.value) {
            const label = CONFIG.U_HK_RPG.damageTypes?.[this.damage?.damageType] ?? this.damage.damageType;
            values.push({
                key: "damage",
                label: "Damage",
                value: `${this.damage.value} ${game.i18n.localize(label) || ''}`.trim(),
                icon: ""
            });
        }

        if (this.range) {
            let value = this.range.type

            if (value === "ranged") {
                const rangeType = game.i18n.localize(CONFIG.U_HK_RPG.weaponRanges.ranged.label);
                value = `${rangeType} (${this.range.value})`.trim();
            }

            values.push({
                key: "range",
                label: "Range",
                value: value,
                icon: ""
            });
        }

        if (this.hands) {
            values.push({
                key: "hands",
                label: "Hands",
                value: this.hands,
                icon: ""
            });
        }

        if (this.isArcaneFocus) {
            values.push({
                key: "arcaneFocus",
                label: "Arcane Focus",
                value: this.isArcaneFocus,
                icon: ""
            });
        }

        if (this.attuned) {
            values.push({
                key: "attuned",
                label: "Attuned",
                value: this.attuned,
                icon: ""
            });
        }

        if (this.techniqueIds.length > 0) {
            values.push({
                key: "techniques",
                label: "Techniques",
                value: this.techniques,
                icon: ""
            });
        }

        if (this.modifierId) {
            values.push({
                key: "modifier",
                label: "Modifier",
                value: this.modifier,
                icon: ""
            });
        }
    }
};
