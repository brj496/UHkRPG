/**
 * Define a set of template paths to preload
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export async function preloadHandlebarsTemplates() {
    return loadTemplates([
        // Actor
        'systems/u-hk-rpg/templates/actor/actor-character-sheet.hbs',

        //Actor Tabs
        'systems/u-hk-rpg/templates/actor/tabs/actor-attributesAndProficiencies.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-biography.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-inventory.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-notes.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-combat.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-details.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-paths.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-techniques.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-traitsAndPaths.hbs',

        //Actor Partials

        //  Stats
        'systems/u-hk-rpg/templates/actor/partials/stats/stat-card.hbs',
        'systems/u-hk-rpg/templates/actor/partials/stats/editable-stat-card.hbs',
        'systems/u-hk-rpg/templates/actor/partials/stats/editable-stat-card-max.hbs',
        'systems/u-hk-rpg/templates/actor/partials/stats/rollable-stat-card-max.hbs',


        'systems/u-hk-rpg/templates/actor/partials/actor-proficiencies.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-header.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-features.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-items.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-spells.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-effects.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-paths.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-weapon-arts.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-arcana.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-rituals.hbs',
        'systems/u-hk-rpg/templates/actor/partials/actor-traits.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-armor.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-beltItems.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-consumables.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-misc.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-shields.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-tools.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-list-weapons.hbs',
        'systems/u-hk-rpg/templates/actor/partials/inventory/inventory-item-modifiers.hbs',

        // Item partials
        'systems/u-hk-rpg/templates/item/partials/item-effects.hbs',

        // Util partials
        'systems/u-hk-rpg/templates/utils/accordionTemplate.hbs',
    ]);
}