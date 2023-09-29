const cards = [
    // HUMANOID DAMAGE
    { type: 'Bandit',       health: 6, damage: 2, speed: 4 },
    { type: 'Bandit Chief', health: 12, damage: 6, speed: 4 },
    { type: 'Warrior',      health: 10, damage: 2, speed: 4 },
    { type: 'Barbarian',    health: 8, damage: 4, speed: 5 },
    { type: 'Guardian',     health: 14, damage: 4, speed: 3 },

    { type: 'Sorcerer',     health: 4, damage: 8, speed: 6 },
    { type: 'Wizard',       health: 3, damage: 10, speed: 6 },
    { type: 'Mage',         health: 6, damage: 6, speed: 6 },

    { type: 'Archer',       health: 6, damage: 6, speed: 6 },
    { type: 'Ranger',       health: 5, damage: 8, speed: 7 },
    { type: 'Marksman',     health: 4, damage: 10, speed: 8 },

    { type: 'Rogue',        health: 4, damage: 6, speed: 6 },
    { type: 'Cutpurse',     health: 6, damage: 4, speed: 7 },
    { type: 'Assassin',     health: 8, damage: 6, speed: 8 },

    // BEAST DAMAGE
    { type: 'Wolf',         health: 4, damage: 6, speed: 4 },
    { type: 'Dire Wolf',    health: 6, damage: 8, speed: 4 },
    { type: 'Black Bear',   health: 8, damage: 8, speed: 4 },
    { type: 'Brown Bear',   health: 8, damage: 10, speed: 4 },

    // UNDEAD DAMAGE
    { type: 'Skeleton',      health: 5, damage: 2, speed: 3 },
    { type: 'Zombie',        health: 7, damage: 4, speed: 2 },
    { type: 'Wraith',        health: 4, damage: 8, speed: 6 },
    { type: 'Lich',          health: 6, damage: 6, speed: 4 },

    // DEMONIC DAMAGE
    { type: 'Imp',           health: 4, damage: 4, speed: 5 },
    { type: 'Demon',         health: 8, damage: 6, speed: 4 },
    { type: 'Archdemon',     health: 12, damage: 8, speed: 3 },

    // ELEMENTAL DAMAGE
    { type: 'Fire Elemental',  health: 4, damage: 8, speed: 5 },
    { type: 'Earth Elemental', health: 8, damage: 4, speed: 3 },
    { type: 'Water Elemental', health: 6, damage: 6, speed: 4 },
    { type: 'Air Elemental',   health: 5, damage: 7, speed: 6 },

    // MECHANICAL DAMAGE
    { type: 'Goblin Tinkerer', health: 4, damage: 6, speed: 4 },
    { type: 'Steam Golem',     health: 8, damage: 6, speed: 2 },

    // DRAGONKIN DAMAGE
    { type: 'Wyrm',            health: 6, damage: 6, speed: 5 },
    { type: 'Drake',           health: 8, damage: 8, speed: 4 },
    { type: 'Dragon',          health: 12, damage: 10, speed: 3 },
    
    // CELESTIAL DAMAGE
    { type: 'Angel',           health: 8, damage: 4, healing: 4, speed: 5 },
    { type: 'Archangel',       health: 10, damage: 6, healing: 6, speed: 4 },

    // HEALING
    { type: 'Druid',            health: 6, healing: 2, damage: 3, speed: 4 },
    { type: 'Bard',             health: 6, healing: 3, damage: 2, speed: 2 },
    { type: 'Cleric',           health: 4, healing: 6, speed: 1 },
    { type: 'Priest',           health: 3, healing: 8, speed: 1 },

    // SPECIAL
    { type: 'Void',             health: 20, speed: 0 } // Destroys all cards in arena
    //{ type: 'Chronomancer',     health: 4, speed: 7 }, // Halves the speed of all other cards in the arena for one turn
    //{ type: 'Alchemist',        health: 5, speed: 3 } // Transforms any card in the arena into a random new card
];