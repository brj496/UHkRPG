import {
    onManageActiveEffect,
    prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class UHkRpgItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['u-hk-rpg', 'sheet', 'item'],
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'description',
                },
            ],
        });
    }

    /** @override */
    get template() {
        console.log("Opening Sheet")
        const path = 'systems/u-hk-rpg/templates/item';
        // Return a single sheet for all item types.
        // return `${path}/item-sheet.hbs`;

        // Alternatively, you could use the following return statement to do a
        // unique item sheet by type, like `weapon-sheet.hbs`.
        return `${path}/item-${this.item.type}-sheet.hbs`;
    }

    /* -------------------------------------------- */

    /** @override */
    async getData() {
        // Retrieve base data structure.
        const context = super.getData();

        // Use a safe clone of the item data for further operations.
        const itemData = this.document.toPlainObject();

        this._prepareModifiers(context);

        // Enrich description info for display
        // Enrichment turns text like `[[/r 1d20]]` into buttons
        context.enrichedDescription = await TextEditor.enrichHTML(
            this.item.system.description,
            {
                // Whether to show secret blocks in the finished html
                secrets: this.document.isOwner,
                // Necessary in v11, can be removed in v12
                async: true,
                // Data to fill in for inline rolls
                rollData: this.item.getRollData(),
                // Relative UUID resolution
                relativeTo: this.item,
            }
        );

        // Add the item's data to context.data for easier access, as well as flags.
        context.system = itemData.system;
        context.flags = itemData.flags;

        // Adding a pointer to CONFIG.U_HK_RPG
        context.config = CONFIG.U_HK_RPG;

        // Prepare active effects for easier access
        context.effects = prepareActiveEffectCategories(this.item.effects);

        return context;
    }

    _prepareModifiers(context) {
        const modifiers = [];

        //TODO: may have to adjust this based on modifier implementation

        // just in case, only add the modifier to the context if it matches the item's type.

        // for (let i of context.items) {
        //     if (i.type )
        // }

        context.modifiers = modifiers;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Roll handlers, click handlers, etc. would go here.

        // Active Effect management
        html.on('click', '.effect-control', (event) =>
            onManageActiveEffect(event, this.item)
        );

        html.find('select[name="system.type"]').on("change", (event) => {
            const select = event.currentTarget;
            const newType = select.value;

            this.document.update({ "system.type": newType});
        });

        html.find('.add-tag').click(event => {
            const select = html.find('select[name="new-type"]');
            const value = select.val();
            if (!value) return;

            const types = foundry.utils.deepClone(this.object.system.type ?? []);

            if (!types.includes(value)) {
                types.push(value);
                this.object.update({ "system.type": types });
            }
        });

        html.find('.remove-tag').click(event => {
            const index = event.currentTarget.dataset.index;

            const types = foundry.utils.duplicate(this.object.system.type || []);
            types.splice(index, 1);

            this.object.update({ "system.type": types });
        })
    }
}
