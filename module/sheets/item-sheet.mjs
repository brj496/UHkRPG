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
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
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
        console.log(`${path}/item-${this.item.type}-sheet.hbs`)
        return `${path}/item-${this.item.type}-sheet.hbs`;
    }

    /* -------------------------------------------- */

    async _updateObject(event, formData) {
        const expanded = foundry.utils.expandObject(formData);

        if (this.item.type === "path") {
            const ranks = ["rank1", "rank2", "rank3"];

            for (const rank of ranks) {
                const existingSkills = this.item.system.ranks[rank].skills ?? [];
                const submittedSkills = expanded.system?.ranks?.[rank]?.skills ?? [];

                expanded.system.ranks[rank].skills = existingSkills.map((skill, i) => ({
                    ...skill,
                    ...(submittedSkills[i] ?? {})
                }));
            }
        }

        return this.item.update(expanded);
    }

    /** @override */
    async getData() {
        // Retrieve base data structure.
        const context = super.getData();

        // Use a safe clone of the item data for further operations.
        const itemData = this.document.toPlainObject();

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
        context.system = this.item.system;
        context.flags = itemData.flags;

        // Adding a pointer to CONFIG.U_HK_RPG
        context.config = CONFIG.U_HK_RPG;

        // Prepare active effects for easier access
        context.effects = prepareActiveEffectCategories(this.item.effects);

        //context.modifiers = this.item.system.modifiers;

        context.modifier = this.item.system.modifier;

        return context;
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
        });

        html.find(".add-skill").click(this._onAddSkill.bind(this));
        html.find(".remove-skill").click(this._onRemoveSkill.bind(this));

        // Pip Listener
        html.find(".pip").click(async event => {
            console.log("Clicked!")

            const clicked = Number(event.currentTarget.dataset.index);

            const valuePath = Number(event.currentTarget.dataset.valuePath);

            const current = this.item.system[valuePath];

            const newValue = (clicked === current)
                ? clicked - 1
                : clicked;

            try {
                await this.item.update({
                    "system.currRank": newValue
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }

    async _onAddSkill(event) {
        event.preventDefault();

        const rank = event.currentTarget.dataset.rank;

        const skills = foundry.utils.deepClone(
            this.item.system.ranks[rank].skills
        );

        skills.push({
            name: "",
            description: "",
            stashBonus: 0,
            skillID: foundry.utils.randomID()
        });

        await this.item.update({
            [`system.ranks.${rank}.skills`]: skills
        });
    }

    async _onRemoveSkill(event) {
        event.preventDefault();

        const rank = event.currentTarget.dataset.rank;
        const index = Number(event.currentTarget.dataset.index);

        const skills = foundry.utils.deepClone(
            this.item.system.ranks[rank].skills
        );

        skills.splice(index, 1);

        await this.item.update({
            [`system.ranks.${rank}.skills`]: skills
        });
    }

    async _onDrop(event) {
        if (!this.isEditable) return false;

        const data = TextEditor.getDragEventData(event);

        if (data.type !== "Item") return;

        const droppedItem = await Item.fromDropData(data);
        if (!droppedItem) return;

        if (droppedItem.type !== 'modifier') {
            return ui.notifications.warn("You can only add modifiers to this item.");
        }
        if (this.item.type !== 'weapon') {
            return ui.notifications.warn("Modifiers can only be added to weapons, armor, and shields.");
        }
        if (this.item.system.modifierId.length > 0) {
            return ui.notifications.warn("Items can only have a single modifier.");
        }

        let modifierToId = droppedItem;

        // If the weapon is on an actor, the modifier must also be on the actor to be "owned"
        if (this.item.actor && droppedItem.parent !== this.item.actor) {
            const [created] = await this.item.actor.createEmbeddedDocuments("Item", [droppedItem.toObject()]);
            modifierToId = created;
        }

        else if (!this.item.actor && droppedItem.pack) {
            const [created] = await Item.createDocuments([droppedItem.toObject()], {parent: null});
            modifierToId = created;
        }

        return this.item.update({"system.modifierId": modifierToId.id});
    }
}
