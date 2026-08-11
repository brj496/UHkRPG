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

        if (["weapon", "armor", "shield"].includes(this.item.type)) {
            context.modifier = await this.enrichItemDescription("modifier");
        }

        if (["trait"].includes(this.item.type)) {
            context.naturalWeapon = await this.enrichItemDescription("naturalWeapon");
            context.parentTrait = await this.enrichItemDescription("parentTrait");
        }

        if (this.item.type === "weapon") {
            const techniqueIds = this.item.system.techniqueIds ?? [];

            context.techniques = await Promise.all(
                techniqueIds
                    .map(id => this.actor?.items.get(id) || game.items.get(id))
                    .filter(Boolean)
                    .map(async (technique) => {
                        return {
                            ...technique.toObject(),
                            id: technique.id,
                            enrichedDescription: await TextEditor.enrichHTML(
                                technique.system.description || "",
                                {
                                    secrets: this.document.isOwner,
                                    async: true,
                                    rollData: technique.getRollData(),
                                    relativeTo: technique,
                                }
                            )
                        };
                    })
            );
        }

        return context;
    }

    /**
     * Takes an item key and enriches it's description
     * The item's schema must have a getter for this key to get the actual objects
     * e.g. get modifiers in the weapon.mjs schema
     * @param itemKey a string for the item key to enrich
     * @returns {Promise<void>}
     */
    async enrichItemDescription(itemKey) {
        const itemObject = this.item.system[itemKey];

        if (itemObject) {
            // Enrich the modifier's description and attach it to the modifier object
            itemObject.enrichedDescription = await TextEditor.enrichHTML(
                itemObject.system.description || "",
                {
                    secrets: this.document.isOwner,
                    async: true,
                    rollData: itemObject.getRollData(),
                    relativeTo: itemObject,
                }
            );

            return itemObject;
        }
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

        html.find(".remove-modifier").click((event) => this._onRemoveItem(event, "modifierId"));
        html.find(".remove-natural-weapon").click((event) => this._onRemoveItem(event, "naturalWeaponId"));
        html.find(".remove-parent-trait").click((event) => this._onRemoveItem(event, "parentTraitId"));

        html.find('.remove-technique').click(this._onRemoveTechnique.bind(this));

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

    async _onRemoveItem(event, key) {
        event.preventDefault();

        const itemId = this.item.system[key];

        await this.item.update({ [`system.${key}`] : "" });

        if (this.actor) {
            const actorModifier = this.actor.items.get(itemId);
            if (actorModifier && key !== "parentTraitId") { //don't delete Parent Traits
                await actorModifier.delete();
            }
        }
    }

    async _onRemoveTechnique(event) {
        event.preventDefault();

        const element = event.currentTarget;
        const techniqueId = element.dataset.techniqueId;
        const currentTechniques = Array.from(this.item.system.techniqueIds || []);
        const updatedTechniques = currentTechniques.filter(t => t !== techniqueId);

        await this.item.update({ "system.techniqueIds": updatedTechniques });

        if (this.actor) {
            const actorTechnique = this.actor.items.get(techniqueId);
            if (actorTechnique) {
                await actorTechnique.delete();
            }
        }
    }

    async _onDrop(event) {
        if (!this.isEditable) return false;

        const data = TextEditor.getDragEventData(event);

        if (data.type !== "Item") return;

        const droppedItem = await Item.fromDropData(data);
        if (!droppedItem) return;

        //Check if it's an item that can have items added to it.
        if (["weapon", "armor", "shield", "trait"].includes(this.item.type)){
            // check if the item being dropped is a technique, and if the item being added to is an arcane focus
            if (droppedItem.type !== "technique" && this.item.system.isArcaneFocus) {
                return ui.notifications.warn("You can only add techniques to Arcane Foci");
            }
            if (!(droppedItem.type === "trait" || droppedItem.type === "weapon") && this.item.type === "trait") {
                return ui.notifications.warn("You can only add Natural Weapons and Parent Traits to Traits.");
            }
            if (droppedItem.type === "technique" && this.item.system.isArcaneFocus) {
                //Handle adding to a list of techniques

                const qualitySlots = this.item.system.quality;
                const usedSlots = this.item.system.techniqueIds.length;

                if (!(usedSlots < qualitySlots)) {
                    return ui.notifications.warn(`This Focus can only hold ${qualitySlots} techniques`);
                }

                this.addToItemList(droppedItem, "techniqueIds");
            }
            else { // Otherwise it isn't being added to a list of items.
                if (["weapon", "armor", "shield"].includes(this.item.type)) {
                    if (droppedItem.type !== "modifier") {
                        return ui.notifications.warn("You can only add modifiers to Weapons, Armor, Or Shields.");
                    }
                    if (this.item.system.modifierId.length > 0) {
                        return ui.notifications.warn("Weapons, Armor, and Shields can only have a single modifier.");
                    }
                    if (this.item.type !== droppedItem.system.itemType) {
                        return ui.notifications.warn("The Modifier Type does not match the Item Type.");
                    }

                    this.addItem(droppedItem, "modifierId");
                }
                if (this.item.type === "trait") {
                    let key = "";

                    console.log(droppedItem.type);

                    switch (droppedItem.type) {
                        case "trait":
                            key = "trait";
                            if (this.item.system.parentTraitId.length > 0) {
                                return ui.notifications.warn("Traits can only have a single Parent Trait.");
                                // TODO: This might be incorrect ^^
                            }
                            this.addItem(droppedItem, "parentTraitId");
                            break;
                        case "weapon":
                            if (!droppedItem.system.naturalWeapon) {
                                return ui.notifications.warn("Only Natural Weapon can be added to Traits");
                            }
                            if (this.item.system.naturalWeaponId.length > 0) {
                                return ui.notifications.warn("Traits can only have a single Natural Weapon.");
                            }
                            if (this.item.system.type !== "naturalWeapon") {
                                return ui.notifications.warn("Cannot Add a Natural Weapon to a Non-Natural Weapon Trait");
                            }
                            this.addItem(droppedItem, "naturalWeaponId");
                            break;
                    }
                }
            }
        }
    }

    /**
     * Adds a given item to a list of item ids stored on another item
     * @param droppedItem
     * @param key
     * @returns {Promise<*>}
     */
    async addToItemList(droppedItem, key) {
        let itemToAdd = droppedItem;

        if (this.item.actor && droppedItem.parent !== this.item.actor) {
            const [created] = await this.item.actor.createEmbeddedDocuments("Item", [droppedItem.toObject()]);
            itemToAdd = created;
        }

        else if (!this.item.actor && droppedItem.pack) {
            const [created] = await Item.createDocuments([droppedItem.toObject()], {parent: null});
            itemToAdd = created;
        }

        const itemIds = [...(this.item.system[key] || [])];
        if (itemIds.includes(itemToAdd.id)) return;

        itemIds.push(itemToAdd.id);
        return this.item.update({ [`system.${key}`]: itemIds });
    }

    /**
     * Adds a given item's ID to another item's given key
     * @param droppedItem
     * @param key
     * @returns {Promise<*>}
     */
    async addItem(droppedItem, key) {
        let itemToAdd = droppedItem;

        // If the weapon is on an actor, the modifier must also be on the actor to be "owned"
        if (this.item.actor && droppedItem.parent !== this.item.actor) {
            const [created] = await this.item.actor.createEmbeddedDocuments("Item", [droppedItem.toObject()]);
            itemToAdd = created;
        }

        else if (!this.item.actor && droppedItem.pack) {
            const [created] = await Item.createDocuments([droppedItem.toObject()], {parent: null});
            itemToAdd = created;
        }

        return this.item.update({[`system.${key}`]: itemToAdd.id});
    }
}
