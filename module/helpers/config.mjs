export const U_HK_RPG = {};

U_HK_RPG.attributes = {
    might: 'U_HK_RPG.Attributes.Might.long',
    insight: 'U_HK_RPG.Attributes.Insight.long',
    shell: 'U_HK_RPG.Attributes.Shell.long',
    grace: 'U_HK_RPG.Attributes.Grace.long'
}

U_HK_RPG.attributesAbbreviations = {
    might: 'U_HK_RPG.Attributes.Might.abbr',
    insight: 'U_HK_RPG.Attributes.Insight.abbr',
    shell: 'U_HK_RPG.Attributes.Shell.abbr',
    grace: 'U_HK_RPG.Attributes.Grace.abbr'
};

U_HK_RPG.secondaryAttributes = {
    load: 'U_HK_RPG.SecondaryAttributes.Load.long',
    footwork: 'U_HK_RPG.SecondaryAttributes.Footwork.long',
    beltSize: 'U_HK_RPG.SecondaryAttributes.BeltSize.long',
    techniqueSlots: 'U_HK_RPG.SecondaryAttributes.TechniqueSlots.long'
}

U_HK_RPG.secondaryAttributesAbbreviations = {
    load: 'U_HK_RPG.SecondaryAttributes.Load.abbr',
    ftwk: 'U_HK_RPG.SecondaryAttributes.Footwork.abbr',
    blts: 'U_HK_RPG.SecondaryAttributes.BeltSize.abbr',
    techSlots: 'U_HK_RPG.SecondaryAttributes.TechniqueSlots.abbr'
}

U_HK_RPG.consumableTypes = {
    flask: {
        label: 'U_HK_RPG.Item.Consumable.Type.Flask.Label',
    },
    food: {
        label: 'U_HK_RPG.Item.Consumable.Type.Food.Label',
    },
    poison: {
        label: 'U_HK_RPG.Item.Consumable.Type.Poison.Label',
    },
    potion: {
        label: 'U_HK_RPG.Item.Consumable.Type.Potion.Label',
    },
    trap: {
        label: 'U_HK_RPG.Item.Consumable.Type.Trap.Label',
    }
}

U_HK_RPG.rarity = {
    none: {
        label: 'U_HK_RPG.Item.Rarity.None.Label',
    },
    common: {
        label: 'U_HK_RPG.Item.Rarity.Common.Label',
    },
    uncommon: {
        label: 'U_HK_RPG.Item.Rarity.Uncommon.Label',
    },
    rare: {
        label: 'U_HK_RPG.Item.Rarity.Rare.Label',
    },
    legendary: {
        label: 'U_HK_RPG.Item.Rarity.Legendary.Label',
    }
}

U_HK_RPG.charmRarity = {
    cursed: {
        label: 'U_HK_RPG.Item.Rarity.Charms.Label',
    },
    fragile: {
        label: 'U_HK_RPG.Item.Rarity.Charms.Label',
    }
}

U_HK_RPG.weaponTypes = {
    nail: {
        label: 'U_HK_RPG.Item.Weapon.Type.Nail.Label',
    },
    tusk: {
        label: 'U_HK_RPG.Item.Weapon.Type.Tusk.Label',
    },
    needle: {
        label: 'U_HK_RPG.Item.Weapon.Type.Needle.Label',
    },
    hook: {
        label: 'U_HK_RPG.Item.Weapon.Type.Hook.Label',
    },
    sling: {
        label: 'U_HK_RPG.Item.Weapon.Type.Sling.Label',
    },
    natural: {
        label: 'U_HK_RPG.Item.Weapon.Type.Natural.Label',
    },
}

U_HK_RPG.traitTypes = {
    naturalWeapon: {
        label: "U_HK_RPG.Item.Trait.NaturalWeapon.Label",
    },
    attribute: {
        label: "U_HK_RPG.Item.Trait.Attribute.Label"
    },
    mental: {
        label: "U_HK_RPG.Item.Trait.Mental.Label"
    },
    physical: {
        label: "U_HK_RPG.Item.Trait.Physical.Label"
    },
    sense: {
        label: "U_HK_RPG.Item.Trait.Sense.Label"
    },
    mystical: {
        label: "U_HK_RPG.Item.Trait.Mystical.Label"
    },
    body: {
        label: "U_HK_RPG.Item.Trait.Body.Label"
    },
    movement: {
        label: "U_HK_RPG.Item.Trait.Movement.Label"
    },
    naturalDefense: {
        label: "U_HK_RPG.Item.Trait.NaturalDefense.Label"
    }
}

U_HK_RPG.techniqueTypes = {
    arcana: {
        label: "U_HK_RPG.Item.Technique.TechniqueType.Arcana.Label"
    },
    weaponArt: {
        label: "U_HK_RPG.Item.Technique.TechniqueType.WeaponArt.Label"
    },
    ritual: {
        label: "U_HK_RPG.Item.Technique.TechniqueType.Ritual.Label"
    }
}

U_HK_RPG.activationCosts = {
    stamina: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.Stamina.Label",
    },
    focusAction: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.FocusAction.Label",
    },
    soul: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.Soul.Label",
    },
    shell: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.Shell.Label",
    },
    item: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.Item.Label"
    },
    custom: {
        label: "U_HK_RPG.Item.Technique.ActivationCost.Custom.Label"
    }
}

U_HK_RPG.activationTypes = {
    reaction: {
        label: "U_HK_RPG.Item.Technique.ActivationType.Reaction.Label",
    },
    augment: {
        label: "U_HK_RPG.Item.Technique.ActivationType.Augment.Label"
    },
    normal: {
        label: "U_HK_RPG.Item.Technique.ActivationType.Normal.Label"
    },
    unique: {
        label: "U_HK_RPG.Item.Technique.ActivationType.Unique.Label"
    },
    special: {
        label: "U_HK_RPG.Item.Technique.ActivationType.Special.Label"
    }
}

U_HK_RPG.weaponArtTypes = {
    general: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.General.Label",
    },
    unarmed: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Unarmed.Label",
    },
    needle: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Needle.Label",
    },
    tusk: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Tusk.Label",
    },
    natural: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Natural.Label",
    },
    hook: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Hook.Label",
    },
    sling: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Sling.Label",
    },
    shield: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Shield.Label",
    },
    counter: {
        label: "U_HK_RPG.Item.Technique.WeaponArtType.Counter.Label",
    }
}

U_HK_RPG.arcanaTypes = {
    spire: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Spire.Label",
    },
    cloak: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Cloak.Label",
    },
    dream: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Dream.Label",
    },
    nightmare: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Nightmare.Label",
    },
    bloom: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Bloom.Label",
    },
    thorn: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Thorn.Label",
    },
    dust: {
        label: "U_HK_RPG.Item.Technique.ArcanaType.Dust.Label",
    }
}

U_HK_RPG.durations = {
    concentration: {
        label: "U_HK_RPG.Duration.Concentration.Label",
    },
    brief: {
        label: "U_HK_RPG.Duration.Brief.Label",
    },
    scene: {
        label: "U_HK_RPG.Duration.Scene.Label",
    },
    scenes: {
        label: "U_HK_RPG.Duration.Scenes.Label",
    },
    rests: {
        label: "U_HK_RPG.Duration.Rests.Label",
    },
    lifetime: {
        label: "U_HK_RPG.Duration.Lifetime.Label",
    },
    eternal: {
        label: "U_HK_RPG.Duration.Eternal.Label",
    }
}

U_HK_RPG.ranges = {
    self: {
        label: "U_HK_RPG.Range.Self.Label",
    },
    touch: {
        label: "U_HK_RPG.Range.Touch.Label",
    },
    close: {
        label: "U_HK_RPG.Range.Close.Label",
    },
    far: {
        label: "U_HK_RPG.Range.Far.Label",
    },
    sense: {
        label: "U_HK_RPG.Range.Sense.Label"
    }
}

U_HK_RPG.damageTypes = {
    normal: {
        label: "U_HK_RPG.DamageType.Normal.Label",
    },
    magic: {
        label: "U_HK_RPG.DamageType.Magic.Label",
    },
    environmental: {
        label: "U_HK_RPG.DamageType.Environmental.Label",
    },
    stamina: {
        label: "U_HK_RPG.DamageType.Stamina.Label",
    },
    soul: {
        label: "U_HK_RPG.DamageType.Soul.Label",
    }
}

U_HK_RPG.pathTypes = {
    martial: {
        label: "U_HK_RPG.Item.Path.PathType.Martial.Label",
    },
    mystic: {
        label: "U_HK_RPG.Item.Path.PathType.Mystic.Label",
    },
}

U_HK_RPG.handTypes = {
    noHands: {
        label: "U_HK_RPG.Item.Weapon.Hands.NoHands.Label",
        amount: "U_HK_RPG.Item.Weapon.Hands.NoHands.Amount",
        abbr: "U_HK_RPG.Item.Weapon.Hands.NoHands.Abbr"
    },
    oneHand: {
        label: "U_HK_RPG.Item.Weapon.Hands.OneHand.Label",
        amount: "U_HK_RPG.Item.Weapon.Hands.OneHand.Amount",
        abbr: "U_HK_RPG.Item.Weapon.Hands.OneHand.Abbr"
    },
    twoHands: {
        label: "U_HK_RPG.Item.Weapon.Hands.TwoHands.Label",
        amount: "U_HK_RPG.Item.Weapon.Hands.TwoHands.Amount",
        abbr: "U_HK_RPG.Item.Weapon.Hands.TwoHands.Abbr"
    },
    twoHandsPlus: {
        label: "U_HK_RPG.Item.Weapon.Hands.TwoHandsPlus.Label",
        amount: "U_HK_RPG.Item.Weapon.Hands.TwoHandsPlus.Amount",
        abbr: "U_HK_RPG.Item.Weapon.Hands.TwoHandsPlus.Abbr"
    }
}

U_HK_RPG.modifierTypes = {
    weapon: {
        label: "U_HK_RPG.Item.ModifierTypes.Weapon.Label",
    },
    shield: {
        label: "U_HK_RPG.Item.ModifierTypes.Shield.Label",
    },
    armor: {
        label: "U_HK_RPG.Item.ModifierTypes.Armor.Label",
    }
}

U_HK_RPG.lootTypes = {
    collectible: {
        label: "U_HK_RPG.Item.LootTypes.Collectible.Label",
    },
    treasure: {
        label: "U_HK_RPG.Item.LootTypes.Treasure.Label",
    },
}