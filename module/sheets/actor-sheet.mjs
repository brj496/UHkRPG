import {
    onManageActiveEffect,
    prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

const { duplicate } = foundry.utils;

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class UHkRpgActorSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['u-hk-rpg', 'sheet', 'actor'],
            width: 600,
            height: 600,
            // submitOnChange: false,
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'details',
                },
            ],
        });
    }

    /** @override */
    get template() {
        return `systems/u-hk-rpg/templates/actor/actor-${this.actor.type}-sheet.hbs`;
    }

    /* -------------------------------------------- */

    /** @override */
    async getData() {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = super.getData();

        // Use a safe clone of the actor data for further operations.
        const actorData = this.document.toPlainObject();

        // Add the actor's data to context.data for easier access, as well as flags.
        context.system = actorData.system;
        context.flags = actorData.flags;

        // Adding a pointer to CONFIG.U_HK_RPG
        context.config = CONFIG.U_HK_RPG;

        // Prepare character data and items.
        if (actorData.type === 'character') {
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        // Prepare NPC data and items.
        if (actorData.type === 'npc') {
            this._prepareItems(context);
        }

        // Enrich biography info for display
        // Enrichment turns text like `[[/r 1d20]]` into buttons
        context.enrichedBiography = await TextEditor.enrichHTML(
            this.actor.system.biography,
            {
                // Whether to show secret blocks in the finished html
                secrets: this.document.isOwner,
                // Necessary in v11, can be removed in v12
                async: true,
                // Data to fill in for inline rolls
                rollData: this.actor.getRollData(),
                // Relative UUID resolution
                relativeTo: this.actor,
            }
        );

        // Prepare active effects
        context.effects = prepareActiveEffectCategories(
            // A generator that returns all effects stored on the actor
            // as well as any items
            this.actor.allApplicableEffects()
        );

        context.equippedWeapons = this.actor.items.filter(i =>
            i.type === "weapon" &&
            i.system.equipped
        );

        context.equippedWeapons = this.actor.items
            .filter(i => i.type === "weapon" && i.system.equipped)
            .map(w => ({
                ...w,
                displayType: w.system.type.join(", ")
            }));

        return context;
    }

    /**
     * Character-specific context modifications
     *
     * @param {object} context The context object to mutate
     */
    _prepareCharacterData(context) {
        // This is where you can enrich character-specific editor fields
        // or setup anything else that's specific to this type
    }

    /**
     * Organize and classify Items for Actor sheets.
     *
     * @param {object} context The context object to mutate
     */
    _prepareItems(context) {
        // Initialize containers.
        const proficiencies = [];
        const traits = [];
        const paths = [];
        const charms = [];
        const techniques = [];
        const weapons = [];
        const armor = [];
        const shields = [];
        const consumables = [];
        const tools = [];
        const loot = [];
        const beltItems = [];

        // Iterate through items, allocating to containers
        for (let i of context.items) {
            i.img = i.img || Item.DEFAULT_ICON;
            // Append to proficiencies.
            if (i.type === 'proficiency') {
                proficiencies.push(i);
            }
            // Append to traits
            else if (i.type === 'trait') {
                traits.push(i);
            }
            // Append to paths
            else if (i.type === 'path') {
                // prepare the unlocked ranks of the item
                const unlockedRanks = [];

                for (let rank = 1; rank <= i.system.currRank; rank++) {
                    unlockedRanks.push({
                        rank,
                        ...i.system.ranks[`rank${rank}`]
                    });
                }

                paths.push({
                    item: i,
                    unlockedRanks
                });
            }
            // Append to charms
            else if (i.type === 'charm') {
                charms.push(i);
            }
            // Append to techniques
            else if (i.type === 'technique') {
                techniques.push(i);
            }
            // Append to weapons
            else if (i.type === 'weapon') {
                weapons.push(i);
            }
            // Append to armor
            else if (i.type === 'armor') {
                armor.push(i);
            }
            // Append to shields
            else if (i.type === 'shield') {
                shields.push(i);
            }
            // Append to consumables
            else if (i.type === 'consumable') {
                consumables.push(i);
            }
            // Append to tools
            else if (i.type === 'tool') {
                tools.push(i);
            }
            // Append to loot
            else if (i.type === 'loot') {
                loot.push(i);
            }
            // Append to beltItems
            else if (i.type === 'beltItem') {
                beltItems.push(i);
            }
        }

        // Assign and return
        context.proficiencies = proficiencies;
        context.traits = traits;
        context.paths = paths;
        context.charms = charms;
        context.techniques = techniques;
        context.weapons = weapons;
        context.armor = armor;
        context.shields = shields;
        context.consumables = consumables;
        context.tools = tools;
        context.loot = loot;
        context.beltItems = beltItems;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Render the item sheet for viewing/editing prior to the editable check.
        html.on('click', '.item-edit', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));
            item.sheet.render(true);
        });

        // -------------------------------------------------------------
        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Add Inventory Item
        html.on('click', '.item-create', this._onItemCreate.bind(this));

        // Delete Inventory Item
        html.on('click', '.item-delete', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));

            if (["weapon", "armor", "shield"].includes(item.type)) {
                if (item.type === "weapon" && item.system.isArcaneFocus) {
                    for (const techniqueId of item.system.techniqueIds) {
                        const deleteItem = item.actor.items.find(i => i.id === techniqueId);
                        if (deleteItem) {
                            item.actor.deleteEmbeddedDocuments("Item", [deleteItem.id]);
                        }
                   }
                }

                else if (item.system.modifierId.length > 0) {
                    const modId = item.system.modifierId || "";

                    const deleteItem = item.actor.items.find(i => i.id === modId);

                    if (deleteItem) {
                        item.actor.deleteEmbeddedDocuments("Item", [deleteItem.id]);
                    }
                }
            }

            item.delete();
            li.slideUp(200, () => this.render(false));
        });

        // Active Effect management
        html.on('click', '.effect-control', (ev) => {
            const row = ev.currentTarget.closest('li');
            const document =
                row.dataset.parentId === this.actor.id
                    ? this.actor
                    : this.actor.items.get(row.dataset.parentId);
            onManageActiveEffect(ev, document);
        });

        // Rollable abilities.
        html.on('click', '.rollable', this._onRoll.bind(this));

        // Drag events for macros.
        if (this.actor.isOwner) {
            let handler = (ev) => this._onDragStart(ev);
            html.find('li.item').each((i, li) => {
                if (li.classList.contains('inventory-header')) return;
                li.setAttribute('draggable', true);
                li.addEventListener('dragstart', handler, false);
            });
        }

        //Accordion listener
        html.find('.accordion-toggle').on('click', (event) => {
            const content = $(event.currentTarget)
                .closest('.accordion-item')
                .find('.accordion-content');

            console.log("toggle clicked")

            content.slideToggle(200); // toggles visibility smoothly
        });

        // Pip Listener
        html.find(".pip").click(async event => {
            const clicked = Number(event.currentTarget.dataset.index);

            const current = this.actor.system.secondaryAttributes.techniqueSlots.value;

            const newValue = (clicked === current)
                ? clicked - 1
                : clicked;

            try {
                await this.actor.update({
                    "system.secondaryAttributes.techniqueSlots.value": newValue
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }

    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            system: data,
        };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.system['type'];

        // Finally, create the item!
        return await Item.create(itemData, {parent: this.actor});
    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        // Handle item rolls.
        if (dataset.rollType) {
            if (dataset.rollType === 'item') {
                const itemId = element.closest('.item').dataset.itemId;
                const item = this.actor.items.get(itemId);
                if (item) return item.roll();
            }
        }

        // Handle rolls that supply the formula directly.
        if (dataset.roll) {
            let label = dataset.label ? `${dataset.label}` : '';
            let roll = new Roll(dataset.roll, this.actor.getRollData());
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({actor: this.actor}),
                flavor: label,
                rollMode: game.settings.get('core', 'rollMode'),
            });
            return roll;
        }
    }
}
