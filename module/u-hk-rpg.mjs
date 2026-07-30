// Import document classes.
import {UHkRpgActor} from './documents/actor.mjs';
import {UHkRpgItem} from './documents/item.mjs';
// Import sheet classes.
import {UHkRpgActorSheet} from './sheets/actor-sheet.mjs';
import {UHkRpgItemSheet} from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import {preloadHandlebarsTemplates} from './helpers/templates.mjs';
import {U_HK_RPG} from './helpers/config.mjs';
// Import DataModel classes
import * as actorModels from './data/actor/_module.mjs'
import * as itemModels from './data/item/_module.mjs'
import * as utils from "./utils.mjs";
import UHkRpgModifier from "./data/item/modifier.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
    // Add utility classes to the global game object so that they're more easily
    // accessible in global contexts.
    game.uhkrpg = {
        UHkRpgActor: UHkRpgActor,
        UHkRpgItem: UHkRpgItem,
        rollItemMacro,
    };

    // Add custom constants for configuration.
    CONFIG.U_HK_RPG = U_HK_RPG;

    /**
     * Set an initiative formula for the system
     * @type {String}
     */
    // CONFIG.Combat.initiative = {
    //   formula: '1d20 + @abilities.dex.mod',
    //   decimals: 2,
    // };

    // Define custom Document and DataModel classes
    CONFIG.Actor.documentClass = UHkRpgActor;

    // Note that you don't need to declare a DataModel
    // for the base actor/item classes - they are included
    // with the Character/NPC as part of super.defineSchema()
    CONFIG.Actor.dataModels = {
        character: actorModels.UHkRpgCharacter,
        npc: actorModels.UHkRpgNPC
    }
    CONFIG.Item.documentClass = UHkRpgItem;
    CONFIG.Item.dataModels = {
        proficiency: itemModels.UHkRpgProficiency,
        trait: itemModels.UHkRpgTrait,
        path: itemModels.UHkRpgPath,
        weapon: itemModels.UHkRpgWeapon,
        shield: itemModels.UHkRpgShield,
        armor: itemModels.UHkRpgArmor,
        technique: itemModels.UHkRpgTechnique,
        tool: itemModels.UHkRpgTool,
        loot: itemModels.UHkRpgLoot,
        beltItem: itemModels.UHkRpgBeltItem,
        modifier: itemModels.UHkRpgModifier,
        consumable: itemModels.UHkRpgConsumable,
        charm: itemModels.UHkRpgCharm
    }

    // Active Effects are never copied to the Actor,
    // but will still apply to the Actor from within the Item
    // if the transfer property on the Active Effect is true.
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Register sheet application classes
    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('u-hk-rpg', UHkRpgActorSheet, {
        makeDefault: true,
        label: 'U_HK_RPG.SheetLabels.Actor',
    });
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet('u-hk-rpg', UHkRpgItemSheet, {
        makeDefault: true,
        label: 'U_HK_RPG.SheetLabels.Item',
    });

    utils.registerHandlebarsHelpers();
    // Preload Handlebars templates.
    return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
    // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
    Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));

    Hooks.on("createItem", async (item, options, userId) => {
        // Only run for the person who performed the creation
        if (game.user.id !== userId) return;

        // Only run if a weapon/armor/shield is being created on an Actor
        if (["weapon", "armor", "shield"].includes(item.type) && item.parent instanceof Actor) {
            // If the weapon is an Arcane Focus, stop modifiers from being attached, and only allow techniques to be attached.
            if (item.type === "weapon" && item.system.isArcaneFocus) {
                await addItemToItem(item, item.system.techniqueIds, "system.techniqueIds");
            }
            if (item.system.modifierId){
                await addItemToItem(item, item.system.modifierId, "system.modifierId");
            }

        }
    });
});

/* -------------------------------------------- */
/*  Hook Helpers                                */
/* -------------------------------------------- */

/**
 * Adds an item to an item
 * This is particularly used for the following: Weapons, Armor, and Shields
 * Any item that can have a modifier/Technique added to it.
 * @param item - An item object
 * @param addedItemId - An id of the item to be added to the object.
 * @param path - The path to the key that needs to be updated in the item's Schema/Object. e.g "system.itemId"
 */
async function addItemToItem(item, addedItemId, path) {
    if (!addedItemId) return;

    const actor = item.parent;

    // handle if the item is being added to an array of other items
    if (Array.isArray(addedItemId)) {
        const itemIds = addedItemId || [];

        if (itemIds.length === 0) return;

        const newIds = [];
        const itemsToCreate = [];

        for (const id of itemIds) {
            const worldItem = game.items.get(id);

            const actorHasIt = actor.items.find(i => i.name === worldItem?.name);

            if (worldItem && !actorHasIt) {
                itemsToCreate.push(worldItem.toObject());
            }
            else if (actorHasIt) {
                newIds.push(actorHasIt.id);
            }
        }

        if (itemsToCreate.length > 0) {
            const created = await actor.createEmbeddedDocuments("Item", itemsToCreate);
            newIds.push(...created.map(i => i.id));
        }

        await item.update({ [path]: newIds });
    }
    else { //There can only be one of the item added
        const worldItem = game.items.get(addedItemId);
        //check if the modifier being added matches the item's type
        if (worldItem.system.itemType !== item.type) return;

        // Check if the modifier is already on the actor
        let actorItem = actor.items.get(addedItemId);

        // If not on the actor, find it in the World items
        if (!actorItem) {
            if (worldItem) {
                // Check if the actor already has a modifier with the same name (can't use ids, ids are different between the character and world.)
                actorItem = actor.items.find(i => i.name === worldItem.name);

                if (!actorItem) {
                    const [created] = await actor.createEmbeddedDocuments("Item", [worldItem.toObject()]);
                    actorItem = created;
                }
            }
        }

        if (actorItem && actorItem.id !== addedItemId) {
            await item.update({ [path]: actorItem.id });
        }
    }
}

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
    // First, determine if this is a valid owned item.
    if (data.type !== 'Item') return;
    if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
        return ui.notifications.warn(
            'You can only create macro buttons for owned Items'
        );
    }
    // If it is, retrieve it based on the uuid.
    const item = await Item.fromDropData(data);

    // Create the macro command using the uuid.
    const command = `game.uhkrpg.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(
        (m) => m.name === item.name && m.command === command
    );
    if (!macro) {
        macro = await Macro.create({
            name: item.name,
            type: 'script',
            img: item.img,
            command: command,
            flags: {'u-hk-rpg.itemMacro': true},
        });
    }
    game.user.assignHotbarMacro(macro, slot);
    return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
    // Reconstruct the drop data so that we can load the item.
    const dropData = {
        type: 'Item',
        uuid: itemUuid,
    };
    // Load the item from the uuid.
    Item.fromDropData(dropData).then((item) => {
        // Determine if the item loaded and if it's an owned item.
        if (!item || !item.parent) {
            const itemName = item?.name ?? itemUuid;
            return ui.notifications.warn(
                `Could not find item ${itemName}. You may need to delete and recreate this macro.`
            );
        }

        // Trigger the item roll
        item.roll();
    });
}
