/**
 * Define a set of template paths to preload
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export async function preloadHandlebarsTemplates() {
    return loadTemplates([
        // Actor partials.
        'systems/u-hk-rpg/templates/actor-character-sheet.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-attributesAndProficiencies.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-biography.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-inventory.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-notes.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-techniques.hbs',
        'systems/u-hk-rpg/templates/actor/tabs/actor-traitsAndPaths.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-proficiencies.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-header.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-features.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-items.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-spells.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-effects.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-paths.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-techniques.hbs',
        'systems/u-hk-rpg/templates/actor/parts/actor-traits.hbs',
        // Item partials
        'systems/u-hk-rpg/templates/item/parts/item-effects.hbs',

        // Util partials
        'systems/u-hk-rpg/templates/utils/accordionTemplate.hbs',
    ]);
}